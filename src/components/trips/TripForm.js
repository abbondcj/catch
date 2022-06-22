import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { participantsApi, statesApi, tripsApi, usersApi } from '../apiManager'


export const TripForm = () => {
    const [users, getUsers] = useState([])
    const [unitedStates, setUnitedStates] = useState([])
    const [startDate, setStartDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endDate, setEndDate] = useState("")
    const [endTime, setEndTime] = useState("")
    const [state, setState] = useState ("")
    const [city, setCity] = useState("")
    const [waterSystem, setWaterSystem] = useState("")
    const [participants, setParticipants] = useState([])
    const [tripPlan, setPlan] = useState("")
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
      fetch(usersApi)
      .then(res => res.json())
      .then((data) => {
        getUsers(data)
      })
      }, []
    )
  
    const newTripHandler = (e) => {
      e.preventDefault()
      const tripObj = {
        userId : parseInt(localStorage.getItem("catch_user_id")),
        createDate : new Date(),
        completed: false,
        startDate : startDate,
        startTime: startTime,
        endDate : endDate,
        endtime : endTime,
        state : state,
        city : city,
        waterSystem : waterSystem,
        plan : tripPlan,
      }
      fetch(tripsApi, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(tripObj)
      }).then (() => {
        fetch(tripsApi)
        .then(res => res.json())
        .then((data) => {
          const lastIndex = data.length - 1
          const newTripId = data[lastIndex].id
          for (const participantId of participants) {
            const participantObj = {
              tripId: newTripId,
              userId: participantId
            }
            fetch(participantsApi, {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(participantObj)
            })
          }
        })
        .then(() => {
          navigate("/my-trips")
        })  
      })      
    }
  
    return (
      <form className="form--trip" onSubmit={newTripHandler}>
        <fieldset>
          <h3>Timing</h3>
          <div className="tripDateContainer">
          <label htmlFor="startDate"> Start date </label>
          <input type="date" 
              required
              name="startDate"
              onChange={(e) => {setStartDate(e.target.value)}}>
          </input>
          <label htmlFor="startTime"> Start time </label>
          <input type="time" name="startTime" onChange={(e) => {setStartTime(e.target.value)}}></input>
          </div>
          <div className="tripDateContainer">
          <label htmlFor="inputEndDate"> End Date </label>
          <input type="date" 
            required
            onChange={(e) => {setEndDate(e.target.value)}}>
          </input>
          <label htmlFor="endTime"> End time </label>
          <input type="time" name="endTime" onChange={(e) => {setEndTime(e.target.value)}}></input>
          </div>
        </fieldset>
        <fieldset>
          <h3>Location</h3>
          <div className="locationContainer">
            <div className="stateContainer">
                <p> State </p>
                <select 
                required
                onChange={(e) => {setState(e.target.value)}}>
                <option value="">Select a state</option>
                {unitedStates.map((state) => {
                    return <option key={state}> {state} </option>
                })}
                </select>
            </div>
            <div className="cityContainer">
                <p> City </p>
                <input type="text" name="city" max={100} placeholder="City" onChange={(e) => {setCity(e.target.value)}}></input>
            </div>
            <div className="waterSystemContainer">
                <p> Water System </p>
                <input type="text" placeholder="Water system" onChange={(e) => {setWaterSystem(e.target.value)}}></input>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <h3>Participants</h3>
          <div className="participantsDiv">
            {
              users.map((user) => {
                if (user.id !== parseInt(localStorage.getItem("catch_user_id"))) {
                  return (
                    <div key={user.id}>
                      <label htmlFor={user.firstName+user.lastName}>{user.firstName + ` ` + user.lastName}</label>
                      <input type="checkbox" 
                        key={user.id} value={user.id} 
                        name={user.firstName+user.lastName}
                        onChange={(e) => {
                          if (participants.includes(parseInt(e.target.value))) {
                            let participantIndex = participants.indexOf(parseInt(e.target.value))
                            participants.splice(participantIndex)
                            let copy = [...participants]
                            setParticipants(copy)
                          } else {
                            participants.push(parseInt(e.target.value))
                            let copy = [...participants]
                            setParticipants(copy)
                          }                        
                        }}/>
                    </div>
                  )
                }
              })
            }
          </div>
        </fieldset>
        <fieldset>
          <h3>Details</h3>
          <textarea type="text"
            className="tripPlan"
            placeholder="Trip plan"
            maxLength="1000"
            onChange={(e) => {setPlan(e.target.value)}}
          />
        </fieldset>
        <fieldset>
              <button type="submit">Submit Trip</button>
              <button onClick={() => {navigate("/my-trips")}}>Cancel</button>
          </fieldset>
      </form>
    )
  }