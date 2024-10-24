import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

// Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//     console.log('Headers:', req.headers);  // Log all headers
//     const authHeader = req.headers['authorization'];
//     console.log('Auth header:', authHeader);  // Log the authorization header

//     if (!authHeader) {
//         console.log('No auth header present');
//         return res.sendStatus(401);
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         console.log('No token found in auth header');
//         return res.sendStatus(401);
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             console.log('JWT verification error:', err);
//             return res.sendStatus(403);
//         }
//         console.log('Decoded user:', user);
//         req.user = user;
//         next();
//     });
// };

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database to get current role
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(403).json({
            success: false,
            message: 'Invalid token'
        });
    }
}

export default authenticateToken;