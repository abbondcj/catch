import React, { useState, useEffect } from 'react'
import { participantsApi, tripsApi } from '../apiManager'

export const TripList = () => {
  console.log("TripList rendered")
  const [trips, getTrips] = useState([])
  const [participants, getParticipants] = useState([])

  useEffect(
    () => {
      fetch(tripsApi + `/?userId=${parseInt(localStorage.getItem("catch_user_id"))}&&_expand=user`)
      .then(res => res.json())
      .then ((data) => {
        getTrips(data)
      })
    }, [])

  useEffect(
    () => {
      fetch(participantsApi + `/?_expand=user`)
      .then(res => res.json())
      .then ((data) => {
        getParticipants(data)
      })
    }, [])

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
                          if (participant.tripId === trip.id && participant.user.id != parseInt(localStorage.getItem("catch_user_id"))) {
                            return (
                              <p key={participant.user.id}>{participant.user.firstName + ` ` + participant.user.lastName}</p>
                            )
                          }
                        })
                      }
                        <button value={trip.id}>Add</button>
                      {
                        trip.completed ? <button>Edit</button> : <button>Complete</button>
                      }
                  </div>
                )
          })
        }
    </>
  )
}

