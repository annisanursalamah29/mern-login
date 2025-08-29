import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Home from './accounts/Home';
import CrudPage from './accounts/crud'; // Pastikan untuk mengimpor halaman CRUD  
import UserList from './accounts/userList'; // Pastikan untuk mengimpor UserList jika diperlukan  

function App() {
  return (
    <Router>
      <div>
        <nav>
           <Link to="/">Home</Link> | 
           <Link to="/login">Login</Link> | 
           <Link to="/register">Register</Link> | 
            <Link to="/crud">CRUD</Link> |
            <Link to="/users">User List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crud" element={<CrudPage />} /> 
          <Route path="/users" element={<UserList />} />  

        </Routes>
      </div>
    </Router>
  );
}

export default App;