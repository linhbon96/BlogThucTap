// Login.js
import React, { useState } from 'react';
import './css/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5024/api/User/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Đăng nhập thành công');

      // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userId', data.userId);

      // Điều hướng đến trang chính
      window.location.href = '/';
    } else {
      console.error('Đăng nhập thất bại');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Đăng Nhập</h2>
        <label>
          Tên đăng nhập:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Mật khẩu:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
}

export default Login;
