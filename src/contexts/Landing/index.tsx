import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to="/about">About</Link>
    </div>
  )
}

export default LandingPage
