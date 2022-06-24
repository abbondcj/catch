import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { participantsApi, tripsApi } from '../apiManager'

export const TripList = () => {
  console.log("TripList rendered")
  const [trips, getTrips] = useState([])
  const [tripParticipants, getParticipants] = useState([])
  const [tripsUpdated, setUpdated] = useState(false)
  const navigate = useNavigate()


  useEffect(
    () => {
      fetch(tripsApi + `/?userId=${parseInt(localStorage.getItem("catch_user_id"))}&&_expand=user`)
      .then(res => res.json())
      .then ((data) => {
        getTrips(data)
      })
    }, [tripsUpdated])

  useEffect(
    () => {
      fetch(participantsApi + `/?_expand=user`)
      .then(res => res.json())
      .then ((data) => {
        getParticipants(data)
      })
    }, [])

  

  const completeTrip = (tripId) => {
    fetch(tripsApi + `/?id=${tripId}`)
      .then(res => res.json())
      .then ((data) => {
        data[0].completed = true
        const tripCopy = {...data[0]}
        fetch(tripsApi +`/${tripId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(tripCopy)
        })
        setUpdated(!tripsUpdated)
      })
  }


  return (
    <>
        {
          trips.map((trip) => {
                return (
                  <div key={trip.id} className="card" id="tripCard">
                      <div className="tripInfo">
                        <h3><b>{trip.waterSystem}</b></h3>
                        <p><b>Location: </b>{trip.city + `, ` + trip.state}</p>
                        <p><b>Start Date: </b>{trip.startDate}</p>
                        <p><b>End Date: </b>{trip.endDate}</p>
                        <p><b>Participants: </b></p>
                      </div>
                      <div className="tripListParticipantsDiv">
                        {
                          tripParticipants.map((participant) => {
                            if (participant.tripId === trip.id && participant.user.id !== parseInt(localStorage.getItem("catch_user_id"))) {
                              let participantImage = participant.user.profilePhoto
                              return (
                                <div key={participant.user.id} id="tripListParticipantBox">
                                  <img src={participantImage} alt=""></img>
                                  <p>{participant.user.firstName + ` ` + participant.user.lastName}</p>
                                </div>
                              )
                            }
                          })
                        }
                      </div>
                      {
                        trip.completed ? <p><b>Status: </b>Completed</p> : <button value={trip.id} onClick={(e) => {completeTrip(parseInt(e.target.value))}}>Complete Trip</button>
                      }
                      {
                        trip.completed ? <button onClick={() => {navigate("/my-fish")}}>Add a Catch</button> : <></>

                      }
                  </div>
                )
          })
        }
    </>
  )
}

