import React from 'react'
import { NavBar } from '../nav/NavBar'
import { Navigate } from 'react-router-dom'
import { ApplicationViews } from '../ApplicationViews'

export const Home = () => {
  if (localStorage.getItem("catch_user_id")) {
    return (
    <>
        <NavBar />
        <ApplicationViews />
    </>
    )
  } else {
    return <Navigate to="/login" />
  }
}

