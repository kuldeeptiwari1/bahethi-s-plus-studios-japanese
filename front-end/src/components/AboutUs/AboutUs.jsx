import React from "react";

const AboutUs = () => {
  return (
    <div className="relative w-full h-[66vh] z-0 mt-[20px] md:mt-[-30px] flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: "url('/assets/focus.webp')" }}>
      {/* Overlay for better text readability */}

      {/* Centered Content */}
      <div className="relative z-10 text-center text-black px-6">
        <h1 className="text-4xl md:text-6xl tracking-tight font-medium mb-4">OUR VISION</h1>
        <p className="text-sm tracking-wide md:text-xl max-w-3xl mb-6">
        WELCOME TO S PLUS STUDIOS, WHERE IMAGINATION MEETS ARTISTRY. WE ARE A PASSIONATE
TEAM OF STORYTELLERS AND CREATORS DEDICATED TO CRAFTING UNIQUE, CAPTIVATING
NARRATIVES AND BREATHTAKING ILLUSTRATIONS. AT THE HEART OF OUR STUDIO IS KISHORE,
OUR FLAGSHIP MANGA PROJECT, A VIBRANT TALE THAT WEAVES COMPELLING CHARACTERS AND
INTRICATE WORLDS TO CAPTIVATE AUDIENCES AROUND THE GLOBE.
        </p>
        <p className="text-sm tracking-wide md:text-xl max-w-3xl mb-6">
        DRIVEN BY A LOVE FOR ANIME, MANGA, AND ALL THINGS CREATIVE, WE PRIDE OURSELVES ON
PUSHING THE BOUNDARIES OF STORYTELLING AND VISUAL ARTISTRY. WHETHER IT’S THROUGH
DYNAMIC ACTION SCENES, INTRICATE CHARACTER DESIGNS, OR IMMERSIVE ENVIRONMENTS, OUR
WORK IS A TESTAMENT TO OUR COMMITMENT TO QUALITY AND INNOVATION.
        </p>
        <p className="text-sm tracking-wide md:text-xl max-w-3xl ">
        AT S PLUS STUDIOS, WE BELIEVE STORIES HAVE THE POWER TO INSPIRE, CONNECT, AND
TRANSFORM. JOIN US ON THIS EXCITING JOURNEY AS WE BRING OUR WORLDS TO LIFE, ONE
PANEL AT A TIME.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
