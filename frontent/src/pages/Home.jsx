import React from 'react'
import Navbar from '../components/Navbar'
import Heder from '../components/Heder'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
        <Navbar/>
        <Heder/>
    </div>

  )
}

export default Home