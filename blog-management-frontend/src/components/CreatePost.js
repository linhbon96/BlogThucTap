import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './css/CreatePost.css';

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const newPost = {
      title,
      content,
      images: [{ imageUrl }],
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:5024/api/Post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setSuccessMessage("Bài viết đã được tạo thành công!");
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error("Error creating post");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Đã xảy ra lỗi khi tạo bài viết");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Tạo bài viết mới</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <label>
          Tiêu đề:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Nội dung:
          <ReactQuill
            className="content-editor"
            value={content}
            onChange={setContent}
            theme="snow"
          />
        </label>
        <label>
          URL Hình ảnh:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang gửi...' : 'Tạo bài viết'}
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default CreatePost;
