// import React, { useState, useEffect, useRef } from "react";
// import { getChapterImages } from "../../assets/data.js";
// import { ClipLoader } from "react-spinners";

// const Chapter = ({ chapterId }) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [clickedIndex, setClickedIndex] = useState(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     setLoading(true);
//     getChapterImages(chapterId)
//       .then((imgs) => {
//         setImages(imgs);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(`Error loading images for chapter ${chapterId}:`, error);
//         setLoading(false);
//       });

//     if (containerRef.current) {
//       containerRef.current.scrollTop = 0;
//     }
//   }, [chapterId]);

//   // Handle click outside to reset scaling
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setClickedIndex(null);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <ClipLoader color="#000" size={50} />
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="w-full h-full overflow-y-auto scrollbar-hide">
//       <div className="flex flex-col items-center space-y-6">
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className={`relative w-full max-w-xl h-[600px] transition-transform duration-300 ease-out ${
//               clickedIndex === index ? "scale-125 z-10" : "scale-100"
//             }`}
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering outside click
//               setClickedIndex(clickedIndex === index ? null : index);
//             }}
//           >
//             <img
//               src={img || "/placeholder.svg"}
//               alt={`Page ${index + 1} of Chapter ${chapterId}`}
//               className="w-full h-full object-contain cursor-pointer"
//               loading="lazy"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chapter;



//Optimized 
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { getChapterImages } from "../../../public/assets/data.js";
import { ClipLoader } from "react-spinners";

const IMAGES_PER_LOAD = 5; // Load 5 images at a time

const Chapter = ({ chapterId }) => {
  const [allImages, setAllImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const observerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    getChapterImages(chapterId)
      .then((imgs) => {
        setAllImages(imgs);
        setLoadedImages(imgs.slice(0, IMAGES_PER_LOAD)); // Load initial images
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error loading images for chapter ${chapterId}:`, error);
        setLoading(false);
      });

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [chapterId]);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load more images when user scrolls down
  useEffect(() => {
    if (!allImages.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadedImages((prev) => {
            const nextBatch = allImages.slice(prev.length, prev.length + IMAGES_PER_LOAD);
            return [...prev, ...nextBatch]; // Load next set of images
          });
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [allImages]);

  // Handle click outside to reset zoom (Only on desktop)
  const handleClickOutside = useCallback((event) => {
    if (!isMobile && containerRef.current && !containerRef.current.contains(event.target)) {
      setClickedIndex(null);
    }
  }, [isMobile]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="black" size={50} />
      </div>
    );
  }

  return (
    <>
      {/* Main Chapter Content */}
      <div 
        ref={containerRef} 
        className="w-full h-screen flex flex-col items-center justify-start overflow-y-auto scrollbar-hide"
      >
        <div className="flex flex-col items-center space-y-6">
          {loadedImages.map((img, index) => (
            <MemoizedImageCard
              key={index}
              src={img}
              index={index}
              clickedIndex={clickedIndex}
              setClickedIndex={setClickedIndex}
              setFullscreenImage={isMobile ? setFullscreenImage : null} // Enable full-screen only for mobile
              isMobile={isMobile}
            />
          ))}
          {/* Invisible div to trigger loading more images */}
          {loadedImages.length < allImages.length && <div ref={observerRef} className="h-10 w-full"></div>}
        </div>
      </div>

      {/* Full-Screen Modal (Only for Mobile) */}
      {isMobile && fullscreenImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <button 
            className="absolute top-20 right-2 flex justify-center items-center text-white text-xl font-extrabold h-10 w-10 bg-red-700 rounded-full"
            onClick={() => setFullscreenImage(null)}
          >
            ✕
          </button>
          <img src={fullscreenImage} alt="Full Screen" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </>
  );
};

// Memoized Image Card to prevent unnecessary re-renders
const MemoizedImageCard = memo(({ src, index, clickedIndex, setClickedIndex, setFullscreenImage, isMobile }) => {
  return (
    <div
      className={`relative w-full max-w-xl h-[400px] md:h-[600px] transition-transform duration-300 ease-out ${
        !isMobile && clickedIndex === index ? "scale-125 z-10" : "scale-100"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (!isMobile) {
          setClickedIndex(clickedIndex === index ? null : index);
        }
      }}
      onDoubleClick={() => isMobile && setFullscreenImage(src)} // Only trigger modal for mobile on double-click
    >
      <img
        src={src || "/placeholder.svg"}
        alt={`Page ${index + 1}`}
        className="w-full h-full object-contain cursor-pointer"
        loading="lazy"
      />
    </div>
  );
});

export default Chapter;