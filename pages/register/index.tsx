import React from 'react'
import SEO from '@src/components/SEO/SEO'
import Register from '@src/contexts/Register'

const RegisterPage: React.FC = () => {
  return (
    <SEO title="Toco for Lecturer | Register">
      <Register />
    </SEO>
  )
}

export default RegisterPage
