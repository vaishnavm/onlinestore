import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'



const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome , your trusted destination for stylish, affordable, and high-quality products delivered right to your doorstep. We are passionate about creating a seamless online shopping experience by offering a wide collection of fashion, electronics, home essentials, and lifestyle products from trusted manufacturers and brands. Our goal is to make online shopping simple, secure, and enjoyable for every customer.</p>
          <p>We focus on providing quality products, fast delivery, secure payment options, and dedicated customer support to ensure a smooth shopping journey. Whether you are looking for the latest trends or everyday essentials, we are committed to bringing you the best value and convenience through our ecommerce platform.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to provide customers with a reliable and convenient online shopping experience by offering quality products at competitive prices. We aim to connect people with trusted brands and innovative products while ensuring excellent customer service, secure transactions, and fast delivery. Through continuous improvement and customer-focused solutions, we strive to make ecommerce simple, accessible, and enjoyable for everyone.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We are committed to maintaining the highest standards of quality in every product we offer. Our team carefully selects trusted suppliers and verifies products to ensure durability, reliability, and customer satisfaction. By focusing on quality assurance, secure packaging, and continuous product evaluation, we strive to deliver a shopping experience that customers can trust with confidence.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We believe shopping should be simple, fast, and convenient for everyone. Our ecommerce platform is designed to provide an easy browsing experience, secure payment methods, quick order processing, and reliable delivery services. From product selection to doorstep delivery, we focus on making every step smooth and hassle-free for our customers.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Excepttional Customer Service:</b>
          <p className='text-gray-600'>We are dedicated to providing exceptional customer support to ensure every shopper has a positive and satisfying experience. Our support team is always ready to assist with product inquiries, order tracking, returns, and any customer concerns in a friendly and professional manner. We believe strong customer relationships are built through quick responses, reliable service, and genuine care for our customers’ needs.</p>
        </div>
      </div>

      <NewsLetterBox/>
      
    </div>
  )
}

export default About
