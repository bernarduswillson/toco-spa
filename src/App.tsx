import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RequireAuth from './pages/RequireAuth';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Exercises from './pages/Exercise/Exercises';
import Create from './pages/Exercise/Create';
import Edit from './pages/Exercise/[id]';

const ROLES = {
  guest: 1573,
  admin: 1052,
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Guest only routes */}
        <Route element={<RequireAuth allowedRole={ROLES.guest} />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* Admin only routes */}
        <Route element={<RequireAuth allowedRole={ROLES.admin}/>}>
          <Route path="/" element={<Home />} />
          <Route path="exercise" element={<Exercises />} />
          <Route path="exercise/create" element={<Create />} />
          <Route path="exercise/:id" element={<Edit />} />
        </Route>
        
      </Route>
    </Routes>
  );
};

export default App;
