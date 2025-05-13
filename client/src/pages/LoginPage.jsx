import React,{useState,useContext} from 'react'
import assets from '../assets/chat-app-assets/chat-app-assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const[currState,setCurrState]=useState("Sign up")
  const[fullName,setFullName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[bio,setBio]=useState("")
  const[isDataSubmitted,setIsDatasubmitted]=useState(false) 

  const {login} =useContext(AuthContext)

  const onSubmitHandler=(event)=>{
    event.preventDefault();

    if(currState==='Sign up' && !isDataSubmitted){
      setIsDatasubmitted(true)
      return;
    }
    
    login(currState==="Sign up" ? 'signup' : 'login', { fullName, email, password, bio })

  }


  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8
    sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

      {/* right */}

      <form onSubmit={onSubmitHandler} className='
        w-96 h-96 
        flex flex-col justify-center items-center gap-4
        bg-white/10 backdrop-blur-lg 
        border-2 border-violet-400/40 
        rounded-2xl shadow-2xl 
        relative
      '>
        <div className='flex items-center gap-2 mb-2'>
          <h2 className='font-bold text-2xl'> 
            {currState}
            {isDataSubmitted && <img onClick={()=>setIsDatasubmitted(false)} src={assets.arrow_icon}
            alt="" className='w-5 cursor-pointer'/>}
          </h2>
        </div>
        {currState==="Sign up" && !isDataSubmitted && (
          <input
            type="text"
            className='p-2 w-3/4 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none'
            placeholder="Full Name"
            required
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        )}
        {!isDataSubmitted && (
          <>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" 
              placeholder='Email Address' required className='p-2 w-3/4 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none' />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" 
              placeholder='Password' required className='p-2 w-3/4 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none' />
          </>
        )}
        { currState==="Sign up" && isDataSubmitted &&(
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio}  
            rows={2} placeholder='Provide a short bio...' required className='p-2 w-3/4 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none'/>
        )}
        <button className='w-3/4 py-2 rounded bg-gradient-to-r from-purple-500 to-violet-700 text-white font-semibold shadow-lg hover:scale-105 transition'>
          {currState==="Sign up" ? "Create Account":"Login Now"}
        </button>
        <div className='flex items-center gap-2 text-xs text-gray-300'>
          <input type="checkbox" />
          <p>Agree to the <span className="text-violet-400 underline">terms of use</span> & privacy policy.</p>
        </div>
        <div className='text-sm mt-2'>
          {currState==="Sign up"?(
            <p>Already have an account? <span onClick={()=>{setCurrState("Login");setIsDatasubmitted(false)}} className='font-medium text-violet-400 cursor-pointer'>Login here</span></p>
          ):(
            <p>Create an account <span onClick={()=>setCurrState("Sign up")} className='font-medium text-violet-400 cursor-pointer'>Click here</span></p>
          )}
        </div>
        {/* Funky background shapes */}
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-700 rounded-full opacity-40 blur-2xl"></div>
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-400 rounded-full opacity-30 blur-2xl"></div>
      </form>
     
    </div>
  )
}

export default LoginPage
