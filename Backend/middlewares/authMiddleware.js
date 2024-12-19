const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

// 驗證 JWT 中的身份
const authMiddleware  = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Authentication failed' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) throw new Error('User not found');
        req.user = user;
        next();  // 進入下一個中介層
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed', error: err.message });
    }
};

module.exports = { authMiddleware } ;
