import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
// import assets from './assets/chat-app-assets/chat-app-assets/assets' // assets.bgImage
import {Toaster} from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

const App = () => {
  const {authUser, loading} = useContext(AuthContext)
  if (loading) return <div className="text-white flex h-screen items-center justify-center">Loading...</div>
  return (
    <div
      style={{ 
        backgroundImage: `url(/bgImage.svg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'black'
      }}
      className="min-h-screen w-full"
    >
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser? <HomePage/>: <Navigate to="/login"/>} />
        <Route path='/login' element={!authUser? <LoginPage/>:<Navigate to="/"/>} />
        <Route path='/profile' element={authUser? <ProfilePage/>:<Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App
