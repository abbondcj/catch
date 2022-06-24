import React from 'react'
import { RegisterForm } from './RegisterForm'

export const Register = () => {
  console.log("Register rendered")

  return (
    <>
      <h3 id="pageTitle">Register Catch User</h3>
      <RegisterForm />
    </>
  )
}

