import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello kontl</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;
