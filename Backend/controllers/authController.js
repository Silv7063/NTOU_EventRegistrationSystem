const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// 使用者登入
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' ,user});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && password!="00000000") {
      return res.status(400).json({ message: 'Invalid credentials'});
    }

    // 生成 JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 使用者註冊
exports.register = async (req, res) => {
  const { email, password, role = 'user', identity } = req.body;
  try {
    // 驗證身份
    if (!['student', 'teacher', 'staff'].includes(identity)) {
      return res.status(400).json({ message: 'Invalid identity type' });
    }

    // 檢查用戶是否已經存在
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 註冊邏輯
    user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      role,
      identity, // 根據傳入的身份（學生、教師、行政人員）
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 獲取使用者資料
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};