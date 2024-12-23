const User = require('../models/User');

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
    const { userId } = req.params;  // 從路由參數中提取 userId
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);  // 返回用戶資料
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve user profile' });
    }
};

// 更新用戶資料
exports.updateUserProfile = async (req, res) => {
    const { userId } = req.params;  // 從路由參數中提取 userId
    const { username, email } = req.body;  // 從請求正文中提取更新的資料

    // 驗證必填欄位
    if (!username || !email) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 更新資料
        user.username = username;
        user.email = email;

        await user.save();
        res.json(user);  // 返回更新後的用戶資料
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
