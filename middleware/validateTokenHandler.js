const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader && !authHeader.startsWith('Bearer')) {
        res.status(401);
        throw new Error('Invalid token, authorization denied');
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        res.status(401);
        throw new Error('No token, authorization denied');
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user; 
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Invalid token');
    }
}
);

module.exports = validateToken;