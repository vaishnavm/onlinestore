import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
    <div className='text-center text-2xl pt-10 border-t'>

      <Title text1={'CONTACT'} text2={'US'}/>

      <div className='flex flex-col justify-center my-10 md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" /> 
        <div className='flex flex-col justify-center gap-6'>
          <p className='font-semibold text-2xl text-gray-600'> Our Store</p>
          <p className='text-gray-500 text-base '>54709 Willams Sation, Hor al anz<br/>Dubai , United Arab Emirates </p>
          
          <p className='text-gray-500 text-base'>Tel : +789 78524 963 <br />Email : contact@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500 text-base'>Learn more about our team and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>

      </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact
