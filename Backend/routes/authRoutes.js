const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // 確保控制器正確匯入
const authMiddleware = require('../middlewares/authMiddleware'); // 確保中介層正確引用


// 使用者登入
router.post('/login', async (req, res) => {
  try {
    await authController.login(req, res); // 確保是方法
  } catch (error) {
    res.status(400).json({ message: 'Invalid credentials', error: error.message });
  }
});

// 使用者註冊
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, identity } = req.body;

    // 根據用戶提供的身份，進行處理
    if (!['student', 'teacher', 'staff'].includes(identity)) {
      return res.status(400).json({ message: 'Invalid identity type' });
    }

    // 根據角色設置身份
    const userRole = role || 'user';  // 如果沒有傳入 role，預設為 'user'

    // 註冊邏輯
    const newUser = new User({
      email,
      password,
      role: userRole,
      identity: identity, // 根據傳入的身份（學生、教師、行政人員）
    });

    await newUser.save();

    // 回應成功訊息
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

// 獲取使用者資料（需要驗證）
router.get('/profile', authMiddleware.authMiddleware, authController.getProfile);

module.exports = router;
