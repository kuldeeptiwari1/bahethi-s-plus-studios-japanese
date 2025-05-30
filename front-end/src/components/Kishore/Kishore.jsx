import React, { useState } from "react";
import { ChapterNavigation } from "./ChapterNavigation";
import { InfoSidebar } from "./InfoSidebar";
import Chapter from "./Chapter";
import KishoreNav from "./KishoreNav.jsx";

export default function Kishore() {
  const [currentChapter, setCurrentChapter] = useState(1);

  const handleChapterSelect = (chapterId) => {
    setCurrentChapter(chapterId);
    window.scrollTo(0, 0);
  };

  return (
  <>
    <KishoreNav isWhite={true}/>
    <div className="flex overflow-hidden bg-black">
      {/* Desktop Sidebar */}
      <div className="md:!block w-[25%]" style={{ display: "none" }}>
        <ChapterNavigation onChapterSelect={handleChapterSelect} currentChapter={currentChapter} />
      </div>

      <div className="flex h-screen pt-[150px]">
        {/* Chapter Navigation - Fixed position handled by the component */}
        <ChapterNavigation onChapterSelect={handleChapterSelect} currentChapter={currentChapter} /> 
        </div>

      {/* Main Content (Chapter Section) */}
      <main className="w-full md:w-3/5 overflow-y-auto h-screen scrollbar-hide flex-grow md:mb-0 mb-5 p-5">
        <Chapter chapterId={currentChapter} />
      </main>

      {/* Desktop Info Sidebar */}
      <div className="md:!block w-[25%]" style={{ display: "none" }}>
        <InfoSidebar currentChapter={currentChapter} />
      </div>
    </div>
    </>
  );
}
