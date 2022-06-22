import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { statesApi, usersApi } from '../apiManager'

export const RegisterForm = () => {
  console.log("Register rendered")

  const [unitedStates, setUnitedStates] = useState([])
  const [stateCounties, setStateCounties] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [birthday ,setBirthday] = useState("")
  const [state, setState] = useState("")
  const [county, setCounty] = useState("")
  const [bio, setBio] = useState("")
  const [primaryMethod, setMethod] = useState("")
  const [userImage, setImage] = useState("")
  const navigate = useNavigate()

  useEffect(
    () => {
    fetch(statesApi + `/states`)
    .then(res => res.json())
    .then((data) => {
      setUnitedStates(data)
    })
    }, []
  )

  useEffect(
    () => {
      if (state.length > 0) {
        fetch(statesApi + `/${state}`)
        .then(res => res.json())
        .then((data) => {
          setStateCounties(data)
        })
      } else {
        setStateCounties([])
        setCounty("")
      }
    }, [state]
  )

  const stateHandler = (e) => {
    const choice = e.target.value.replace(" ","")
    setState(choice)
    setCounty("")
  }

  const existingUserCheck = () => {
    return fetch(usersApi + `?email=${email}`)
      .then(res => res.json())
      .then(user => !!user.length)
  }

  const existingUsernameCheck = () => {
    return fetch(usersApi + `?userName=${username}`)
      .then(res => res.json())
      .then(user => !!user.length)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    existingUserCheck()
      .then((userExists) => {
        if (!userExists) {
          existingUsernameCheck()
          .then((userExists) => {
            if (!userExists) {
              const createUser = {
                firstName : firstName,
                  lastName : lastName,
                  username : username,
                  email : email,
                  birthday : birthday,
                  county : county,
                  state : state,
                  createDate : new Date(),
                  profilePhoto : userImage,
                  bio : bio,
                  primaryMethod : primaryMethod
              }
              console.log(createUser)
              fetch(usersApi, {
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify(createUser)
              })
              .then(res => res.json())
              .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                  localStorage.setItem("catch_user_id", createdUser.id)
                  navigate("/plan-trip")
                }
              })
            } else {
              window.alert("Username already exists")
            }
          })
        } else {
          window.alert("User already exists")
        }
      })
  }

  return (
    <>
        <form className="form--register" onSubmit={handleRegister}>
        <h2>Register</h2>
        <fieldset>
        <label htmlFor="inputFirstName"> First Name </label>
        <input type="text"
              className="form-control"
              placeholder="First name"
              required
              maxLength="20"
              onChange={(e) => {setFirstName(e.target.value)}}
               />
        </fieldset>
        <fieldset>
        <label htmlFor="inputLastName"> Last Name </label>
        <input type="text"
              className="form-control"
              placeholder="Last name"
              required 
              maxLength="20"
              onChange={(e) => {setLastName(e.target.value)}}
               />
        </fieldset>
        <fieldset>
        <label htmlFor="inputUsername"> Username </label>
        <input type="text"
              className="form-control"
              placeholder="Username"
              required
              maxLength="50"
              onChange={(e) => {setUsername(e.target.value)}}
               />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input type="email"
              className="form-control"
              placeholder="Email address"
              required
              maxLength="75"
              onChange={(e) => {setEmail(e.target.value)}} />
        </fieldset>
        <fieldset>
          <label htmlFor="inputBirthday"> Birthday </label>
          <input type="date" 
              required
              onChange={(e) => {setBirthday(e.target.value)}}></input>
        </fieldset>
        <fieldset>
          <label> Location </label>
          <select 
            required
            onChange={stateHandler}>
            <option value="">Select a state</option>
            {unitedStates.map((state) => {
              return <option key={state}> {state} </option>
            })}
          </select>
          {
            stateCounties.length > 0 
            ? (<select 
                required
                onChange={(e) => {setCounty(e.target.value)}}>
                <option value="">Select a county</option>
                  {stateCounties.map((county) => {
                    return <option key={county}> {county} </option>
                    })
                  }
              </select>)
          : <></>
          }
        </fieldset>
        <fieldset>
        <label htmlFor="inputBio"> Bio </label>
        <textarea type="text"
              className="form-control"
              placeholder="Bio (where you like to fish, what type of fishing is your favorite, etc.)"
              maxLength="300"
              onChange={(e) => {setBio(e.target.value)}}
               />
        </fieldset>
        <fieldset>
        <label htmlFor="inputProfilePhoto"> Profile photo </label>
        <input type="url" onChange={(e) => {setImage(e.target.value)}}/>
        </fieldset>
        <fieldset>
          <label> Preferred Method </label>
          Fly Fishing<input name="method" type="radio" onChange={(e) => {setMethod("Fly fishing")}}></input>
          Spin Fishing<input name="method" type="radio" onChange={(e) => {setMethod("Spin fishing")}}></input>
        </fieldset>
        <fieldset>
            <button type="submit">
                Register
            </button>
        </fieldset>
      </form>
        <Link to="/login">Cancel</Link>
      </>
  )
}

