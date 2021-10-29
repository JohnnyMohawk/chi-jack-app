import React from 'react'
import LoginForm from '../LoginForm/LoginForm'

const LoginPage = (props) => {
  return (
    <main className="container">
      <LoginForm handleSignupOrLogin={props.handleSignupOrLogin}/>
    </main>
  )
}

export default LoginPage
