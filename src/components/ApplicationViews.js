import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Feed } from './feed/Feed'


export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/feed" element={<Feed />}/>
    </Routes>
  )
}

