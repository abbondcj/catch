import React, { useState, useEffect} from 'react'
import { fishApi, tripsApi } from '../apiManager'

export const FishList = () => {
    const [fishes, getFish] = useState([])
    const [trips, getTrips] = useState([])
    const [species, setSpecies] = useState("")
    const [length, setLength] = useState("")
    const [weight, setWeight] = useState("")
    const [method, setMethod] = useState("")
    const [fishSummary, setSummary] = useState("")
    const [fishImage, setImage] = useState("")
    const [tripId, setTripId] = useState(0)
    const [fishAdded, setFishAdded] = useState(false)

    useEffect(() => {
        fetch(tripsApi + `/?userId=${parseInt(localStorage.getItem("catch_user_id"))}`)
            .then(res => res.json())
            .then((data) => {
                getTrips(data)
            })
        },[]
    )

    useEffect(() => {
        fetch(fishApi + `/?userId=${parseInt(localStorage.getItem("catch_user_id"))}&&_expand=trip`)
            .then(res => res.json())
            .then ((data) => {
            getFish(data)
            })

        }, [fishAdded]
    )

    const handleFishSubmit = (e) => {
        e.preventDefault()
        const fishObj = {
            userId: parseInt(localStorage.getItem("catch_user_id")),
            tripId: tripId,
            species: species,
            length: length,
            weight: weight,
            catchMethod: method,
            summary: fishSummary,
            image: fishImage
        }
        fetch(fishApi, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(fishObj)
        })
        .then(() => {
            setSpecies("")
            setLength("")
            setWeight("")
            setMethod("")
            setSummary("")
            setImage("")
            setTripId(0)
            setFishAdded(!fishAdded)
        })


    }

    const deleteFish = (fishId) => {
        fetch(fishApi + `/?id=${fishId}`)
        .then(res => res.json())
        .then((data) => {
          const fish = {...data[0]}
          fetch(fishApi + `/${fishId}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(fish)
          })
          setFishAdded(!fishAdded)
        })
      }



    return (
        <div className="myFishContainer">  
            <div className="newFishForm">
                <form className="fish--form" onSubmit={handleFishSubmit}>
                    <fieldset>
                        <label htmlFor="inputSpecies"> Species </label>
                        <input type="text"
                            name="inputSpecies"
                            placeholder="Enter fish species"
                            required
                            value={species}
                            onChange={(e) => {setSpecies(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputLength"> Length </label>
                        <input type="text"
                            name="inputLength"
                            placeholder="Enter fish length (inches)"
                            required
                            value={length}
                            onChange={(e) => {setLength(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputWeight"> Weight </label>
                        <input type="text"
                            name="inputWeight"
                            placeholder="Enter fish weight (pounds)"
                            required
                            value={weight}
                            onChange={(e) => {setWeight(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputCatchMethod"> Catch Method </label>
                        <textarea type="text"
                            name="inputCatchMethod"
                            placeholder="Enter catch method ex.) dry dropper"
                            required
                            value={method}
                            onChange={(e) => {setMethod(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputSummary"> Summary </label>
                        <textarea type="text"
                            name="inputSummary"
                            placeholder="Enter summary ex.) Casted under fallen tree, fish ate dry fly."
                            required
                            value={fishSummary}
                            onChange={(e) => {setSummary(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputImage"> Image Link </label>
                        <input type="text"
                            name="inputImage"
                            placeholder="Enter photo link"
                            value={fishImage}
                            onChange={(e) => {setImage(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <select
                            required
                            value={tripId}
                            onChange={(e) => {setTripId(parseInt(e.target.value))}}>
                            {tripId !== 0 ? <></> : <option value={0}>Select trip</option>}
                            {
                                trips.map((trip) => {
                                    return (
                                        <option key={trip.id} 
                                            value={trip.id}>
                                            {trip.waterSystem + ` on ` + trip.startDate}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </fieldset>
                    <fieldset>
                        <button type="submit">Add Fish</button>
                        <button onClick={() => {
                            setSpecies("")
                            setLength("")
                            setWeight("")
                            setMethod("")
                            setSummary("")
                            setImage("")
                            setTripId(0)
                        }}>Cancel</button>
                    </fieldset>
                </form>
            </div>
            <div className="fishListDisplay">
                { 
                    fishes.map((fish) => {
                        let fishImage = fish.image
                        return (
                            <div key={fish.id} className="card" id="fishCard">
                                <h4>{fish.species + ` -- ` + fish.length + `" -- ` + fish.weight + `lbs`}</h4>
                                <img className="fishImage" src={fishImage} alt=""></img>
                                <p>Method: {fish.catchMethod}</p>
                                <p>Location: {fish.trip.waterSystem}</p>
                                <button value={fish.id} onClick={(e) => {deleteFish(parseInt(e.target.value))}}>Delete Fish</button>
                            </div>
                        )
                    })   
                }
            </div>
        </div>
  )
}

