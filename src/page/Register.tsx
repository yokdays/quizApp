import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ส่งข้อมูลสมัครสมาชิกไปที่ backend
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });

      // แสดงข้อความเมื่อสมัครสมาชิกสำเร็จ
      setMessage(response.data.message);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Registration failed', error);
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
