import React, { createContext, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { UserType } from '@this/types/User';

//Context used to pass state down as props to children elements
export const myContext = createContext({});
const Context = (props: any) => {
const [userObj, setUserObj] = useState<UserType>();
  useEffect(()=> {

    if (userObj) {
      return;
    } else {
    //Request used to retrieve user data from the server
    axios.get('/auth/getuser', { withCredentials: true })
    .then((res: AxiosResponse)=> {
      if (res.data){
        //set user data to state
        setUserObj(res.data);
      }
    })
    .catch((err)=> {
      console.error('Could not create user state', err);
    })
  }

  }, [])

  return (
    <myContext.Provider value={userObj}>{props.children}</myContext.Provider>
  )
}

export default Context