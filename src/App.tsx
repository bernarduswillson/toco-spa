import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RequireAuth from './pages/RequireAuth';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Exercises from './pages/Exercise/Exercises';
import ExerciseCreate from './pages/Exercise/Create';
import ExerciseEdit from './pages/Exercise/[id]';
import Merchandises from './pages/Merchandise/Merchandises';
import MerchCreate from './pages/Merchandise/Create';
import MerchEdit from './pages/Merchandise/[id]';
import Admins from './pages/Admin/Admins';
import AdminCreate from './pages/Admin/Create';
import AdminEdit from './pages/Admin/[id]';
import Vouchers from './pages/Voucher/Vouchers';

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
          <Route path="exercise/create" element={<ExerciseCreate />} />
          <Route path="exercise/:id" element={<ExerciseEdit />} />
          
          <Route path="merchandise" element={<Merchandises />} />
          <Route path="merchandise/create" element={<MerchCreate />} />
          <Route path="merchandise/:id" element={<MerchEdit />} />

          <Route path="admin" element={<Admins />} />
          <Route path="admin/create" element={<AdminCreate />} />
          <Route path="admin/:id" element={<AdminEdit />} />

          <Route path="voucher" element={<Vouchers />} />
        </Route>

        <Route path='/*' element={<NotFound />} />
        
      </Route>
    </Routes>
  );
};

export default App;
