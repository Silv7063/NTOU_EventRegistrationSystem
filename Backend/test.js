const { identitytoolkit } = require('googleapis/build/src/apis/identitytoolkit');
const jwt = require('jsonwebtoken');
const Id='67698f3fc96cf581665525c9';
const Name='ssw';
const Role='admin';
const Identity='student';



// 使用 openssl 生成的密鑰 (替換為你的密鑰)

// 生成 JWT
const generateToken = () => {
    // Payload (負載)
    const payload = {
        Id,
        Name,
        Role,
        Identity
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
