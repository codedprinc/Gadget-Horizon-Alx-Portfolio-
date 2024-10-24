import express from "express";
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticateToken from "../Middleware/authenticateToken.js";

const router = express.Router();
// Middleware to verify JWT token and check if user is admin
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


// Route for updating a user by id
router.put('/update-profile', authenticateToken, async (req, res) => {
    try {
        // Get user ID from the token instead of params
        const userId = req.user.id;
        const { password, ...updateData } = req.body;

        const updatedFields = { ...updateData };

        // Only hash and update password if a new password is provided and it's not empty
        if (password && password.trim() !== '') {
            updatedFields.password = await bcrypt.hash(password, 12);
        }

        const result = await User.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true, runValidators: true }
        ).select('-password');

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'Profile updated successfully', user: result });


    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            message: 'Error updating profile',
            error: error.message
        });
    }
})




export default router;