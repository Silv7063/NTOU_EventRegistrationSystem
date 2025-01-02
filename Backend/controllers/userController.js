const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 獲取所有用戶資料
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');  // 排除密碼字段
        res.json(users);  // 返回用戶資料
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve users', error: err.message });
    }
};

// 獲取單個用戶資料
exports.getUserProfile = async (req, res) => {
    try {
        // 從 JWT 解碼過來的 userId
        const user = await User.findById(req.user._id) // 用解碼後的 userId 查詢
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return user;  // 返回用戶資料
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 獲取指定用戶資料
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return user;  // 返回用戶資料
    } catch (err) {
        res.status(500).json({ message: 'Failed to get user' });
    }
};

// 更新用戶資料
exports.updateUserProfile = async (req, res) => {
    //console.log(req.body)  // 從路由參數中提取 userId
    const { username, email, password } = req.body;  // 從請求正文中提取更新的資料

    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const user = await User.findById(decoded.Id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // 更新資料
        user.username = username;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);

        await user.save();
        console.log("user", user);
        return user;  // 返回更新後的用戶資料
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user profile' });
    }
};

// 修改使用者角色
exports.updateUserRole = async (req, res) => {
    const { userId } = req.params;  // 從路由參數中提取 userId
    const { role } = req.body;  // 從請求正文中提取新的角色

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 更新角色
        user.role = role;
        await user.save();
        res.json(user);  // 返回更新後的使用者資料
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user role' });
    }
};
