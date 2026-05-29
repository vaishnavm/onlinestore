import React from 'react'
import { assets } from '../assets/assets'

const Add = () => {
  return (
    <form>
      <div>
        <p>Upload Image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type='file' id='image1' hidden></input>
          </label>

          <label htmlFor="image2">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type='file' id='image2' hidden></input>
          </label>

          <label htmlFor="image3">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type='file' id='image3' hidden></input>
          </label>

          <label htmlFor="image4">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type='file' id='image4' hidden></input>
          </label>
        </div>
      </div>
    </form>
  )
}

export default Add
