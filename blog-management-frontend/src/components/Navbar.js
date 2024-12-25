// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Thay đổi từ useHistory sang useNavigate

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage khi component được render
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất

    // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
    navigate('/login'); // Sử dụng navigate để chuyển hướng
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">Danh Sách Bài Viết</Link>
      {isLoggedIn && <Link to="/Create" className="nav-item">Tạo Bài Viết</Link>}
      {isLoggedIn && <Link to="/EditList" className="nav-item">Sửa Bài Viết</Link>}
      {isLoggedIn ? (
        <span onClick={handleLogout} className="nav-item" style={{ cursor: 'pointer' }}>Đăng Xuất</span>
      ) : (
        <Link to="/login" className="nav-item">Đăng Nhập</Link>
      )}
    </nav>
  );
}

export default Navbar;