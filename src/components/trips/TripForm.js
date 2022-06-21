import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { statesApi, tripsApi } from '../apiManager'


export const TripForm = () => {
    const [unitedStates, setUnitedStates] = useState([])
    const [startDate, setStartDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endDate, setEndDate] = useState("")
    const [endTime, setEndTime] = useState("")
    const [state, setState] = useState ("")
    const [city, setCity] = useState("")
    const [waterSystem, setWaterSystem] = useState("")
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