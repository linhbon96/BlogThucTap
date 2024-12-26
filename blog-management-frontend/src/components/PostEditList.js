import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/PostEditList.css';
import Modal from './Modal/Modal'; // Import modal component

function PostEditList() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
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

  const handleEditClick = (postId) => {
    navigate(`/EditPost/${postId}`);
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setIsModalOpen(true); // Mở modal
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        const response = await fetch(`http://localhost:5024/api/Post/${postToDelete}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPosts(posts.filter(post => post.postId !== postToDelete));
          console.log("Post deleted successfully");
        } else {
          throw new Error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
    setIsModalOpen(false); // Đóng modal sau khi xác nhận
  };

  // Hàm để loại bỏ HTML
  const removeHTML = (content) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <div className="post-edit-list">
      {posts.map(post => (
        <div key={post.postId} className="post-card">
          <h2>{post.title}</h2>
          <p>{removeHTML(post.content).slice(0, 50)}...</p>
          <div className="post-header">
            <button onClick={() => handleEditClick(post.postId)}>Chỉnh sửa</button>
            <button className="red" onClick={() => handleDeleteClick(post.postId)}>Xóa</button>
          </div>
        </div>
      ))}
      
      {/* Hiển thị modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
}

export default PostEditList;
