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
    <div className="flex items-center justify-center w-full h-full">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-8 py-8 max-w-xl w-full mx-4">
        <img src={assets.logo_icon} alt="" className="w-16 h-16 mb-2 md:mb-0" />
        <p className="text-2xl font-semibold text-white text-center md:text-left whitespace-nowrap">
          Chat anytime, anywhere
        </p>
      </div>
    </div>
  )
}

export default ChatContainer
