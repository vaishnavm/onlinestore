import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} alt="" className="mb-5 w-32" />
            <p className='w-full md:w-2/3 text-gray-600'>
            1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='text-gray-600 flex flex-col gap-1'>
            <li>Home</li>
            <li>About US</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='text-gray-600 flex flex-col gap-1'>
            <li>+12-123-456-789</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>

      </div>

       <div>
          <hr /> 
          <p className='py-5 text-sm text-center'>Copyright 2026@ sample.com - All Rights Reserved</p>
          
        </div>
        
    </div>
  )
}

export default Footer
