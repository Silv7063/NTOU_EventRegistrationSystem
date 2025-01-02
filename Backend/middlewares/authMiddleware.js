const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

// 驗證 JWT 中的身份
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // 檢查是否有 token
    if (!token) {
        return res.status(401).json({ message: 'Authorization header missing or invalid format' });
    }

    try {
        // 驗證 JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 查詢該 token 的用戶
        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new Error('User not found');
        }
        
        req.user = user;  // 把使用者資料附加到請求對象
        next();  // 進入下一個中介層
    } catch (err) {
        let message = 'Authentication failed';
        // 根據錯誤訊息返回具體描述
        if (err.message === 'jwt malformed') {
            message = 'Invalid token format';
        } else if (err.message === 'jwt expired') {
            message = 'Expired token';
        } else if (err.message === 'User not found') {
            message = 'User not found';
        }
        res.status(401).json({ message, error: err.message });
    }
};

// 進階使用者或系統管理員的受保護路由
const advancedOrAdminMiddleware = (req, res, next) => {
    // 檢查使用者是否是進階或管理員角色
    if (req.user.role === 'advanced' || req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Permission denied: You must be an advanced user or admin.' });
};

module.exports = { authMiddleware, advancedOrAdminMiddleware };
