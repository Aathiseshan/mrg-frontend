import React, { useState } from "react";
import MarriageForm from "./components/Form";
import "./App.css";

export default function App() {
  const [userName] = useState("to Maha Periyava Thirumana Seva");

  const headerStyle = {
    textAlign: "center",
    padding: "20px 20px",
    background: "linear-gradient(90deg, #FF9A8B, #FF6B00)",
    color: "#fff",
    borderRadius: "0 0 30px 30px",
    position: "relative",
    overflow: "hidden",
    animation: "fadeInDown 1s ease",
  };

  const footerStyle = {
    textAlign: "center",
    padding: "20px",
    fontSize: "0.9rem",
    color: "#FF6B00",
    fontWeight: "500",
    animation: "fadeInUp 1s ease",
  };

  return (
    <div>
      <header style={headerStyle}>
        <img
          src="logo.png"
          alt="Marriage Logo"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            display: "block",
            margin: "0 auto 15px",
            animation: "scaleFade 1s ease forwards",
          }}
        />
        <h1>Welcome {userName} 💖</h1>
        <p>We find your perfect match with trust & blessings!</p>
      </header>

      <main>
        <MarriageForm />
      </main>

      <footer style={footerStyle}>
        <p>Trusted Marriage Connect © 2025 | Secure & Verified Matches for You</p>
      </footer>

      <style>
        {`
    @keyframes scaleFade {
      0% { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    }

    @keyframes fadeInDown {
      0% { opacity: 0; transform: translateY(-30px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    button:hover {
      transform: scale(1.05);
      background: #ff6b00;
      color: white;
    }
  `}
      </style>
    </div>
  );
}
