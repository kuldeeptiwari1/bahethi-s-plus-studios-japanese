"use client"

import { useState, useEffect } from "react"
import { Menu, X } from 'lucide-react'
import { novelData } from "./NovelData.js"
import KishoreNav from "../Kishore/KishoreNav.jsx"

export default function NovelReader() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [chapterPage, setChapterPage] = useState(0)
  const [pages, setPages] = useState([])

  const CHAPTERS_PER_PAGE = 6
  const WORDS_PER_PAGE = 200 // Approximate words per page
  const totalChapters = novelData.chapters.length
  const totalPages = Math.ceil(totalChapters / CHAPTERS_PER_PAGE)

  // Split chapter content into pages
  useEffect(() => {
    const content = novelData.chapters[activeChapter].content
    const words = content.split(" ")
    const pageCount = Math.ceil(words.length / WORDS_PER_PAGE)
    const newPages = []

    for (let i = 0; i < pageCount; i++) {
      const startIdx = i * WORDS_PER_PAGE
      const endIdx = Math.min(startIdx + WORDS_PER_PAGE, words.length)
      const pageContent = words.slice(startIdx, endIdx).join(" ")
      newPages.push(pageContent)
    }

    setPages(newPages)
  }, [activeChapter])

  const handleChapterSelect = (index) => {
    setActiveChapter(index)
        window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Calculate which chapters to show on the current page
  const startIdx = chapterPage * CHAPTERS_PER_PAGE
  const endIdx = Math.min(startIdx + CHAPTERS_PER_PAGE, totalChapters)
  const visibleChapters = novelData.chapters.slice(startIdx, endIdx)

  return (
    <>
    <KishoreNav isWhite={true}/>
    <div className="min-h-screen bg-black flex items-start justify-center p-4">
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-42 left-3 lg:left-6 z-30 bg-purple-800 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Toggle chapter menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      {isMenuOpen && (
        <nav className="fixed top-42 left-16 lg:left-20 h-[70vh] w-80 rounded-2xl border-4 border-purple-800 bg-white shadow-2xl z-40 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-purple-900 text-center">{novelData.title}</h2>
            <p className="text-sm text-gray-600 text-center mt-1">by {novelData.author}</p>
          </div>

          {/* Chapter Pagination Controls */}
          <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
            <button
              onClick={() => setChapterPage((p) => Math.max(0, p - 1))}
              disabled={chapterPage === 0}
              className="text-purple-700 px-3 py-1 rounded disabled:text-gray-300 hover:bg-purple-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-500 font-medium">
              {chapterPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setChapterPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={chapterPage === totalPages - 1}
              className="text-purple-700 px-3 py-1 rounded disabled:text-gray-300 hover:bg-purple-50"
            >
              Next
            </button>
          </div>

          {/* Chapter List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {visibleChapters.map((chapter, idx) => {
                const chapterIndex = startIdx + idx
                return (
                  <button
                    key={chapterIndex}
                    onClick={() => {
                      handleChapterSelect(chapterIndex)
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                      activeChapter === chapterIndex
                        ? "bg-purple-100 text-purple-900 font-semibold border-2 border-purple-300"
                        : "text-gray-700 hover:bg-purple-50 border-2 border-transparent"
                    }`}
                  >
                    {chapter.title}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Scrollable Pages Container */}
      <div className="relative max-w-md w-full pt-8">
        <div className="space-y-8">
          {pages.map((pageContent, pageIndex) => (
            <div key={pageIndex} className="bg-white rounded-lg shadow-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
              {/* Notebook Header */}
              <div className="bg-red-500 h-8 flex items-center justify-center">
                <div className="flex space-x-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-1 h-4 bg-white rounded-full opacity-80"></div>
                  ))}
                </div>
              </div>

              {/* Page Content */}
              <div className="h-full bg-white relative">
                {/* Notebook Lines */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, #e5e5e5 23px, #e5e5e5 24px)",
                    backgroundSize: "100% 24px",
                  }}
                />

                {/* Red Margin Line */}
                <div className="absolute left-12 top-0 bottom-0 w-px bg-red-300 opacity-60"></div>

                {/* Page Content */}
                <div className="relative h-full p-6 pl-16">
                  {pageIndex === 0 && (
                    <div className="mb-6">
                      <h1 className="text-lg font-bold text-center text-gray-800 mb-2">
                        {novelData.chapters[activeChapter].title}
                      </h1>
                    </div>
                  )}

                  <div className="text-center text-xs text-gray-500 mb-4">
                    Page {pageIndex + 1} of {pages.length}
                  </div>

                  <div className="prose prose-sm max-w-none">
                    {pageContent.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="mb-4 text-gray-800 leading-relaxed text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chapter Indicator */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">
              Chapter {activeChapter + 1} • {pages.length} {pages.length === 1 ? 'Page' : 'Pages'}
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
