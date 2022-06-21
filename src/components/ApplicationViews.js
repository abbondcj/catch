import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { MyTrips } from './feed/MyTrips.js'
import { PlanTrip } from './trips/PlanTrip.js'


export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/my-trips" element={<MyTrips />} />
      <Route path="/plan-trip" element={<PlanTrip />} />
    </Routes>
  )
}

