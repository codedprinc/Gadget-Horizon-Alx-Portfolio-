import express from "express";
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();


// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    console.log('Headers:', req.headers);  // Log all headers
    const authHeader = req.headers['authorization'];
    console.log('Auth header:', authHeader);  // Log the authorization header

    if (!authHeader) {
        console.log('No auth header present');
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('No token found in auth header');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('JWT verification error:', err);
            return res.sendStatus(403);
        }
        console.log('Decoded user:', user);
        req.user = user;
        next();
    });
};
// Get current user (protected route)
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



// Route for getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});

        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route for getting a user by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route for updating a user by id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...updateData } = req.body;

        const updatedFields = { ...updateData };

        // Only hash and update password if a new password is provided and it's not empty
        if (password && password.trim() !== '') {
            updatedFields.password = await bcrypt.hash(password, 12);
        }

        const result = await User.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'User updated successfully', user: result });


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})


// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).send({
                message: 'Send all required fields: email, password, firstName, lastName'
            });
        }
        const newUser = new User({ email, password, firstName, lastName });
        await newUser.save();
        const token = newUser.generateAuthToken();
        res.status(201).send({ user: newUser, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


//Route for deleting a user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'user deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

export default router;