// import React from "react";
// import "./OurArtists.css";
// import Artist1Img from "../../../public/assets/OurArtists/ArtistImg3.png";
// import Artist2Img from "../../../public/assets/OurArtists/ArtistImg2.png";
// import Artist3Img from "../../../public/assets/OurArtists/ArtistImg1.png";
// import Artist4Img from "../../../public/assets/OurArtists/ArtistImg4.png";
// import Artist5Img from "../../../public/assets/OurArtists/ArtistImg5.png";
// import Artist7Img from "../../../public/assets/OurArtists/ArtistImg7.png";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// const OurArtists = () => {
//   return (
//     <>
//       <div className="mainTop">
//         <div className="flex justify-between items-center">
//           <div className="top flex justify-center items-center">
//             <div className="topImg">
//               <img src={Artist7Img} alt="Artist Image" />
//             </div>

//             <div className="paint-order">
//               <h1 className="artistsHeading">
//                 <span className="our">OUR</span>
//                 <span className="team">TEAM</span>
//                 <span className="of">OF</span>
//                 <br />
//                 <span className="artists">ARTISTS</span>
//               </h1>
//             </div>
//           </div>
//           <div>
//             <Navbar />
//           </div>
//         </div>
//       </div>

//       <div className="UpperRight">
//         <div className="right">
//           <div className="rightPara">
//             <p>
//               "[ARTIST'S NAME] IS A TALENTED ARTIST AT S PLUS STUDIOS,BRINGING THE WORLD OF KISHORE TO LIFE WITH THEIRDYNAMIC AND EVOCATIVE ILLUSTRATIONS. THEIR WORKCAPTURES THE ESSENCE OF EVERY CHARACTER AND SCENE,BLENDING EMOTION AND DETAIL TO CREATE VISUALS THATIMMERSE READERS IN THE STORY'S VIBRANT UNIVERSE."
//             </p>
//           </div>

//           <div className="rightImg">
//             <img src={Artist1Img} alt="Artist Image" />
//           </div>
//         </div>
//       </div>

//       <div className="UpperLeft">
//         <div className="left">
//           <div className="leftImg">
//             <img src={Artist2Img} alt="Artist Image" />
//           </div>
//           <div className="leftPara">
//             <p>
//             "[ARTIST'S NAME] IS A TALENTED ARTIST AT S PLUS STUDIOS,
// BRINGING THE WORLD OF KISHORE TO LIFE WITH THEIR
// DYNAMIC AND EVOCATIVE ILLUSTRATIONS. THEIR WORK
// CAPTURES THE ESSENCE OF EVERY CHARACTER AND SCENE,
// BLENDING EMOTION AND DETAIL TO CREATE VISUALS THAT
// IMMERSE READERS IN THE STORY'S VIBRANT UNIVERSE."
//             </p>
//           </div>
//           <div className="rightImg">
//             <img src={Artist3Img} alt="Artist Image" />
//           </div>
//         </div>
//       </div>

//       <div className="UpperLeft">
//         <div className="left">
//           <div className="leftImgBottom">
//             <img src={Artist5Img} alt="Artist Image" />
//           </div>
//           <div className="leftPara">
//             <p>
//              "[ARTIST'S NAME] IS A TALENTED ARTIST AT S PLUS STUDIOS,
// BRINGING THE WORLD OF KISHORE TO LIFE WITH THEIR
// DYNAMIC AND EVOCATIVE ILLUSTRATIONS. THEIR WORK
// CAPTURES THE ESSENCE OF EVERY CHARACTER AND SCENE,
// BLENDING EMOTION AND DETAIL TO CREATE VISUALS THAT
// IMMERSE READERS IN THE STORY'S VIBRANT UNIVERSE."
//             </p>
//           </div>
//           <div className="rightImg">
//             <img src={Artist4Img} alt="Artist Image" />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default OurArtists;

// import React from "react";
// import Artist1Img from "/assets/OurArtists/ArtistImg3.webp";
// import Artist2Img from "/assets/OurArtists/ArtistImg2.webp";
// import Artist3Img from "/assets/OurArtists/ArtistImg1.webp";
// import Artist4Img from "/assets/OurArtists/ArtistImg4.webp";
// import Artist5Img from "/assets/OurArtists/ArtistImg5.webp";
// // import Artist7Img from "../../../public/assets/OurArtists/ArtistImg7.png";
// import "./OurArtists.css"

// const OurArtists = () => {
//   return (
//     <>
//       <div className="mainTop">
//         <div className="flex flex-wrap justify-center md:justify-between items-center">
//           {/* Navbar: Appears on top for mobile */}
//           {/* <div className="w-full md:w-auto order-1 md:order-2">
//             <Navbar />
//           </div> */}

//           {/* Content: Appears below navbar for mobile */}
//           <div className="top flex flex-wrap justify-center md:justify-between items-center p-5 md:p-0 ">
//             {/* <div className="topImg">
//               <img src={Artist7Img} alt="Artist Image" className="h-[250px]" />
//             </div> */}
//             <div className="paint-order px-[20px] md:px-[50px]">
//               <h1 className="artistsHeading !text-[30px] md:!text-[50px] !text-center">
//                 <span className="our uppercase font-extrabold leading-none text-[#ff66c4] stroke-3 stroke-[#1e5175]">
//                   OUR
//                 </span>
//                 <span className="team uppercase font-extrabold leading-none text-[#97cfca] stroke-3 stroke-[#1e5175] mx-[6px]">
//                   TEAM
//                 </span>
//                 <span className="of uppercase font-extrabold leading-none text-white stroke-3 stroke-[#1e5175] mx-[6px]">
//                   OF
//                 </span>
//                 <br />
//                 <span className="artists uppercase font-extrabold leading-none !text-[30px] md:!text-[60px] text-[#91c4f6] stroke-8 stroke-[#1e5175] mx-[6px]">
//                   ARTISTS
//                 </span>
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="UpperRight flex justify-end items-center my-[10px] flex-wrap p-5 md:p-0">
//         <div className="right h-auto md:h-[45vh] w-full md:w-[60%] flex justify-center items-start gap-[30px] py-[20px] flex-wrap">
//           <div className="rightPara text-[14px] sm:text-[15px] w-full md:w-[45%] text-center">
//             <p>
//               "[ARTIST'S NAME] IS A TALENTED ARTIST AT S PLUS STUDIOS, BRINGING THE
//               WORLD OF KISHORE TO LIFE WITH THEIR DYNAMIC AND EVOCATIVE
//               ILLUSTRATIONS. THEIR WORK CAPTURES THE ESSENCE OF EVERY CHARACTER
//               AND SCENE, BLENDING EMOTION AND DETAIL TO CREATE VISUALS THAT
//               IMMERSE READERS IN THE STORY'S VIBRANT UNIVERSE."
//             </p>
//           </div>
//           <div className="rightImg">
//             <img src={Artist1Img} alt="Artist Image" className="h-[200px] sm:h-[250px] md:h-[260px]" />
//           </div>
//         </div>
//       </div>

//       <div className="UpperLeft flex justify-start items-center my-[10px] flex-wrap p-5 md:p-0">
//         <div className="left h-auto md:h-[45vh] w-full flex justify-evenly items-start gap-[30px] py-[20px] flex-wrap">
//           <div className="leftImg">
//             <img src={Artist2Img} alt="Artist Image" className="h-[200px] sm:h-[250px] md:h-[260px]" />
//           </div>
//           <div className="leftPara text-[14px] sm:text-[15px] w-full md:w-[30%] text-center">
//             <p>
//               "[ARTIST'S NAME] IS A TALENTED ARTIST AT S PLUS STUDIOS, BRINGING THE
//               WORLD OF KISHORE TO LIFE WITH THEIR DYNAMIC AND EVOCATIVE
//               ILLUSTRATIONS. THEIR WORK CAPTURES THE ESSENCE OF EVERY CHARACTER
//               AND SCENE, BLENDING EMOTION AND DETAIL TO CREATE VISUALS THAT
//               IMMERSE READERS IN THE STORY'S VIBRANT UNIVERSE."
//             </p>
//           </div>
//           <div className="rightImg">
//             <img src={Artist3Img} alt="Artist Image" className="h-[200px] sm:h-[250px] md:h-[260px]" />
//           </div>
//         </div>
//       </div>

//       <div className="UpperLeft flex justify-start items-center my-[10px] flex-wrap p-5 md:p-0">
//         <div className="left h-auto md:h-[45vh] w-full flex justify-evenly items-start gap-[30px] md:py-[20px] flex-wrap">
//           <div className="leftImgBottom">
//             <img
//               src={Artist5Img}
//               alt="Artist Image"
//               className="h-[120px] md:h-[130px] mt-[0px] md:mt-[100px] mr-[30px]"
//             />
//           </div>
//           <div className="leftPara text-[14px] sm:text-[15px] w-full md:w-[30%] text-center">
//             <p>
//               "[ARTIST'S NAME] IS A TALENTED ARTIST AT S PLUS STUDIOS, BRINGING THE
//               WORLD OF KISHORE TO LIFE WITH THEIR DYNAMIC AND EVOCATIVE
//               ILLUSTRATIONS. THEIR WORK CAPTURES THE ESSENCE OF EVERY CHARACTER
//               AND SCENE, BLENDING EMOTION AND DETAIL TO CREATE VISUALS THAT
//               IMMERSE READERS IN THE STORY'S VIBRANT UNIVERSE."
//             </p>
//           </div>
//           <div className="rightImg">
//             <img src={Artist4Img} alt="Artist Image" className="h-[200px] sm:h-[250px] md:h-[260px]" />
//           </div>
//         </div>
//       </div>

//       {/* <Footer /> */}
//     </>
//   );
// };

// export default OurArtists;

import React from "react";
import user from "/assets/user.jpg"

const OurArtists = () => {
  return (
    <>
      <div className="mainTop">
        <div className="heading">
          <h1 className="artistsHeading !text-[30px] md:!text-[50px] px-8 text-center md:!text-left">
            MEET THE TEAM!
          </h1>
        </div>
        <div className="firstArtist h-[200px] m-4 md:m-12">
          <div className="flex gap-4">
            <div className="flex flex-col justify-evenly items-start">
              <h2 className="text-4xl font-medium">ENDER</h2>
              <h4 className="text-yellow-400 tracking-wider">IMPERATOR</h4>
            </div>
            <div>
              <img src={user} alt="Team" className="w-28 h-28" />
            </div>
          </div>
          <div>
            <p className="capitalize text-xl max-w-xl">
              ender is the “imperator” of s plus studios llc. he is the author
              of kishore and i met a demon girl in an abandoned house and now
              she attends classes with me?!.
            </p>
          </div>
        </div>
        <div className="secondArtist flex flex-col items-end h-[200px] m-4 md:m-12">
          <div className="flex flex-row-reverse gap-4">
            <div className="flex flex-col justify-evenly items-start">
              <h2 className="text-4xl font-medium">NAME</h2>
              <h4 className="text-blue-400 uppercase tracking-wider">centurion</h4>
            </div>
            <div>
              <img src={user} alt="Team" className="w-28 h-28" />
            </div>
          </div>
          <div>
            <p className="capitalize text-xl max-w-xl">
              ender is the “imperator” of s plus studios llc. he is the author
              of kishore and i met a demon girl in an abandoned house and now
              she attends classes with me?!.
            </p>
          </div>
        </div>
        <div className="firstArtist h-[200px] m-4 md:m-12">
          <div className="flex gap-4">
            <div className="flex flex-col justify-evenly items-start">
              <h2 className="text-4xl font-medium">ENDER</h2>
              <h4 className="text-yellow-400 tracking-wider">IMPERATOR</h4>
            </div>
            <div>
              <img src={user} alt="Team" className="w-28 h-28" />
            </div>
          </div>
          <div>
            <p className="capitalize text-xl max-w-xl">
              ender is the “imperator” of s plus studios llc. he is the author
              of kishore and i met a demon girl in an abandoned house and now
              she attends classes with me?!.
            </p>
          </div>
        </div>
        <div className="secondArtist flex flex-col items-end h-[200px] m-4 md:m-12">
          <div className="flex flex-row-reverse gap-4">
            <div className="flex flex-col justify-evenly items-start">
              <h2 className="text-4xl font-medium">NAME</h2>
              <h4 className="text-blue-400 uppercase tracking-wider">centurion</h4>
            </div>
            <div>
              <img src={user} alt="Team" className="w-28 h-28" />
            </div>
          </div>
          <div>
            <p className="capitalize text-xl max-w-xl">
              ender is the “imperator” of s plus studios llc. he is the author
              of kishore and i met a demon girl in an abandoned house and now
              she attends classes with me?!.
            </p>
          </div>
        </div>
      
      </div>
    </>
  );
};

export default OurArtists;
