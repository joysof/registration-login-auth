import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Heder = () => {
  const {userData} = useContext(AppContext)

  console.log(userData)

  return (
    <div className='felx flex-col items-center justify-center mt-20 px-4 text-center text-gray-800'>
        <img className='w-36 h-36 rounded-full mb-6' src={assets.header_img} alt="" />
        <h1 className='text-xl sm:text-3xl font-medium'>Hey {userData ? userData.name :  'Developer'}!

            <img className=' inline ms-2 w-8 aspect-square ' src={assets.hand_wave} alt="" />
            </h1>
        <h2 className='text-3xl sm:text-5xl'>Welcome to our app</h2>
        <p className='mb-8 max-w-md'>
        Let's start with a quick product tour and we will have you up and running in no time!
        </p>
        <button className='border border-gray-500 rounded-full  px-8 py-2.5 hover:bg-gray-200'>Get start</button>
    </div>
  )
}

export default Heder