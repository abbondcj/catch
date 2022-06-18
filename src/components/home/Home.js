import React from 'react'
import { NavBar } from '../nav/NavBar'
import { Navigate } from 'react-router-dom'

export const Home = () => {
  if (localStorage.getItem("catch_user_id")) {
    return (
    <>
        <NavBar />
        <h1>Catch</h1>
    </>
    )
  } else {
    return <Navigate to="/login" />
  }


  return (
    <h1>Home</h1>
  )
}

