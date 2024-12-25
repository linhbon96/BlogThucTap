import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5024/api/Post");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        console.log("Data received from API:", data);
        setPosts(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleReadMoreClick = (postId) => {
    navigate(`/Post/${postId}`);
  };

  // Hàm cắt xén nội dung HTML
  const getExcerpt = (html, maxLength) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    let text = tempElement.textContent || tempElement.innerText || "";
    if (text.length > maxLength) {
      text = text.slice(0, maxLength) + '...';
    }

    return text;
  };

  return (
    <div className="post-list">
      {posts.map(post => (
        <div 
          key={post.postId} 
          className="post-card"
          onClick={() => handleReadMoreClick(post.postId)}
          style={{ cursor: 'pointer' }}
        >
          {/* Hiển thị hình ảnh bìa nếu có */}
          {post.images && post.images.length > 0 && (
            <img 
              src={post.images[0].imageUrl} 
              alt="Cover" 
              className="cover-image"
            />
          )}

          <h2>{post.title}</h2>

          {/* Hiển thị trích dẫn của nội dung */}
          <p>{getExcerpt(post.content, 50)}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
