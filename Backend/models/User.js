// models/User.js
const mongoose = require('mongoose');

// 使用者模型設計
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // 去除多餘空白
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // 去除多餘空白
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['guest', 'user', 'advanced', 'admin'],
        default: 'guest', // 預設為訪客
    },
    identity: {
        type: String,
        enum: ['student', 'teacher', 'staff'], // 學生、教師或行政人員
        required: function() {
          return this.role === 'user';  // 只有角色是 'user' 時，身份才需要設置
        }
      },
});

module.exports = mongoose.model('User', userSchema);
