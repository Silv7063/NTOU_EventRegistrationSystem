// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // 確保控制器正確匯入
const authMiddleware = require('../middlewares/authMiddleware'); // 確保中介層正確引用

// 使用者登入
router.post('/login', async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login.', error: error.message });
  }
});

// 使用者註冊
router.post('/register', async (req, res) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during registration.', error: error.message });
  }
});

// 獲取使用者資料（需要驗證）
router.get('/profile',  async (req, res) => {
  try {
    await authController.getProfile(req, res);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching user profile.', error: error.message });
  }
});

// Google 登入
router.get('/google', async (req, res) => {
  try {
    await authController.googleLogin(req, res);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during Google login.', error: error.message });
  }
});

// Google 登入回呼
router.get('/google/callback', async (req, res) => {
  try {
    await authController.googleCallback(req, res);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during Google callback.', error: error.message });
  }
});

module.exports = router;
