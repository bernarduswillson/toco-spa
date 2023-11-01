import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

import Sidebar from '../components/organisms/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  const token = Cookie.get('token');

  // Token validation
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div>
      <Sidebar active='Home'/>
    </div>
  );
};

export default Home;
