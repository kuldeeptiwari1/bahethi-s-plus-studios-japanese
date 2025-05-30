"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from 'lucide-react'
import logo from "/assets/logo.webp"

export function ChapterNavigation({ onChapterSelect, currentChapter }) {
  const totalChapters = 3 // You can update this dynamically if needed
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Menu Toggle Button - For both mobile and desktop */}
      <button 
        onClick={toggleMenu} 
        className="fixed top-4 sm:top-[25%] left-4 z-50 bg-purple-800 text-white p-2 rounded-full shadow-lg"
        aria-label="Toggle chapter menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Sidebar - Fixed position with conditional display */}
      {isOpen && (
        <nav 
          className="fixed md:top-[24%] md:left-10 md:h-[500px] rounded-3xl border-4 border-purple-800 bg-white shadow-lg z-40
                    w-[280px] top-0 left-0 h-full"
        >
          <div className="w-full flex flex-col items-center text-center p-4 h-full">
            {/* Logo */}
            <div className="flex justify-center items-center mb-6">
              <Link to="/" className="flex items-center">
                <img className="h-[120px] w-[150px]" src={logo || "/placeholder.svg"} alt="S Plus Studios" />
              </Link>
            </div>

            {/* Chapter Navigation Container */}
            <div className="w-full max-w-[250px] p-4 flex flex-col items-center bg-white">
              {/* NEXT CHAPTER Button */}
              <button
                onClick={() => onChapterSelect(currentChapter < totalChapters ? currentChapter + 1 : currentChapter)}
                disabled={currentChapter >= totalChapters}
                className="text-xl font-bold text-purple-900 mb-6 hover:underline disabled:text-gray-400"
              >
                NEXT CHAPTER
              </button>

              {/* Chapter Buttons */}
              <div className="space-y-4 w-full">
                {[1, 2, 3].map((id) => (
                  <button
                    key={id}
                    onClick={() => onChapterSelect(id)}
                    className={`chapter-button block w-full text-center px-4 py-2 text-purple-900 rounded-lg transition-all duration-200
                      ${currentChapter === id 
                        ? "bg-purple-100 font-semibold" 
                        : "hover:bg-purple-50"}`}
                  >
                    Chapter {id}
                  </button>
                ))}
              </div>

              {/* LAST CHAPTER Button */}
              <button
                onClick={() => onChapterSelect(totalChapters)}
                disabled={currentChapter === totalChapters}
                className="text-xl font-bold text-purple-900 mt-6 hover:underline disabled:text-gray-400"
              >
                LAST CHAPTER
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Overlay to close menu when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
