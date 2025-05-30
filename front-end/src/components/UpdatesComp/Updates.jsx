import React from "react";
import "./Updates.css";
import girlImage from "/assets/girlImage.webp";
import { IoLogoTwitch } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

const Updates = () => {
  return (
    <>
      <div className="topUpdates flex justify-start items-center w-full ">
        <h1 className=" ">Updates...</h1>
      </div>

      <div className="middleUpdates flex justify-evenly h-full px-[100px]">
        <div className="leftUpdates w-[40%]">
          <p className="leading-[45px] text-[1.2rem] tracking-[1px]">
            WE’RE THRILLED TO SHARE THAT KISHORE IS PROGRESSING BEAUTIFULLY! OUR
            TEAM HAS BEEN HARD AT WORK CRAFTING STUNNING ARTWORK AND DEVELOPING
            COMPELLING STORYLINES TO BRING THIS PROJECT TO LIFE. STAY TUNED FOR
            SNEAK PEEKS, BEHIND-THE-SCENES CONTENT, AND EXCLUSIVE UPDATES AS WE
            GEAR UP FOR THE MANGA’S DEBUT. THANK YOU FOR YOUR CONTINUED SUPPORT
            ON THIS INCREDIBLE JOURNEY!
          </p>
        </div>

        <div className="rightUpdates w-[30%] ml-[70px] mt-[7%] relative">
          <img src={girlImage} alt="Girl Image" />
        </div>
      </div>

      <div className="bottomUpdates absolute bottom-[-300px] flex flex-col justify-center items-center gap-[20px] h-[30vh] w-full">
        <h1 className="">FOLLOW US TO STAY UP TO DATE</h1>

        <div className="socialIcons flex justify-around gap-[30px] mt-[10px] mb-[20px]">
          <div className="icon h-[65px] w-[65px] bg-gray-500 flex justify-center items-center text-[40px] text-white rounded-full">
            <IoLogoTwitch />
          </div>
          <div className="icon h-[65px] w-[65px] bg-gray-500 flex justify-center items-center text-[40px] text-white rounded-full">
            <FaFacebookF />
          </div>
          <div className="icon h-[65px] w-[65px] bg-gray-500 flex justify-center items-center text-[40px] text-white rounded-full">
            <FaYoutube />
          </div>
          <div className="icon h-[65px] w-[65px] bg-gray-500 flex justify-center items-center text-[40px] text-white rounded-full">
            <FaDiscord />
          </div>
        </div>
      </div>

      <div className="lastUpdates">
        <div className="relative w-full  mx-auto h-full flex justify-center items-center">
          {/* Background waves animation */}
          <svg
            className="absolute top-0 left-0 w-full h-full -z-10"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 250 C 200 150 400 150 600 250 C 800 350 1000 350 1200 250 L 1200 1000 L 0 1000 Z"
              fill="rgba(255, 182, 255, 0.3)"
              className="animate-wave"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="
              M 0 250 C 200 150 400 150 600 250 C 800 350 1000 350 1200 250 L 1200 1000 L 0 1000 Z;
              M 0 250 C 200 350 400 350 600 250 C 800 150 1000 150 1200 250 L 1200 1000 L 0 1000 Z;
              M 0 250 C 200 150 400 150 600 250 C 800 350 1000 350 1200 250 L 1200 1000 L 0 1000 Z"
              />
            </path>
            <path
              d="M 0 350 C 200 250 400 250 600 350 C 800 450 1000 450 1200 350 L 1200 1000 L 0 1000 Z"
              fill="rgba(183, 182, 255, 0.3)"
              className="animate-wave"
            >
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
              M 0 350 C 200 250 400 250 600 350 C 800 450 1000 450 1200 350 L 1200 1000 L 0 1000 Z;
              M 0 350 C 200 450 400 450 600 350 C 800 250 1000 250 1200 350 L 1200 1000 L 0 1000 Z;
              M 0 350 C 200 250 400 250 600 350 C 800 450 1000 450 1200 350 L 1200 1000 L 0 1000 Z"
              />
            </path>
          </svg>

          {/* Content container */}
          <div className="relative bg-opacity-90 rounded-2xl text-center lg:px-[15%] text-bottomUpdates">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Fan Discord
              </h2>
            </div>

            <p className="text-gray-700 mb-8 leading-[30px] font-semibold">
              JOIN THE KISHORE DISCORD COMMUNITY AND CONNECT WITH FELLOW FANS OF
              THIS CAPTIVATING STORY! DIVE DEEPER INTO THE WORLD OF KISHORE,
              SHARE THEORIES, ENJOY EXCLUSIVE CONTENT, AND BE THE FIRST TO GET
              UPDATES ABOUT UPCOMING CHAPTERS AND EVENTS. WHETHER YOU'RE HERE TO
              CHAT ABOUT YOUR FAVORITE CHARACTERS, PARTICIPATE IN FUN
              DISCUSSIONS, OR SIMPLY CONNECT WITH LIKEMINDED FANS, OUR DISCORD
              IS THE PERFECT SPACE FOR YOU. LET’S GROW THIS ADVENTURE TOGETHER!
            </p>

           <div className="flex justify-center items-center">
           <button
              className="chapter-button block w-[200px] bg-purple-50 text-center px-10 text-purple-900 hover:bg-purple-50 p-2 rounded"
            >
              Join Discord
            </button>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updates;
