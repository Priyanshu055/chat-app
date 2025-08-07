import React, { useState, useContext } from 'react'
import assets from '../assets/chat-app-assets/chat-app-assets/assets'
import { AuthContext } from '../../context/AuthContext'

const emojiList = ["😂", "🔥", "😎", "🥳", "💬", "🤩", "🎉", "👋", "🤖", "💥"];

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDatasubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDatasubmitted(true)
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio })
  }

  // Emoji rain for background
  const emojiRain = Array.from({ length: 18 }).map((_, i) => {
    const left = Math.random() * 90 + 5;
    const top = Math.random() * 90 + 2;
    const size = Math.random() * 18 + 18;
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    const rotate = Math.random() * 40 - 20;
    return (
      <span
        key={i}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          fontSize: `${size}px`,
          opacity: 0.18 + Math.random() * 0.25,
          transform: `rotate(${rotate}deg)`,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {emoji}
      </span>
    );
  });

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl relative'>
      {/* Emoji rain */}
      {emojiRain}
      {/* Funky background gradients */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-pink-400/10 blur-2xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tr from-yellow-300/20 via-pink-400/20 to-blue-400/10 blur-2xl z-0"></div>

      {/* left */}
      <div className="relative flex flex-col items-center z-10">
        <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)] drop-shadow-2xl' />
        <div className="mt-4 text-3xl font-bold text-white text-center tracking-wider drop-shadow-lg animate-bounce">
          <span role="img" aria-label="sparkle">✨</span> Welcome Back! <span role="img" aria-label="wave">👋</span>
        </div>
      </div>

      {/* right */}
      <form onSubmit={onSubmitHandler} className='
        w-96 h-96 
        flex flex-col justify-center items-center gap-4
        bg-white/10 backdrop-blur-lg 
        border-2 border-violet-400/40 
        rounded-2xl shadow-2xl 
        relative z-10
      '>
        <div className='flex items-center gap-2 mb-2'>
          <h2 className='font-bold text-2xl text-white drop-shadow'>
            {currState}
            {isDataSubmitted && <img onClick={() => setIsDatasubmitted(false)} src={assets.arrow_icon}
              alt="" className='w-5 cursor-pointer' />}
          </h2>
        </div>
        {currState === "Sign up" && !isDataSubmitted && (
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
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text"
              placeholder='Email Address' required className='p-2 w-3/4 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"
              placeholder='Password' required className='p-2 w-3/4 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none' />
          </>
        )}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea onChange={(e) => setBio(e.target.value)} value={bio}
            rows={2} placeholder='Provide a short bio...' required className='p-2 w-3/4 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none' />
        )}
        <button className='w-3/4 py-2 rounded bg-gradient-to-r from-purple-500 to-violet-700 text-white font-semibold shadow-lg hover:scale-105 transition hover:rotate-1'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>
        <div className='flex items-center gap-2 text-xs text-gray-300'>
          <input type="checkbox" />
          <p>Agree to the <span className="text-violet-400 underline">terms of use</span> & privacy policy.</p>
        </div>
        <div className='text-sm mt-2'>
          {currState === "Sign up" ? (
            <p>Already have an account? <span onClick={() => { setCurrState("Login"); setIsDatasubmitted(false) }} className='font-medium text-violet-400 cursor-pointer'>Login here</span></p>
          ) : (
            <p>Create an account <span onClick={() => setCurrState("Sign up")} className='font-medium text-violet-400 cursor-pointer'>Click here</span></p>
          )}
        </div>
        {/* Funky background shapes */}
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-700 rounded-full opacity-40 blur-2xl"></div>
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-400 rounded-full opacity-30 blur-2xl"></div>
        {/* Meme emoji in the corner */}
        <div className="absolute -top-8 right-8 text-4xl animate-spin-slow select-none pointer-events-none">🤪</div>
        <div className="absolute bottom-4 left-8 text-3xl animate-bounce select-none pointer-events-none">🎉</div>
      </form>
      {/* Extra style for slow spin */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .animate-spin-slow {
            animation: spin-slow 6s linear infinite;
          }
        `}
      </style>
    </div>
  )
}

export default LoginPage
