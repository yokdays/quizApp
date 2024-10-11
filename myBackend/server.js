const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config(); // โหลดค่าจากไฟล์ .env

app.use(bodyParser.json());
app.use(cors());

// import ฟังก์ชัน quiz
const { fetchQuizByCategory } = require('./quizController');  

// กำหนด SECRET_KEY สำหรับใช้เข้ารหัส JWT
const SECRET_KEY = process.env.SECRET_KEY; // รับค่า SECRET_KEY จากไฟล์ .env

// เชื่อมต่อ MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin', // เปลี่ยนเป็นผู้ใช้ของคุณ
  password: 'root', // เปลี่ยนเป็นรหัสผ่านของคุณ
  database: 'myquizapp', // ชื่อฐานข้อมูล
});

// เชื่อมต่อฐานข้อมูล
db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// API สำหรับดูข้อมูลผู้ใช้
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// สมัครสมาชิก
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสรหัสผ่าน
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to register' });
      }
      res.status(201).json({ message: 'User registered' });
    }
  );
});

// ล็อคอิน
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  });
});

// Middleware ตรวจสอบ token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.get('/quiz-questions/:category', fetchQuizByCategory);


// ตรวจสอบการล็อคอิน
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, user: req.user });
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
