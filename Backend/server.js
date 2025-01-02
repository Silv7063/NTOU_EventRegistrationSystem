const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const participantsRoutes = require('./routes/participantsRoutes');
const { connectDB } = require('./config/db');
const test = require('./test');

dotenv.config();
// 創建 Express 應用
const app = express();

// 使用中間件
app.use(cors({// 跨域資源共享（CORS）
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})); 
app.use(express.json());  // 解析 JSON 請求體
app.use(express.urlencoded({ extended: true }));
// 連接到 MongoDB 資料庫
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, welcome to the NTOU Event Registration System!');
});
// 設置路由
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/participants', participantsRoutes);

// 啟動伺服器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
test;