import React, { useEffect, useState } from 'react'
import { statesApi, usersApi } from '../apiManager'

export const MyProfile = () => {
  const [unitedStates, setUnitedStates] = useState([])
  const [stateCounties, setStateCounties] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [createDate, setCreateDate] = useState("")
  const [email, setEmail] = useState("")
  const [birthday ,setBirthday] = useState("")
  const [userState, setState] = useState("")
  const [userCounty, setCounty] = useState("")
  const [bio, setBio] = useState("")
  const [primaryMethod, setMethod] = useState("")
  const [userImage, setImage] = useState("")


  useEffect(
    () => {
        fetch(usersApi + `/?id=${parseInt(localStorage.getItem("catch_user_id"))}`)
        .then(res => res.json())
        .then((data) => {
            setFirstName(data[0].firstName)
            setLastName(data[0].lastName)
            setEmail(data[0].email)
            setBirthday(data[0].birthday)
            setState(data[0].state)
            setCounty(data[0].county)
            setCreateDate(data[0].createDate)
            setBio(data[0].bio)
            setMethod(data[0].primaryMethod)
            setImage(data[0].profilePhoto)
        })
    }, []
  )

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
      if (userState.length > 0) {
        fetch(statesApi + `/${userState}`)
        .then(res => res.json())
        .then((data) => {
          setStateCounties(data)
        })
      } else {
        setStateCounties([])
        setCounty("")
      }
    }, [userState]
  )

  const stateHandler = (e) => {
    const choice = e.target.value.replace(" ","")
    setState(choice)
    setCounty("")
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const userObj = {
        firstName : firstName,
        lastName : lastName,
        email : email,
        birthday : birthday,
        county : userCounty,
        state : userState,
        createDate : createDate,
        profilePhoto : userImage,
        bio : bio,
        primaryMethod : primaryMethod
    }
    fetch(usersApi + `/${parseInt(localStorage.getItem("catch_user_id"))}`
    , {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(
        window.alert("Profile edit successful")
    )

    

  }

  return (
    <>
        <h1>My Profile</h1>
        <div className="myProfileContainer">
            <div>
            <form className="form--register" onSubmit={handleEditSubmit}>
            <fieldset>
            <label htmlFor="inputFirstName"> First Name </label>
            <input type="text"
                className="form-control"
                placeholder={firstName ? firstName : "first name"}
                required
                maxLength="20"
                value={firstName ? firstName : ""}
                onChange={(e) => {setFirstName(e.target.value)}}
                />
            </fieldset>
            <fieldset>
            <label htmlFor="inputLastName"> Last Name </label>
            <input type="text"
                className="form-control"
                placeholder={lastName ? lastName : "Last name"}
                required 
                maxLength="20"
                value={lastName ? lastName : ""}
                onChange={(e) => {setLastName(e.target.value)}}
                />
            </fieldset>
            <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <p name="inputEmail">{email}</p>
            </fieldset> 
            <fieldset>
            <label htmlFor="inputBirthday"> Birthday </label>
            <p name="inputBirthday">{birthday}</p>
            </fieldset>   
            <fieldset>
            <label> Location </label>
            <select 
                required
                onChange={stateHandler}>
                <option value="">Select a state</option>
                {unitedStates.map((state) => {
                    if (state === userState) {
                        return <option key={state} selected> {state} </option>
                    } else {
                        return <option key={state}> {state} </option>
                    }
                })}
            </select>
            {
                stateCounties.length > 0 
                ? (<select 
                    required
                    onChange={(e) => {setCounty(e.target.value)}}>
                    <option value="">Select a county</option>
                    {stateCounties.map((county) => {
                        if (county === userCounty) {
                            return <option key={county} selected> {county} </option>
                        } else {
                            return <option key={county}> {county} </option>
                        }
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
                placeholder={bio ? bio : "Bio (where you like to fish, what type of fishing is your favorite, etc.)"}
                maxLength="300"
                value={bio ? bio : ""}
                onChange={(e) => {setBio(e.target.value)}}
                />
            </fieldset>
            <fieldset>
            <label htmlFor="inputProfilePhoto"> Profile photo </label>
            <input type="url" value={userImage ? userImage : ""} onChange={(e) => {setImage(e.target.value)}}/>
            </fieldset>
            <fieldset>
            <label> Preferred Method </label>
                <p>Fly fishing</p>
                {primaryMethod && primaryMethod === "Fly fishing" ? <input name="method" type="radio" checked onChange={(e) => {setMethod("Fly fishing")}}></input> : <input name="method" type="radio" onChange={(e) => {setMethod("Fly fishing")}}></input>}
                <p>Spin fishing</p>
                {primaryMethod && primaryMethod === "Spin fishing" ? <input name="method" type="radio" checked onChange={(e) => {setMethod("Spin fishing")}}></input> : <input name="method" type="radio" onChange={(e) => {setMethod("Spin fishing")}}></input>}
            </fieldset>
            <fieldset>
                <button type="submit">
                    Submit Edits
                </button>
            </fieldset>
        </form>
        </div>
        <div>
            <p>Profile photo</p>
            <img src={userImage} alt=""></img>
        </div>
      </div>

    </>
  )
}

