import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()
  const {userData , setUserData,setIsLoggedin ,backend_url } = useContext(AppContext)

  const sendVerificationOtp =  async() =>{
    try {
      axios.defaults.withCredentials = true
      const userId = localStorage.getItem("userId");
      console.log( "user id is ", userId)
      const { data } = await axios.post(backend_url + '/api/auth/send-verify-otp',{userId},{
        headers: { "Content-Type": "application/json" }
      })

      console.log( "user id" ,userId)
      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)        
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const logout =async () =>{
      axios.defaults.withCredentials = true
    const {data} = await axios.post(backend_url + '/api/auth/logout')
    data.success && setIsLoggedin(false)
    data.success && setUserData(false)
    navigate('/')
  }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6
     sm:px-24 absolute top-0'>
        <img className='w-28 sm:w-32' src={assets.logo} alt="" />
        {
          userData ? 
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
            {userData.name[0].toUpperCase()}
            <div className=' absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
              <ul  className=' capitalize list-none m-0 min-w-max p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>verify email</li>}

                <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>logout</li>
              </ul>

            </div>
          </div> : <button onClick={() => navigate('/login')}  className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-200 transition-all'>Login <img src={assets.arrow_icon} alt="" /></button>
        }
        
    </div>
  )
}

export default Navbar