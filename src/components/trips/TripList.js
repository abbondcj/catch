import React, { useState, useEffect } from 'react'
import { participantsApi, tripsApi } from '../apiManager'

export const TripList = () => {
  console.log("TripList rendered")
  const [trips, getTrips] = useState([])
  const [participants, getParticipants] = useState([])
  const [tripsUpdated, setUpdated] = useState(false)

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

  const deleteTrip = (tripId) => {
    fetch(tripsApi + `/?id=${tripId}`)
    .then(res => res.json())
    .then((data) => {
      const trip = {...data[0]}
      fetch(tripsApi + `/${tripId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(trip)
      })
      setUpdated(!tripsUpdated)
    })
  }

  return (
    <>
        {
          trips.map((trip) => {
                return (
                  <div key={trip.id} className="card">
                      <h3><b>{trip.waterSystem}</b></h3>
                      <p><b>Location: </b>{trip.city + `, ` + trip.state}</p>
                      <p><b>Start Date: </b>{trip.startDate}</p>
                      <p><b>End Date: </b>{trip.endDate}</p>
                      <p><b>Participants: </b></p>
                      {
                        participants.map((participant) => {
                          if (participant.tripId === trip.id && participant.user.id !== parseInt(localStorage.getItem("catch_user_id"))) {
                            return (
                              <p key={participant.user.id}>{participant.user.firstName + ` ` + participant.user.lastName}</p>
                            )
                          }
                        })
                      }
                      {
                        trip.completed ? <p><b>Status: </b>Completed</p> : <button value={trip.id} onClick={(e) => {completeTrip(parseInt(e.target.value))}}>Complete Trip</button>
                      }
                      <button value={trip.id} onClick={(e) => {deleteTrip(parseInt(e.target.value))}}>Delete Trip</button>
                  </div>
                )
          })
        }
    </>
  )
}

