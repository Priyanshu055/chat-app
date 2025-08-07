import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import { AuthContext } from "../../context/AuthContext";
import assets from "../assets/chat-app-assets/chat-app-assets/assets";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  // If a user is selected, show their info and media
  if (selectedUser) {
    return (
      <div
        className="w-full h-full flex flex-col justify-between relative"
        style={{
          background: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
          borderRadius: "2rem",
          boxShadow: "0 8px 40px #8ec5fc44",
          border: "2px solid #a18cd1",
          backdropFilter: "blur(8px)",
        }}
      >
        <div>
          <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto"
            style={{
              background: "rgba(255,255,255,0.45)",
              borderRadius: "1.5rem",
              margin: "1rem",
              boxShadow: "0 2px 16px #a18cd122",
              border: "1.5px solid #e0c3fc",
              padding: "1.5rem 0.5rem"
            }}
          >
            <img
              src={selectedUser.profilePic || assets.avatar_icon}
              alt=""
              className="w-20 aspect-[1/1] rounded-full"
            />
            <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2 text-gray-800">
              {onlineUsers.includes(selectedUser._id) && (
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              )}
              {selectedUser.fullName}
            </h1>
            <p className="px-10 mx-auto text-gray-500">{selectedUser.bio}</p>
          </div>
          <hr className="border-[#bdbdf0] my-4" />
          <div className="px-5 text-xs">
            <p className="text-gray-700 font-semibold mb-2">Media</p>
            <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
              {msgImages.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url)}
                  className="cursor-pointer rounded"
                >
                  <img src={url} alt="" className="h-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="m-5 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer shadow-lg hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  // If no user is selected, show a simple, crazy, modern info panel
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center px-6 py-8"
      style={{
        background:
          "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        borderRadius: "2rem",
        boxShadow: "0 8px 40px #8ec5fc44",
        minHeight: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Funky gradient shapes */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "-60px",
          width: "180px",
          height: "180px",
          background: "radial-gradient(circle, #a18cd1 0%, #fbc2eb 80%, transparent 100%)",
          opacity: 0.25,
          zIndex: 0,
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "140px",
          height: "140px",
          background: "radial-gradient(circle, #fbc2eb 0%, #a6c1ee 80%, transparent 100%)",
          opacity: 0.18,
          zIndex: 0,
          filter: "blur(8px)",
        }}
      />
      <div className="w-full mb-8 z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center tracking-wider">
          Welcome to Quick Chat!
        </h2>
        <p className="text-gray-600 text-center font-medium">
          Select a user to start chatting.<br />
          Enjoy a smooth, modern chat experience.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 z-10">
        <div className="bg-white/80 rounded-xl shadow p-4 border border-violet-100">
          <h3 className="font-semibold text-violet-700 mb-1">How to use?</h3>
          <ul className="text-gray-500 text-sm list-disc ml-5">
            <li>Click a user to open a chat</li>
            <li>Send images, text, and more</li>
            <li>Profile & settings in the sidebar</li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow p-4 mt-2 border border-indigo-200">
          <h3 className="font-semibold text-indigo-700 mb-1">Did you know?</h3>
          <p className="text-gray-600 text-sm">
            You can chat with multiple users at once!
          </p>
        </div>
      </div>
      {/* Animated gradient bar at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "8px",
          background:
            "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 50%, #8ec5fc 100%)",
          animation: "moveBar 3s linear infinite alternate",
        }}
      />
      <style>
        {`
          @keyframes moveBar {
            0% { filter: blur(0px);}
            100% { filter: blur(4px);}
          }
        `}
      </style>
    </div>
  );
};

export default RightSidebar;
