import React, { useState, useEffect } from 'react'
import { tripsApi } from '../apiManager'

export const TripList = () => {
  console.log("TripList rendered")
  const [trips, getTrips] = useState([])

  useEffect(
    () => {
      fetch(tripsApi + `/?userId=${parseInt(localStorage.getItem("catch_user_id"))}&&_expand=user`)
      .then(res => res.json())
      .then ((data) => {
        getTrips(data)
      })
    }, [])

  return (
    <>
        {
          trips.map((trip) => {
              if (trip.public) {
                return (
                    <div key={trip.id} className="tripCard">
                        <h3><b>{trip.waterSystem}</b></h3>
                        <p><b>Location: </b>{trip.city + `, ` + trip.state}</p>
                        <p><b>Start Date: </b>{trip.startDate}</p>
                        <p><b>End Date: </b>{trip.endDate}</p>
                    </div>
                )
              }
          })
        }
    </>
  )
}

