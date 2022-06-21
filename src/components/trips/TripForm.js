import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { statesApi, tripsApi, usersApi } from '../apiManager'


export const TripForm = ({}) => {
    const [unitedStates, setUnitedStates] = useState([])
    const [startDate, setStartDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endDate, setEndDate] = useState("")
    const [endTime, setEndTime] = useState("")
    const [state, setState] = useState ("")
    const [city, setCity] = useState("")
    const [waterSystem, setWaterSystem] = useState("")
    const [displayTrip, setDisplay] = useState("true")
    const [tripPlan, setPlan] = useState("")
    const navigate = useNavigate()
  
    useEffect(
      () => {
      fetch(statesApi)
      .then(res => res.json())
      .then((data) => {
        setUnitedStates(data)
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
        public : displayTrip
      }
      fetch(tripsApi, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(tripObj)
      }).then (() => {
        navigate("/my-trips")
  
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
            <label> State </label>
            <select 
              required
              onChange={(e) => {setState(e.target.value)}}>
              <option value="">Select a state</option>
              {unitedStates.map((state) => {
                return <option key={state}> {state} </option>
              })}
            </select>
            <label htmlFor="city"> City </label>
            <input type="text" name="city" max={100} placeholder="City" onChange={(e) => {setCity(e.target.value)}}></input>
            <label> Water System </label>
            <input type="text" placeholder="Water system" onChange={(e) => {setWaterSystem(e.target.value)}}></input>
          </div>
        </fieldset>
        <fieldset>
          <h3>Details</h3>
          {
                  displayTrip === "true" ? (<>Set Location Display Public<input name="location" checked type="checkbox" onChange={(e) => {if (e.target.checked) {setDisplay("true")} else {setDisplay("false")}}}></input></>)
                  : (<>Set Location Display Public<input name="location" type="checkbox" onChange={(e) => {if (e.target.checked) {setDisplay("true")} else {setDisplay("false")}}}></input></>)
                }
          <div className="planContainer">
            <label htmlFor="plan"> Plan </label>
            <textarea type="text"
                  className="tripPlan"
                  placeholder="Trip plan"
                  maxLength="1000"
                  onChange={(e) => {setPlan(e.target.value)}}
            />
          </div>
        </fieldset>
        <fieldset>
              <button type="submit">Submit Trip</button>
              <button onClick={() => {navigate("/my-trips")}}>Cancel</button>
          </fieldset>
      </form>
    )
  }