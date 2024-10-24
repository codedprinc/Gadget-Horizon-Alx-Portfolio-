import express from "express";
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import authenticateAdminToken from "../Middleware/authenticateAdminToken.js";

const router = express.Router();

// Register as admin
// const authenticateAdmin = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         if (user.role !== 'admin') return res.status(403).send({ message: 'Admin access required' });
//         req.user = user;
//         next();
//     });
// };

// Register new admin
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).send({
                message: 'Send all required fields for an ADMIN: email, password, firstName, lastName'
            });
        }
        const newAdmin = new User({ email, password, firstName, lastName });
        await newAdmin.save();
        const token = newAdmin.generateAdminAuthToken();
        await newAdmin.setAdmin();
        res.status(201).send({ user: newAdmin, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Login as admin
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = user.generateAdminAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get current admin (protected route)
router.get('/me', authenticateAdminToken, async (req, res) => {
    try {
        const { id, role } = req.user;

        if (role !== 'admin') {
            return res.status(403).json({ message: 'User is not an admin' });
        }
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.send(user);
    } catch (error) {
        console.error('Error in /me route:', error);
        res.status(500).send({ message: error.message });
    }
});

// Route to promote a user to admin status
router.post('/promote/:userId', authenticateAdminToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        await user.setAdmin();
        res.send({ message: 'User promoted to admin successfully', user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// Route for getting all users
router.get('/users', authenticateAdminToken, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

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
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
//Route for deleting all users
router.delete('/all', authenticateAdminToken, async (req, res) => {
    try {
        // Get the current admin's ID from the JWT token
        const currentAdminId = req.user.id; // Assuming your JWT middleware adds user info to req.user

        // Delete all users except the current admin
        const result = await User.deleteMany({
            _id: { $ne: currentAdminId } // $ne means "not equal"
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ 
                message: 'No users found to delete or only admin exists' 
            });
        }
        return res.status(200).json({ 
            message: `Successfully deleted ${result.deletedCount} users`,
            remainingAdmin: currentAdminId
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})


//Route for deleting a user
router.delete('/:id', authenticateAdminToken, async (req, res) => {
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