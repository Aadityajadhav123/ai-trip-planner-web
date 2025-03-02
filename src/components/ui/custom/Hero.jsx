import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[37px]  text-center'>
        <span className='text-[orange]'> Discover Your Next Adventure With AI:</span> Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-xl text-center'>Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link to={'/create-trip'}>
        <Button className='border rounded-xl'>Get Started, It's Free</Button>
      </Link>
      <img src="/aa.jpeg" alt="" className='-mt-30 h-[300px] w-[400px] object-cover'/>
    </div>
  )
}

export default Hero