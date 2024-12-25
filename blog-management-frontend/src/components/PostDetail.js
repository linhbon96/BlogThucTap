import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5024/api/Post/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));
  }, [id]);

  if (!post) {
    return <div>Đang tải...</div>;
  }

  // Hàm chuyển đổi định dạng thời gian
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>

      {/* Hiển thị thời gian đăng bài */}
      <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
        {formatDate(post.createdAt)}
      </p>

      {/* Hiển thị hình ảnh đầu tiên */}
      {post.images && post.images.length > 0 && (
        <img 
          src={post.images[0].imageUrl} 
          alt="Post Image" 
          style={{ width: '100%', height: 'auto', marginBottom: '20px' }} 
        />
      )}

      {/* Hiển thị nội dung với HTML đã được định dạng */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Hiển thị các hình ảnh còn lại dưới nội dung */}
      {post.images && post.images.slice(1).map((image, index) => (
        <img 
          key={index} 
          src={image.imageUrl} 
          alt={`Post Image ${index + 1}`} 
          style={{ width: '100%', height: 'auto', marginTop: '20px' }} 
        />
      ))}
    </div>
  );
}

export default PostDetail;
