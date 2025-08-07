import React from "react";
import { useNavigate } from "react-router-dom";

const emojiList = ["😂", "🔥", "😎", "🥳", "💬", "🤩", "🎉", "👋", "🤖", "💥"];

const LandingPage = () => {
  const navigate = useNavigate();

  // Emoji rain for sidebar
  const emojiRain = Array.from({ length: 16 }).map((_, i) => {
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
        }}
      >
        {emoji}
      </span>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
      }}
    >
      {/* Crazy Colorful Sidebar */}
      <div
        style={{
          width: "520px", // Increased from 400px to 520px
          background: "linear-gradient(135deg, #00e6e6 0%, #0077ff 40%, #ff512f 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "2px 0 30px rgba(0,0,0,0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Emoji rain */}
        {emojiRain}
        {/* Funky shapes */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "-60px",
            width: "160px",
            height: "160px",
            background: "radial-gradient(circle, #fff 0%, #00e6e6 60%, transparent 100%)",
            opacity: 0.18,
            zIndex: 0,
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            right: "-50px",
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, #ff512f 0%, #fff 80%, transparent 100%)",
            opacity: 0.13,
            zIndex: 0,
            filter: "blur(2px)",
          }}
        />
        <h1
          style={{
            color: "#fff",
            fontSize: "3.2rem",
            letterSpacing: "3px",
            marginBottom: "18px",
            fontWeight: "bold",
            textShadow: "0 0 30px #00e6e6, 0 2px 10px #0077ff",
            zIndex: 1,
            transform: "rotate(-4deg)",
          }}
        >
          QUICK CHAT
        </h1>
        <p
          style={{
            color: "#fff",
            fontSize: "1.25rem",
            textAlign: "center",
            marginBottom: "38px",
            fontWeight: "600",
            letterSpacing: "1px",
            textShadow: "0 2px 10px #0077ff",
            zIndex: 1,
            transform: "rotate(-2deg)",
          }}
        >
          <span style={{ color: "#ffe066", fontWeight: "bold", fontSize: "1.5rem" }}>🚀</span> Connect instantly.<br />
          <span style={{ color: "#ff512f", fontWeight: "bold", fontSize: "1.5rem" }}>💬</span> Chat freely.<br />
          <span style={{ color: "#00e6e6", fontWeight: "bold" }}>Welcome to QUICK CHAT!</span>
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            width: "80%",
            padding: "15px",
            margin: "10px 0",
            fontSize: "1.1rem",
            borderRadius: "30px",
            border: "none",
            background: "linear-gradient(90deg, #00e6e6 0%, #0077ff 100%)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 20px #00e6e6",
            transition: "transform 0.15s, box-shadow 0.15s",
            zIndex: 1,
            letterSpacing: "1px",
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = "scale(1.09) rotate(-2deg)";
            e.currentTarget.style.boxShadow = "0 8px 32px #00e6e6";
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 20px #00e6e6";
          }}
        >
          <span role="img" aria-label="login">🔑</span> Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{
            width: "80%",
            padding: "15px",
            margin: "10px 0",
            fontSize: "1.1rem",
            borderRadius: "30px",
            border: "none",
            background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 20px #ff512f",
            transition: "transform 0.15s, box-shadow 0.15s",
            zIndex: 1,
            letterSpacing: "1px",
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = "scale(1.09) rotate(2deg)";
            e.currentTarget.style.boxShadow = "0 8px 32px #ff512f";
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 20px #ff512f";
          }}
        >
          <span role="img" aria-label="signup">📝</span> Signup
        </button>
      </div>
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "2rem",
          letterSpacing: "1px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Meme-style chat illustration with 3 characters */}
        <div style={{ width: 520, height: 320, position: "relative" }}>
          <svg width="100%" height="100%" viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left character */}
            <ellipse cx="60" cy="190" rx="60" ry="90" fill="#00e6e6" />
            <ellipse cx="60" cy="120" rx="40" ry="40" fill="#fff" />
            {/* Funny eyes */}
            <ellipse cx="48" cy="115" rx="8" ry="12" fill="#232526" />
            <ellipse cx="72" cy="115" rx="8" ry="12" fill="#232526" />
            {/* Raised eyebrow */}
            <rect x="38" y="100" width="18" height="4" rx="2" fill="#ff512f" transform="rotate(-10 38 100)" />
            {/* Big smile */}
            <path d="M50 135 Q60 150 70 135" stroke="#ff512f" strokeWidth="4" fill="none" />
            {/* Sweat drop */}
            <ellipse cx="35" cy="105" rx="3" ry="7" fill="#00e6e6" opacity="0.7"/>
            {/* Left chat bubble */}
            <rect x="10" y="60" rx="18" width="70" height="36" fill="#fff" />
            <text x="20" y="85" fontSize="15" fill="#232526" fontWeight="bold">Hey!</text>
            {/* Middle character */}
            <ellipse cx="260" cy="200" rx="50" ry="80" fill="#ffe066" />
            <ellipse cx="260" cy="130" rx="35" ry="35" fill="#fff" />
            {/* Big meme eyes */}
            <ellipse cx="250" cy="125" rx="7" ry="10" fill="#232526" />
            <ellipse cx="270" cy="125" rx="7" ry="10" fill="#232526" />
            {/* Big open mouth */}
            <ellipse cx="260" cy="145" rx="13" ry="7" fill="#ff512f" />
            {/* Funky hair */}
            <path d="M245 100 Q260 90 275 100" stroke="#00e6e6" strokeWidth="4" fill="none" />
            {/* Middle chat bubble */}
            <rect x="210" y="60" rx="18" width="100" height="36" fill="#fff" />
            <text x="220" y="85" fontSize="15" fill="#232526" fontWeight="bold">What's up?</text>
            {/* Right character */}
            <ellipse cx="460" cy="190" rx="60" ry="90" fill="#ff512f" />
            <ellipse cx="460" cy="120" rx="40" ry="40" fill="#fff" />
            {/* Goofy eyes */}
            <ellipse cx="448" cy="115" rx="8" ry="12" fill="#232526" />
            <ellipse cx="472" cy="120" rx="8" ry="12" fill="#232526" />
            {/* Funky eyebrow */}
            <rect x="438" y="100" width="18" height="4" rx="2" fill="#00e6e6" transform="rotate(10 438 100)" />
            {/* Big open mouth */}
            <ellipse cx="460" cy="140" rx="14" ry="8" fill="#00e6e6" />
            <ellipse cx="460" cy="143" rx="8" ry="4" fill="#fff" />
            {/* Right chat bubble */}
            <rect x="440" y="60" rx="18" width="70" height="36" fill="#fff" />
            <text x="450" y="85" fontSize="15" fill="#232526" fontWeight="bold">Hello!</text>
            {/* Laughing emoji between them */}
            <circle cx="160" cy="80" r="18" fill="#ffe066" />
            <ellipse cx="154" cy="78" rx="2.5" ry="3.5" fill="#232526" />
            <ellipse cx="166" cy="78" rx="2.5" ry="3.5" fill="#232526" />
            <path d="M155 90 Q160 96 165 90" stroke="#232526" strokeWidth="1.5" fill="none" />
            {/* Extra meme sparkles */}
            <circle cx="120" cy="60" r="3" fill="#fff" opacity="0.7"/>
            <circle cx="320" cy="60" r="2" fill="#fff" opacity="0.7"/>
            <circle cx="170" cy="200" r="2.5" fill="#fff" opacity="0.7"/>
            <circle cx="220" cy="170" r="2" fill="#fff" opacity="0.7"/>
            <ellipse cx="485" cy="105" rx="3" ry="7" fill="#00e6e6" opacity="0.7"/>
          </svg>
          <div style={{
            position: "absolute",
            bottom: -10,
            left: 0,
            width: "100%",
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            letterSpacing: "1px",
            textShadow: "0 2px 10px #0077ff",
          }}>
            <span style={{ color: "#00e6e6" }}>Great Conversation!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;