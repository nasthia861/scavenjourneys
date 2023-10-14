import React, { createContext, useEffect, useState } from 'react'

//Context used to pass state down as props to children elements
export const userLocation = createContext({});
const Location = (props: any) => {
const [userLoc, setUserLoc] = useState<any>()

  useEffect(()=> {
    navigator.geolocation.watchPosition((position) => {
      setUserLoc({latitude: position.coords.latitude, longitude:position.coords.longitude})
    }, () => console.log('Could not get location'))
  }, [])

  return (
      <userLocation.Provider value={userLoc}>{props.children}</userLocation.Provider>
  )
}

export default Location