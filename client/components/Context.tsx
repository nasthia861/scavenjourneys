import React, { createContext, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';

export const myContext = createContext({});
const Context = (props: any) => {
const [userObj, setUserObj] = useState<any>();

  useEffect(()=> {
    axios.get('/auth/getuser', { withCredentials: true })
    .then((res: AxiosResponse)=> {
      if (res.data){
        setUserObj(res.data);
      }
    })
    .catch((err)=> {
      console.error('Could note create user state', err);
    })

  }, [])

  return (
    <myContext.Provider value={userObj}>{props.children}</myContext.Provider>
  )
}

export default Context