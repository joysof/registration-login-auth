import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {

  const navigate = useNavigate()

  const {backend_url ,setIsLoggedin , getUserData} = useContext(AppContext)

  const [state , setState] = useState("sing up")
  const [name , setName] = useState("")
  const [email , setEamil] = useState("")
  const [password , setPassword] = useState("")

  const onsubmitHandler = async (e) =>{
    e.preventDefault()
   
    
    try {
    axios.defaults.withCredentials = true

    if (state == 'sing up') {
     const {data} = await axios.post( backend_url + '/api/auth/register' , {
      name, email , password
    })  
      if(data.success){
        setIsLoggedin(true)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    }else{
      const {data} = await axios.post( backend_url + '/api/auth/login' , {
      email , password
    })  
      if(data.success){
        setIsLoggedin(true)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    }
    }catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() =>navigate('/')}  className=' absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3 '>{state === 'sing up' ? 'create accout' : 'login '}</h2>
        <p className='text-center text-sm mb-6'>{state === 'sing up' ? 'create your account' : 'login your account '}</p>

        <form onSubmit={onsubmitHandler}>
          {state === "sing up" && (  <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.person_icon} alt="" />
            <input onChange={(e) =>setName(e.target.value)} value={name} className='bg-transparent outline-none' type="text" placeholder='full name' required />
          </div>
        )}
        

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.mail_icon} alt="" />
            <input  onChange={(e) =>setEamil(e.target.value)} value={email}  className='bg-transparent outline-none' type="email" placeholder='email id' required />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.lock_icon} alt="" />
            <input  onChange={(e) =>setPassword(e.target.value)} value={password}  className='bg-transparent outline-none' type="password" placeholder='password' required />
          </div>
          <p className='mb-4 text-indigo-500 cursor-pointer ' onClick={() =>navigate('/resetpassword')}>Forgot password</p>
          <button type='submit' className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'> {state}</button>
        </form>

       {state === 'sing up' ? ( <p className='text-gray-400 text-center text-xs mt-'>Already have an account{' '}
          <span className='text-blue-400 cursor-pointer underline' onClick={() =>setState('Login')}>Login hear</span>
        </p>) 
        : 
        
        (<p className='text-gray-400 text-center text-xs mt-'>Don't have an account?{' '}
          <span onClick={() => setState("sing up")} className='text-blue-400 cursor-pointer underline'>sing up</span>
        </p>)}
        
      </div>
    </div>
  )
}

export default Login