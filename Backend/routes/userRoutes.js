const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');

// 獲取所有使用者（系統管理員權限）
router.get('/', authMiddleware, authorizeRole(['admin']), userController.getAllUsers);


// 獲取當前使用者資料
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await userController.getUserProfile(req.user.id);
    res.json(user); // 返回當前使用者資料
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user profile', error: error.message });
  }
});

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
