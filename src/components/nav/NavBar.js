import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
export const NavBar = () => {

  return (
    <>
    <ul className="navbar">
        <li className="navbar__item">
            <Link className="navbar__link" to="/my-trips">Trips</Link>
        </li>

        <li className="navbar__item">
            <Link className="navbar__link" to="/plan-trip">Plan</Link>
        </li>

        <li className="navbar__item">
          <Link className="navbar__link"  to="/my-fish">Fish</Link>
        </li> 

        <li className="navbar__item">
            <Link className="navbar__link" to="/my-profile">Profile</Link>
        </li>
        <li className="navbar__item">
            <Link className="navbar_link" to="/login"
                onClick={
                    () => {
                    localStorage.removeItem("catch_user_id")
                }
                }
                >Logout
            </Link>
        </li>
    </ul>
    </>
  )
}

