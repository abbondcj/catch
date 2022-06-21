import React, { useState, useEffect} from 'react'
import { fishApi } from '../apiManager'

export const FishList = () => {
    const [fishes, getFish] = useState([])

    useEffect(() => {
        fetch(fishApi + `/?userId=${parseInt(localStorage.getItem("catch_user_id"))}&&_expand=trip`)
            .then(res => res.json())
            .then ((data) => {
            getFish(data)
            })

        }, [])



    return (
        <>
            <h1>Fish</h1>
            { 
                fishes.map((fish) => {
                    return (
                        <div key={fish.id}>
                            <p>{fish.species}</p>
                            
                            <p>Method: {fish.catchMethod}</p>
                            <p>Location: {fish.trip.waterSystem}</p>
                        </div>
                    )
                })   
            }
        </>
  )
}

