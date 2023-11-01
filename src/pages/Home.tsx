import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

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
      <h1 className="text-3xl font-bold underline">Hello kontl</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;
