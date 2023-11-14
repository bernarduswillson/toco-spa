import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Exercises from './pages/Exercise/Exercises';
import Create from './pages/Exercise/Create';
import Edit from './pages/Exercise/[id]';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exercise" element={<Exercises />} />
        <Route path="/exercise/create" element={<Create />} />
        <Route path="/exercise/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default App;
