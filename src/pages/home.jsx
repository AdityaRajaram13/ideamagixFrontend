import React from 'react'
import { useAuth } from '../utils/authcontext';
const home = () => {
  const user = useAuth()
  return (
    
    <div className='Text-4xl'>
      This is Homepage
    </div>
  )
}

export default home;
