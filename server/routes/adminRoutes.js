import express from "express";
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token and check if user is admin
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        if (user.role !== 'admin') return res.status(403).send({ message: 'Admin access required' });
        req.user = user;
        next();
    });
};

// Route to promote a user to admin status
router.post('/promote/:userId', authenticateAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        user.role = 'admin';
        await user.save();
        res.send({ message: 'User promoted to admin successfully', user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default router;