import React, {useState, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usersApi } from '../apiManager'
import './login.css'

export const Login = () => {
  const [email, setEmail] = useState("")
  const existDialog = useRef()
  const navigate = useNavigate()

  const existingUserCheck = () => {
    return fetch (usersApi + `/?email=${email}`)
      .then(res => res.json())
      .then(user => user.length ? user[0] : false)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    existingUserCheck()
    .then(exists => {
      if (exists) {
        localStorage.setItem("catch_user_id", exists.id)
        navigate("/my-trips")
      } else {
        existDialog.current.showModal()
      }
    })
  }
  
  return (
    <>
      <h1 id="pageTitle">Catch Login</h1>
      <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
      </dialog>
      <div id="loginContainer">
        <form className="form--login" onSubmit={handleLogin}>
          <fieldset>
              <input type="email"
                  onChange={evt => setEmail(evt.target.value)}
                  className="form-control"
                  placeholder="Email address"
                  required autoFocus />
          </fieldset>
          <fieldset>
              <button type="submit">
                  Sign In
              </button>
          </fieldset>
        </form>
        <div id="registerLink">
          <Link to="/register">Register</Link>
        </div>
      </div>
      
    </>
  )
}

