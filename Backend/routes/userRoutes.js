const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(401).json({ message: '未授權' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token 無效' });
    req.user = user; 
    next();
  });
};

// 獲取當前使用者資料
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    Id: req.user.Id,
    Name: req.user.Name,
    Role: req.user.Role,
    Identity: req.user.Identity
  });
});

// 獲取指定使用者資料
router.get('/get/:userId', authenticateToken, async(req, res) => {
  try {
    const getUser = await userController.getUser(req.params.userId);
    res.status(200).json(getUser); // 返回更新後的使用者資料
  } catch (error) {
    res.status(400).json({ message: 'Failed to get user', error: error.message });
  }
});

// 獲取所有使用者（系統管理員權限）
router.get('/', authMiddleware, authorizeRole(['admin']), userController.getAllUsers);

// 更新使用者資料
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const updatedUser = await userController.updateUserProfile(req.user.id, req.body);
    res.json(updatedUser); // 返回更新後的使用者資料
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user profile', error: error.message });
  }
});

// 修改使用者角色
router.put('/:userId/role', authMiddleware, authorizeRole(['admin']), async (req, res) => {
  try {
    const updatedUser = await userController.updateUserRole(req.params.userId, req.body.role);
    res.json(updatedUser); // 返回更新後的使用者角色
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user role', error: error.message });
  }
});

module.exports = router;
