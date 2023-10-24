import React from 'react'
import Link from 'next/link'

const LandingPage: React.FC = () => {
  return (
    <div>
      <h1>Ceritanya ini Landing Page</h1>
      <Link href="/about">coba pencet ini</Link>
    </div>
  )
}

export default LandingPage
