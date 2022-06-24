import React from 'react'
import { FishList } from './FishList'

export const MyFish = () => {
  return (
    <>
        <h1 id="pageTitle">My Fish</h1>
        <div className="populateFish"></div>
        <FishList />
    </>
  )
}

