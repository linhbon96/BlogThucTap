import React from 'react';
import './Modal.css'; // Bạn cần tạo file CSS cho modal này

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Xác nhận</h2>
        <p>Bạn có chắc chắn muốn xóa bài viết này không?</p>
        <button onClick={onClose}>Hủy</button>
        <button className='Delete' onClick={onConfirm}>Xóa</button>
      </div>
    </div>
  );
};

export default Modal;
