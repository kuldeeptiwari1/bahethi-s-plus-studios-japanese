"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { novelData } from "./NovelData.js"

export default function NovelReader() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [chapterPage, setChapterPage] = useState(0)
  const CHAPTERS_PER_PAGE = 6
  const totalChapters = novelData.chapters.length
  const totalPages = Math.ceil(totalChapters / CHAPTERS_PER_PAGE)

  const handleChapterSelect = (index) => {
    setActiveChapter(index)
    // setIsMenuOpen(false)
  }

  // Calculate which chapters to show on the current page
  const startIdx = chapterPage * CHAPTERS_PER_PAGE
  const endIdx = Math.min(startIdx + CHAPTERS_PER_PAGE, totalChapters)
  const visibleChapters = novelData.chapters.slice(startIdx, endIdx)

  return (
    <div className="flex flex-col items-end md:me-32 my-14 justify-center relative">
      <div className="flex w-full max-w-5xl">
        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 sm:top-[25%] left-4 z-50 bg-purple-800 text-white p-2 rounded-full shadow-lg"
          aria-label="Toggle chapter menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Navigation (No overlay, no logo) */}
        {isMenuOpen && (
          <nav
            className="fixed md:top-[24%] md:left-10 md:h-[430px] rounded-3xl border-4 border-purple-800 bg-white shadow-lg z-40
                        w-[280px] top-0 left-0 h-full flex flex-col items-center justify-start pt-8"
          >
            {/* NEXT CHAPTER Button */}
            {/* <button
              onClick={() => {
                if (activeChapter < totalChapters - 1) handleChapterSelect(activeChapter + 1)
              }}
              disabled={activeChapter >= totalChapters - 1}
              className="text-xl font-bold text-purple-900 mb-6 hover:underline disabled:text-gray-400"
            >
              NEXT CHAPTER
            </button> */}

            {/* Chapter Pagination Controls */}
            <div className="flex justify-between w-full px-4 mb-2">
              <button
                onClick={() => setChapterPage((p) => Math.max(0, p - 1))}
                disabled={chapterPage === 0}
                className="text-purple-700 px-2 py-1 rounded disabled:text-gray-300"
              >
                Prev
              </button>
              <span className="text-sm text-gray-500">
                {chapterPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setChapterPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={chapterPage === totalPages - 1}
                className="text-purple-700 px-2 py-1 rounded disabled:text-gray-300"
              >
                Next
              </button>
            </div>

            {/* Chapter Buttons (Paginated) */}
            <div className="space-y-4 w-full px-4">
              {visibleChapters.map((chapter, idx) => {
                const chapterIndex = startIdx + idx
                return (
                  <button
                    key={chapterIndex}
                    onClick={() => handleChapterSelect(chapterIndex)}
                    className={`block w-full text-center px-4 py-2 text-purple-900 rounded-lg transition-all duration-200
                      ${activeChapter === chapterIndex
                        ? "bg-purple-100 font-semibold"
                        : "hover:bg-purple-50"}`}
                  >
                    {chapter.title}
                  </button>
                )
              })}
            </div>

            {/* LAST CHAPTER Button */}
            {/* <button
              onClick={() => handleChapterSelect(totalChapters - 1)}
              disabled={activeChapter === totalChapters - 1}
              className="text-xl font-bold text-purple-900 mt-6 hover:underline disabled:text-gray-400"
            >
              LAST CHAPTER
            </button> */}
          </nav>
        )}

        {/* Book Content (unchanged) */}
        <div className="flex-1 relative">
          <div className="bg-white shadow-2xl mx-auto">
            <div className="flex flex-col md:flex-row">
              {/* Left Page */}
              <div className="w-full md:w-1/2 border-r border-gray-300 p-4 bg-white">
                <div
                  className="h-full bg-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 uppercase text-center">
                      {novelData.chapters[activeChapter].title}
                    </h2>
                    <div className="prose max-w-none">
                      {novelData.chapters[activeChapter].content
                        .split("\n\n")
                        .slice(0, Math.ceil(novelData.chapters[activeChapter].content.split("\n\n").length / 2))
                        .map((paragraph, idx) => (
                          <p key={idx} className="mb-4 text-sm">
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Spiral Binding */}
              <div className="hidden md:flex flex-col items-center justify-between py-8 bg-gray-200 w-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-gray-400 border-2 border-gray-300"></div>
                ))}
              </div>

              {/* Right Page */}
              <div className="w-full md:w-1/2 border-l border-gray-300 p-4 bg-white">
                <div
                  className="h-full bg-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                >
                  <div className="p-6">
                    <div className="prose max-w-none">
                      {novelData.chapters[activeChapter].content
                        .split("\n\n")
                        .slice(Math.ceil(novelData.chapters[activeChapter].content.split("\n\n").length / 2))
                        .map((paragraph, idx) => (
                          <p key={idx} className="mb-4 text-sm">
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
