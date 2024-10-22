const express = require('express');
//const mysql = require('mysql2');
const app = express();
const port = 4000;
/*
// 設置 MySQL 連接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'event_registration_system'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});
*/
// 基本路由
app.get('/', (req, res) => {
  res.send('Welcome to the Event Registration System');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
