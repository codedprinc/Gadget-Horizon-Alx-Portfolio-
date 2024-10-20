import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
const authenticateAdminToken = (req, res, next) => {
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

export default authenticateAdminToken;