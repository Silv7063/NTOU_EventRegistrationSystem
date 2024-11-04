// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB 連接
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// 基本路由測試
app.get('/', (req, res) => {
    res.send('Event Management API is running!!!');
});

// 設定伺服器監聽的埠號
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const eventRoutes = require('./routes/eventRoutes');
app.use('/api', eventRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
