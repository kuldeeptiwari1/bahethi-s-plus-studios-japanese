// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import noonebutton from "/assets/noonebutton.webp";
// import noonelogo from "/assets/noonelogo.webp";
// import tubeImage from "/assets/tube.png";
// import { ChapterNavigation } from "./ChapterNavigation";
// import { getDirectorNote } from "./notesdata.js";

// export function MobileSidebar({ currentChapter, onChapterSelect }) {
//   const [isTubePopupOpen, setIsTubePopupOpen] = useState(false);
//   const [isNoteExpanded, setIsNoteExpanded] = useState(false);

//   return (
//     <>
//       {/* Mobile Sidebar */}
//       <aside className="fixed left-0 top-0 w-20 h-full flex flex-col items-center p-2 bg-gray-100 shadow-lg z-50 md:hidden">
//         {/* Tube Image (Opens Popup) */}
//         <img
//           src={tubeImage}
//           alt="Tube"
//           className="w-12 h-40 cursor-pointer hover:scale-110 transition"
//           onClick={() => setIsTubePopupOpen(true)}
//         />

//         {/* Director's Note (Expands on Click) */}
//         <div
//           className="mt-4 p-2 bg-white shadow-md rounded text-center cursor-pointer hover:scale-105 transition"
//           onClick={() => setIsNoteExpanded(true)}
//         >
//           <p className="text-xs font-bold">Director's Note</p>
//         </div>

//         {/* Photo of No One (Redirects) */}
//         <Link to="/photo-of-no-one" className="mt-4">
//           <img src={noonebutton} alt="No One" className="w-16 h-16 hover:scale-110 transition" />
//         </Link>
//       </aside>

//       {/* Tube Popup */}
//       {isTubePopupOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-5/6 h-5/6 p-4 rounded shadow-lg relative">
//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
//               onClick={() => setIsTubePopupOpen(false)}
//             >
//               ✕
//             </button>

//             {/* Chapter Navigation */}
//             <ChapterNavigation onChapterSelect={onChapterSelect} currentChapter={currentChapter} />

//             {/* Photo of No One Section */}
//             <div className="text-center mt-6">
//               <Link to="/photo-of-no-one">
//                 <img src={noonelogo} alt="No One" className="w-40 h-40 mx-auto hover:scale-105 transition" />
//                 <p className="text-blue-950 underline font-bold mt-2">CHECK OUT</p>
//               </Link>
//             </div>

//             {/* Director's Note */}
//             <div className="mt-6 p-4 bg-gray-100 rounded shadow">
//               <h3 className="font-bold text-center">Director's Note</h3>
//               <p className="text-sm text-center">{getDirectorNote(currentChapter)}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Expanded Director's Note */}
//       {isNoteExpanded && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-5/6 h-auto p-4 rounded shadow-lg relative">
//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
//               onClick={() => setIsNoteExpanded(false)}
//             >
//               ✕
//             </button>

//             {/* Director's Note Content */}
//             <h3 className="font-bold text-center text-2xl">Director's Note</h3>
//             <p className="text-md text-center mt-4">{getDirectorNote(currentChapter)}</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// =============================================================NAYAB CODE==================================================


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import noonebutton from "/assets/noonebutton.webp";
// import noonelogo from "/assets/noonelogo.webp";
// import tubeImage from "/assets/tube.png";
// import { ChapterNavigation } from "./ChapterNavigation";
// import { getDirectorNote } from "./notesdata.js";

// export function MobileSidebar({ currentChapter, onChapterSelect }) {
//   const [isTubePopupOpen, setIsTubePopupOpen] = useState(false);
//   const [isNoteExpanded, setIsNoteExpanded] = useState(false);

//   // Function to handle chapter selection and close the tube popup
//   const handleChapterSelect = (chapterId) => {
//     onChapterSelect(chapterId); // Call the passed function to change chapter
//     setIsTubePopupOpen(false); // Close the tube popup
//   };

//   return (
//     <>
//       {/* Mobile Sidebar */}
//       <aside className="fixed left-0 top-0 w-20 h-full flex flex-col items-center p-2 bg-white shadow-lg z-50 md:hidden">
//         {/* Tube Image (Opens Popup) */}
//         {/* <img
//           src={tubeImage}
//           alt="Tube"
//           className="w-12 h-40 cursor-pointer hover:scale-110 transition"
//           onClick={() => setIsTubePopupOpen(true)}
//         /> */}

//         <button
//       className="relative group"
//       onClick={() => setIsTubePopupOpen(true)}
//     >
//       {/* Main button body */}
//       <div
//         className="w-12 h-48 bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300"
//         style={{
//           // clipPath: "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
//           clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
//         }}
//       >
//         {/* Vertical text */}
//         <div
//           className="text-xl font-bold text-black"
//           style={{
//             writingMode: "vertical-rl",
//             textOrientation: "upright",
//             color: "#ff00ff", // Magenta text to match the image
//             textShadow: "-1px -1px 0px black, 1px 1px 0px black", // Dual-color shadow effect
//           }}
//         >
//           章メニュー
//         </div>
//       </div>

//       {/* Pixelated edge effect layers */}
//       <div
//         className="absolute inset-0 border-2 border-green-300 -translate-x-1 translate-y-1 pointer-events-none"
//         style={{
//           clipPath: "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
          
//         }}
//       ></div>
//       <div
//         className="absolute inset-0 border-2 border-gray-700 translate-x-1 -translate-y-1 pointer-events-none"
//         style={{
//           clipPath: "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
//         }}
//       ></div>
//     </button>

//         {/* Director's Note (Expands on Click) */}
//         <div
//           className="mt-4 p-2 bg-white shadow-md rounded text-center cursor-pointer hover:scale-105 transition"
//           onClick={() => setIsNoteExpanded(true)}
//         >
//           <p className="text-xs font-bold">Director's Note</p>
//         </div>

//         {/* Photo of No One (Redirects) */}
//         <Link to="/photos-of-no-one" className="mt-4">
//           <h6 className="text-[9px] text-center font-semibold">
//             Photos Of No One
//           </h6>
//           <img
//             src={noonelogo}
//             alt="No One"
//             className="w-24 h-16 hover:scale-110 transition"
//           />
//         </Link>
//       </aside>

//       {/* Tube Popup */}
//       {isTubePopupOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-5/6 px-4 rounded shadow-lg relative">
//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
//               onClick={() => setIsTubePopupOpen(false)}
//             >
//               ✕
//             </button>

//             {/* Chapter Navigation */}
//             <ChapterNavigation
//               onChapterSelect={handleChapterSelect}
//               currentChapter={currentChapter}
//             />

//             {/* Photo of No One Section */}
//             <div className="text-center">
//               <Link to="/photos-of-no-one">
//                 <img
//                   src={noonelogo}
//                   alt="No One"
//                   className="w-40 h-28 mx-auto hover:scale-105 transition"
//                 />
//                 <p className="text-blue-950 underline font-bold">CHECK OUT</p>
//               </Link>
//             </div>

//             {/* Director's Note */}
//             <div className=" p-4 bg-gray-100 mb-12 mt-2 rounded shadow">
//               <h3 className="font-bold text-center">Director's Note</h3>
//               <p className="text-sm text-center">
//                 {getDirectorNote(currentChapter)}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Expanded Director's Note */}
//       {isNoteExpanded && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-5/6 h-auto p-4 rounded shadow-lg relative">
//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
//               onClick={() => setIsNoteExpanded(false)}
//             >
//               ✕
//             </button>

//             {/* Director's Note Content */}
//             <h3 className="font-bold text-center text-2xl">Director's Note</h3>
//             <p className="text-md text-center mt-4">
//               {getDirectorNote(currentChapter)}
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// ===========================================AMOL CODE===========================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import noonebutton from "/assets/noonebutton.webp";
import noonelogo from "/assets/noonelogo.webp";
import tubeImage from "/assets/tube.png";
import { ChapterNavigation } from "./ChapterNavigation";
import { getDirectorNote } from "./notesdata.js";

export function MobileSidebar({ currentChapter, onChapterSelect }) {
  const [isTubePopupOpen, setIsTubePopupOpen] = useState(false);
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);

  const handleChapterSelect = (chapterId) => {
    onChapterSelect(chapterId);
    setIsTubePopupOpen(false);
  };

  return (
    <>
      <aside className="fixed left-0 top-0 w-20 h-full flex flex-col items-center p-2 bg-white shadow-lg z-40 md:hidden">
        {/* Button Container */}
        <div className="relative">
          <button
            className="relative group"
            onClick={() => !isTubePopupOpen && setIsTubePopupOpen(true)}
          >
            <div
              className="w-12 h-48 bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{
                clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              }}
            >
              <div
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  color: "#ff00ff",
                  textShadow: "-1px -1px 0px black, 1px 1px 0px black",
                }}
              >
                章メニュー
              </div>
            </div>
            <div
              className="absolute inset-0 border-2 border-green-300 -translate-x-1 translate-y-1 pointer-events-none"
              style={{
                clipPath: "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
              }}
            ></div>
            <div
              className="absolute inset-0 border-2 border-gray-700 translate-x-1 -translate-y-1 pointer-events-none"
              style={{
                clipPath: "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
              }}
            ></div>
          </button>
        </div>

        {/* Director's Note Button */}
        <div
          className="mt-4 p-2 bg-white shadow-md rounded text-center cursor-pointer hover:scale-105 transition"
          onClick={() => setIsNoteExpanded(true)}
        >
          <p className="text-xs font-bold">Director's Note</p>
        </div>

        {/* Photo of No One Link */}
        <Link to="/photos-of-no-one" className="mt-4">
          <h6 className="text-[9px] text-center font-semibold">
            Photos Of No One
          </h6>
          <img
            src={noonelogo}
            alt="No One"
            className="w-24 h-16 hover:scale-110 transition"
          />
        </Link>
      </aside>

      {/* Centered Expanding Popup */}
      {isTubePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div 
            className="relative w-[80vw] h-[80vh] bg-gradient-to-br from-purple-300 to-purple-400 transform transition-all duration-500 shadow-2xl"
            style={{
              clipPath: "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
            }}
          >
            {/* Content Container */}
            <div className="absolute inset-4 bg-white overflow-y-auto p-6 rounded-lg">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-purple-300 to-purple-400 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                onClick={() => setIsTubePopupOpen(false)}
              >
                ✕
              </button>

              {/* Chapter Navigation */}
              <ChapterNavigation
                onChapterSelect={handleChapterSelect}
                currentChapter={currentChapter}
              />

              {/* Photo of No One Section */}
              <div className="text-center mt-6">
                <Link to="/photos-of-no-one">
                  <img
                    src={noonelogo}
                    alt="No One"
                    className="w-40 h-28 mx-auto hover:scale-105 transition"
                  />
                  <p className="text-blue-950 underline font-bold">CHECK OUT</p>
                </Link>
              </div>

              {/* Director's Note */}
              <div className="p-4 bg-gray-100 mb-12 mt-4 rounded shadow">
                <h3 className="font-bold text-center">Director's Note</h3>
                <p className="text-sm text-center">
                  {getDirectorNote(currentChapter)}
                </p>
              </div>
            </div>

            {/* Decorative Borders */}
            <div
              className="absolute inset-0 border-2 border-green-300 -translate-x-1 translate-y-1 pointer-events-none"
              style={{
                clipPath: "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
              }}
            ></div>
            <div
              className="absolute inset-0 border-2 border-gray-700 translate-x-1 -translate-y-1 pointer-events-none"
              style={{
                clipPath: "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Expanded Director's Note Modal */}
      {isNoteExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-5/6 h-auto p-4 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setIsNoteExpanded(false)}
            >
              ✕
            </button>
            <h3 className="font-bold text-center text-2xl">Director's Note</h3>
            <p className="text-md text-center mt-4">
              {getDirectorNote(currentChapter)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileSidebar;