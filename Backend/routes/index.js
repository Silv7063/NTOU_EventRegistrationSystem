const express = require('express');
const authRoutes = require('./authenticationRoutes');
const eventRoutes = require('./eventRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// 登入與註冊相關路由
router.use('/auth', authRoutes);

// 活動相關路由
router.use('/events', eventRoutes);

// 使用者管理路由
router.use('/users', userRoutes);

module.exports = router;
