// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// 身份驗證中介軟體
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // 驗證和解析 JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 解碼後的資料包含 userId 和 role
        next(); // 繼續執行後續的路由處理
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = authenticateToken;
