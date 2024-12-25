import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './css/EditPostForm.css';

function EditPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5024/api/Post/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
          setImageUrl(data.images?.[0]?.imageUrl || '');
          setCreatedAt(data.createdAt);
        } else {
          throw new Error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const updatedPost = {
      postId: id,
      title,
      content,
      createdAt,
      images: [{ imageUrl }],
    };

    try {
      const response = await fetch(`http://localhost:5024/api/Post/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        setSuccessMessage("Bài viết đã được cập nhật thành công!");
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error("Error updating post");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Đã xảy ra lỗi khi cập nhật bài viết");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Chỉnh sửa bài viết</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
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
          {isSubmitting ? 'Đang gửi...' : 'Chỉnh sửa'}
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default EditPostForm;
