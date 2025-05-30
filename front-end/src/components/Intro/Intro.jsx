import React, { useEffect } from "react";
import Logo from "/assets/logo.webp";
import "./Intro.css";

const IntroPage = () => {
  return (
    <div className="intro-page">
      <div className="logo-container fade-in">
        <img src={Logo} alt="S Plus Studios Logo" />
      </div>
      <div className="absolute bottom-5 md:pr-8 w-full">
        <p className="md:text-end text-center text-black font-bold tracking-wide text-sm">
          2025 S Plus Studios. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default IntroPage;
