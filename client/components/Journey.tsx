import React, {useState} from 'react';
import { Journey } from '../types/Journey';
import { User } from '../types/User';


const Journey = () => {

  //set user state to User or null
  const [user, setUser] = useState<User | null>(null);


  return (
    <div>
      <h1> Let's ScavenJourney! </h1>
    </div>
  )
}

export default Journey;