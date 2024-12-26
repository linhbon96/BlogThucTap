import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import PostEditList from './components/PostEditList';
import EditPostForm from './components/EditPostForm';
//import { AuthProvider } from './context/AuthContext';

function App() {
  return (
      // <AuthProvider> loại bỏ xác thực để kiểm tra
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PostList />} />
          <Route path="/Post/:id" element={<PostDetail />} />
          <Route path="/Create" element={<CreatePost />} />
          <Route path='/EditList' element={<PostEditList />} />
          <Route path='/EditPost/:id' element={<EditPostForm />} />
        </Routes>
      </Router>
   // </AuthProvider>
  );
}

export default App;