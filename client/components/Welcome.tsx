import React from 'react';
import GoogleButton from 'react-google-button'

const Welcome = () => {
  return (
    <div>
     <h1> ScavenJourney Welcome Page</h1>
     <a href='/auth/google'>
      <GoogleButton
          label='Google Sign In'
          onClick={() => { console.log('Google button clicked') }}
      />

     </a>
     {/* <NavBar menuItems={[]} /> */}
    </div>
  )
}

export default Welcome;