const jwt = require('jsonwebtoken');

// 用戶資訊
const userId = '67698f3fc96cf581665525c9';
const role = 'admin';

// 使用 openssl 生成的密鑰 (替換為你的密鑰)

// 生成 JWT
const generateToken = () => {
    // Payload (負載)
    const payload = {
        userId,
        role
    };

    // 選項 (可選)
    const options = {
        expiresIn: '24h' // Token 1小時內有效
    };

    // 生成 Token
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
};

// 測試生成 Token
const token = generateToken();
console.log('Generated Token:', token);
