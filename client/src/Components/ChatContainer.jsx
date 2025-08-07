import React,{ useContext, useEffect,useRef, useState} from 'react'
import assets, { messagesDummyData } from '../assets/chat-app-assets/chat-app-assets/assets'
import { formatMessageTime } from '../lib/utils'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/chatContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const {messages,selectedUser,setSelectedUser,sendMessage,getMessages}=useContext(ChatContext)
  const {authUser,onlineUsers}=useContext(AuthContext)

 const scrollEnd = useRef()

 const [input,setInput]=useState("");


//  handle send message
  const handleSendMessage= async (e)=>{
    e.preventDefault();
    if(input.trim() === "") return null;
      await sendMessage({text: input.trim()});
      setInput("");
}

// handle sending an image
const handleSendImage=async (e)=>{
  const file=e.target.files[0];
  if(!file || !file.type.startsWith("image")){
    toast.error("Please select an image");
    return null;
  } 
  const reader=new FileReader();
  reader.onloadend=async()=>{
    await sendMessage({image:reader.result});
    e.target.value=""
  }
  reader.readAsDataURL(file);
}

useEffect(()=>{
  if(selectedUser){
    getMessages(selectedUser._id);
  }
},[selectedUser])



 useEffect(() => {
  if(scrollEnd.current && messages){
    scrollEnd.current.scrollIntoView({behavior:"smooth"})
  }

 },[messages])
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
       <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
         {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500">
          </span>}

        </p>
        <img onClick={()=>setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7'/>
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5'/>
       </div>


       <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.map((msg,index)=>(
          <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse' }`}>
            {msg.image ? (
              <img src={msg.image} alt="" className=' max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <div className={`p-3 rounded-lg ${msg.senderId !==  authUser._id ? 'bg-[#8185B2]/10 text-white' : 'bg-[#282142] text-gray-200'}`}>
                <p className={`p-2 max-w-[200px] md:text-sm font-light 
                  rounded-lg mb-8 break-all bg-voilet-500/30 text-white ${msg.senderId==='680f50e4f10f3cd28382ecf9'? 'rounded-br-none':'rounded-bl-none'}`}>{msg.text}</p>
              </div>
            )}

            <div className="text-center text-xs">
              <img src={msg.senderId=== authUser._id ? authUser.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 rounded-full'/>
              <p className='text-gray-500'>{ formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}

        <div ref={scrollEnd}></div>
       </div>
      
{/* bottom area */}
<div className='absolute bottom-0 left-0 right-0 flex items-centergap-3 p-3'>
  <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
    <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={(e)=>e.key==="Enter"? handleSendMessage(e):null} type="text" placeholder="Send a message"
    className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'
    />
    <input onChange={handleSendImage} type="file" id='image' accept='image/png,image/jpeg' hidden />
    <label htmlFor='image'>
      <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer"/>
    </label>
  </div>
  <img onClick={handleSendMessage} src={assets.send_button} alt="" className="w-7 cursor-pointer"/>

</div>



    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
      {/* Diagonal split background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "linear-gradient(120deg, #fbc2eb 55%, #a6c1ee 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
          opacity: 0.95,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "linear-gradient(120deg, #fff0 60%, #e0c3fc 100%)",
          clipPath: "polygon(0 70%, 100% 30%, 100% 100%, 0 100%)",
          opacity: 0.7,
        }}
      />
      {/* Main content */}
      <div
        className="flex flex-col items-center justify-center px-10 py-14 max-w-xl w-full mx-4 z-10"
        style={{
          borderRadius: "2rem",
          boxShadow: "0 8px 40px #a18cd122, 0 1.5px 12px #fbc2eb33",
          background: "rgba(255,255,255,0.7)",
          border: "2.5px solid #a18cd1",
          transform: "skewY(-2deg) scale(1.01)",
        }}
      >
        <div
          style={{
            width: 80,
            height: 10,
            borderRadius: 8,
            background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 60%, #8ec5fc 100%)",
            marginBottom: 24,
            marginTop: -10,
            boxShadow: "0 2px 12px #a18cd122",
            transform: "skewX(-12deg)",
          }}
        />
        <h2
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 text-center tracking-widest"
          style={{
            letterSpacing: "6px",
            lineHeight: 1.1,
            marginBottom: 12,
            textShadow: "0 2px 12px #fbc2eb, 0 1px 2px #a18cd1",
            transform: "skewY(2deg)",
          }}
        >
          CHAT<br />ANYTIME,<br />ANYWHERE
        </h2>
        <div
          className="w-full text-center text-base font-semibold text-violet-700/80 tracking-wide"
          style={{
            background: "rgba(255,255,255,0.22)",
            borderRadius: "1rem",
            padding: "0.9rem 1.2rem",
            marginTop: "1rem",
            boxShadow: "0 2px 12px #a18cd122",
            transform: "skewX(-2deg)",
          }}
        >
          Select a user from the left to start a new conversation.<br />
          <span className="font-bold text-purple-500">Your chats are just a click away!</span>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
