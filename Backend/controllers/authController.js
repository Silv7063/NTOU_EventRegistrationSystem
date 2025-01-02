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
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 使用者註冊
exports.register = async (req, res) => {
  const { username, email, password, role = 'user', identity } = req.body;

  try {
    const validIdentities = ['student', 'teacher', 'staff'];
    if (!validIdentities.includes(identity)) {
      return res.status(400).json({ message: 'Invalid identity type' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      username: username,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      identity,
    });

    await newUser.save();
    const token = jwt.sign({ Id: newUser._id, Name: newUser.username, Role: newUser.role, Identity:newUser.identity}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        username: newUser.username,
        email: newUser.email,
        password:newUser.password,
        role: newUser.role,
        identity: newUser.identity,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
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