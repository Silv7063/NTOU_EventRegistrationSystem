const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authController = require('../controllers/authController'); // 確保控制器正確匯入
const authMiddleware = require('../middlewares/authMiddleware'); // 確保中介層正確引用


// 使用者登入
router.post('/login', async (req, res) => {
  try {
    await login(req, res); 
  } catch (error) {
    res.status(400).json({ message: 'Invalid credentials', error: error.message });
  }
});

// 使用者註冊
router.post('/register', async (req, res) => {
  try {
    await register(req, res); 
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

// 獲取使用者資料（需要驗證）
router.get('/profile', authMiddleware.authMiddleware, authController.getProfile);

module.exports = router;
