// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:5024/api/Post/Search?query=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Kết quả tìm kiếm:', data);
        // Xử lý kết quả tìm kiếm (ví dụ: điều hướng đến trang kết quả tìm kiếm)
        navigate('/search-results', { state: { results: data } });
      } else {
        console.error('Tìm kiếm thất bại');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">Danh Sách Bài Viết</Link>
      {isLoggedIn && <Link to="/Create" className="nav-item">Tạo Bài Viết</Link>}
      {isLoggedIn && <Link to="/EditList" className="nav-item">Sửa Bài Viết</Link>}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Tìm kiếm</button>
      </form>
      {isLoggedIn ? (
        <span onClick={handleLogout} className="nav-item" style={{ cursor: 'pointer' }}>Đăng Xuất</span>
      ) : (
        <Link to="/login" className="nav-item">Đăng Nhập</Link>
      )}
    </nav>
  );
}

export default Navbar;
