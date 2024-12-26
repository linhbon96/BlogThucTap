import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/PostEditList.css';
import Modal from './Modal/Modal'; // Import modal component


function PostEditList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate();
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5024/api/Post?page=${currentPage}&pageSize=${postsPerPage}`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        console.log("Data received from API:", data);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="post-edit-list">
      {posts.map(post => (
        <div key={post.postId} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.content.slice(0, 100)}...</p>
          <div className="post-header">
            <button onClick={() => handleEditClick(post.postId)}>Chỉnh sửa</button>
            <button className="red" onClick={() => handleDeleteClick(post.postId)}>Xóa</button>
          </div>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
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