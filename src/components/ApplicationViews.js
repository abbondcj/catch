import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { MyTrips } from './feed/MyTrips.js'
import { MyFish } from './fish/MyFish.js'
import { PlanTrip } from './trips/PlanTrip.js'


export const ApplicationViews = () => {
  return (
    <>
      <h1>Welcome back to Catch!</h1>
      <Routes>
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/my-fish" element={<MyFish />} />
      </Routes>
    </>
  )
}

