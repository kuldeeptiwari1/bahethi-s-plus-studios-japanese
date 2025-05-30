//Dynamic
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import noonebutton from "/assets/noonebutton.webp"
import slideShowImages from "../Banner/slideShowImages.js"; 
import logo from "/assets/logo.webp"
import { getDirectorNote } from "./notesdata.js"


export function InfoSidebar({ currentChapter }) {
  const [isNoteExpanded, setIsNoteExpanded] = useState(false)
  const [directorNote, setDirectorNote] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideShowImages.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    setDirectorNote(getDirectorNote(currentChapter))
  }, [currentChapter])

  return (
    <aside className=" h-[80vh] justify-end align-bottom p-2 flex flex-col relative">

      {/* Director's Note (Hover Effect) */}
      <div 
        className="relative"
        onMouseEnter={() => setIsNoteExpanded(true)}
        onMouseLeave={() => setIsNoteExpanded(false)}
      >
        <div
          className={`notebook transition-all duration-500 ease-in-out cursor-pointer  ${
            isNoteExpanded ? "absolute bottom-7 right-8 w-[400px] h-[300px] z-50" : "w-full h-[200px] hover:scale-105"
          }`}
          style={{
            transform: isNoteExpanded ? "scale(1.2)" : "scale(1)",
            transformOrigin: "bottom right",
          }}
        >
          {/* Spiral binding */}
          <div className="absolute -left-3 top-0 h-full w-6 flex flex-col justify-between">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="h-2 w-6 bg-black rounded-full"
                style={{
                  transform: i % 2 === 0 ? "rotate(-5deg)" : "rotate(5deg)",
                }}
              />
            ))}
          </div>

          {/* Notebook paper */}
          <div className="relative bg-white rounded-lg p-4 shadow-xl w-full h-full overflow-auto notebook-paper">
            {/* Paper texture lines */}
            <div className="absolute inset-0 pointer-events-none overflow-y-hidden border border-sky-200">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="absolute w-full h-px bg-blue-200" style={{ top: `${(i + 1) * 2}rem` }} />
              ))}
            </div>

            {/* Content */}
            <div className="relative">
              <h3
                className={`font-bold mb-4 text-center transition-all duration-500 ${
                  isNoteExpanded ? "text-xl" : "text-2xl"
                }`}
              >
                Director's note <span className="text-4xl"> "</span>
              </h3>
              <p
                className={`text-black text-center transition-all duration-500 ${
                  isNoteExpanded ? "text-base" : "text-md"
                }`}
              >
                {directorNote}
              </p>
              {isNoteExpanded && (
                <p className="mt-4 text-black text-center text-sm">
                  Additional content can be added here when the note is expanded. This could include more detailed
                  information about the director's vision, the creative process, or any other relevant details about the
                  project.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
