import React from 'react'
import SEO from '@src/components/SEO/SEO'
import Login from '@src/contexts/Login'

const LoginPage: React.FC = () => {
  return (
    <SEO title="Toco for Lecturer | Login">
      <Login />
    </SEO>
  )
}

export default LoginPage
