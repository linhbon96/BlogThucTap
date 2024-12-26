import React, { useState } from 'react';
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
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        // <AuthProvider> loại bỏ xác thực để kiểm tra
        <Router>
            <Navbar onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<PostList searchQuery={searchQuery} />} />
                <Route path="/login" element={<Login />} />
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