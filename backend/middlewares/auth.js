const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
};