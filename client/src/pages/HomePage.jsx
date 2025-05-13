import React, { useState, useContext } from 'react'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'
import RightSidebar from '../Components/RightSidebar'
import { ChatContext } from '../../context/chatContext'

const HomePage = () => {
  const { setSelectedUser } = useContext(ChatContext)

  return (
    <div className="flex h-screen p-5 gap-0">
      <div className="flex-[1]">
        <Sidebar/>
      </div>
      <div className="flex-[2]">
        <ChatContainer  />
      </div>
      <div className='flex-[1] h-full'> 
        <RightSidebar  />
      </div>
    </div>
  )
}

export default HomePage