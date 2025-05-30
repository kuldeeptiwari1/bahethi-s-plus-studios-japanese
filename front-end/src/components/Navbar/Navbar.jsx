// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import logo from "/assets/logo.webp";
// import CartPanel from "../Cart/CartPanel.jsx";
// import { Search } from "lucide-react";

// export default function Navbar({isWhite}) {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (menu) => {
//     setOpenDropdown(openDropdown === menu ? null : menu);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown")) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className={`flex flex-col md:flex-row  items-center md:justify-center md:h-[150px] md:px-6 md:py-12 relative z-10`}>
//       {/* Navigation Links */}
//       <div className={`flex flex-row justify-start items-center gap-2 md:gap-8 w-full mt-4 md:mt-0 ml-4`}>
//         {/* About Us Dropdown */}
//         <div className="relative dropdown">
//           <button
//             onClick={() => toggleDropdown("about")}
//             className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
//           >
//             ABOUT US
//           </button>
//           {openDropdown === "about" && (
//             <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
//               <Link
//                 to="/our-vision"
//                 className="block px-4 py-2 hover:bg-gray-100"
//               >
//                 Our Vision
//               </Link>
//               <Link
//                 to="/our-artists"
//                 className="block px-4 py-2 hover:bg-gray-100"
//               >
//                 Our Artists
//               </Link>
//               <Link to="/join-us" className="block px-4 py-2 hover:bg-gray-100">
//                 Join Us
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Merch Dropdown */}
//         <div className="relative dropdown">
//           <button
//             onClick={() => toggleDropdown("merch")}
//             className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
//           >
//             MERCH
//           </button>
//           {openDropdown === "merch" && (
//             <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
//               <Link
//                 to="/comiket-preorder"
//                 className="block px-4 py-2 hover:bg-gray-100"
//               >
//                 Comiket Pre-Order
//               </Link>
//               <Link
//                 to="/photos-of-no-one"
//                 className="block px-4 py-2 hover:bg-gray-100"
//               >
//                 Photos of No One Pre-Order
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Updates Dropdown */}
//         <div className="relative dropdown">
//           <button
//             onClick={() => toggleDropdown("updates")}
//             className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
//           >
//             UPDATES
//           </button>
//           {openDropdown === "updates" && (
//             <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
//               <Link to="/updates" className="block px-4 py-2 hover:bg-gray-100">
//                 Blog
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Light Novels Dropdown */}
//         <div className="relative dropdown">
//           <button
//             onClick={() => toggleDropdown("light-novels")}
//             className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
//           >
//             LIGHT NOVEL
//           </button>
//           {openDropdown === "light-novels" && (
//             <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
//               <Link
//                 to="/demon-girl-light-novel"
//                 className="block px-4 py-2 hover:bg-gray-100"
//               >
//                 Demon Girl Light Novel
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Manga Dropdown */}
//         <div className="relative dropdown">
//           <button
//             onClick={() => toggleDropdown("manga")}
//             className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
//           >
//             MANGA
//           </button>
//           {openDropdown === "manga" && (
//             <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
//               <Link to="/kishore" className="block px-4 py-2 hover:bg-gray-100">
//                 Kishore
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Anime Dropdown */}
//         <div className="relative dropdown">
//           <button
//             onClick={() => toggleDropdown("anime")}
//             className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
//           >
//             ANIME
//           </button>
//           {openDropdown === "anime" && (
//             <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
//               <Link to="/donate" className="block px-4 py-2 hover:bg-gray-100">
//                 Donate
//               </Link>
//             </div>
//           )}
//         </div>

//         <div className="relative dropdown">
//           <button
//             onClick={() => toggleDropdown("join-us")}
//             className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
//           >
//             JOIN US
//           </button>
//           {openDropdown === "join-us" && (
//             <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
//               <Link to="/join-us" className="block px-4 py-2 hover:bg-gray-100">
//                 JOIN US
//               </Link>
//             </div>
//           )}
//         </div>
//         </div>

//         {/* Logo */}
//         <div className="md:w-[240px] z-20 w-full flex justify-end">
//           {/* Cart Panel Component */}
//           <div className="mr-8 flex">
//             <Search className={`${isWhite ? 'text-white' : 'text-black'}`} size={32}/>
//             <CartPanel isWhite={isWhite} />
//           </div>
//         </div>
//         <Link to="/" className="flex items-center gap-2">
//           <img
//             className="h-[100px] w-[120px] md:h-[130px] md:w-[200px]"
//             src={logo || "/placeholder.svg"}
//             alt="S Plus Studios"
//           />
//         </Link>
//     </nav>
//   );
// }







import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "/assets/logo.webp";
import CartPanel from "../Cart/CartPanel.jsx";
import { Menu, Search } from "lucide-react";
import { X } from "lucide-react"; // Import close icon

export default function Navbar({ isWhite }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the mobile menu

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`flex flex-col md:flex-row items-center md:justify-center md:h-[150px] md:px-6 md:py-12 relative z-10 bg-transparent`}>
      {/* Mobile Hamburger Button */}
      <button
        className={`md:hidden absolute left-4 top-4 z-20 ${isWhite ? 'text-white' : 'text-black'}`}
        onClick={toggleMobileMenu}
        aria-label="Open Mobile Menu"
      >
        <Menu size={32} />
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef} // Attach the ref to the mobile menu
          className="mobile-menu absolute left-0 top-0 h-[500px] w-52 bg-white shadow-lg z-30 p-4"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200"
            onClick={toggleMobileMenu}
            aria-label="Close Mobile Menu"
          >
            <X size={25} />
          </button>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 mt-12">
            <Link to="/our-vision" className="block py-2 hover:bg-gray-100">
              私たちのビジョン
            </Link>
            <Link to="/our-artists" className="block py-2 hover:bg-gray-100">
              アーティスト紹介
            </Link>
            <Link to="/join-us" className="block py-2 hover:bg-gray-100">
              チームに参加しよう
            </Link>
            <Link to="/comiket-preorder" className="block py-2 hover:bg-gray-100">
              コミケ予約
            </Link>
            <Link to="/photos-of-no-one" className="block py-2 hover:bg-gray-100">
              誰の写真
            </Link>
            <Link to="/updates" className="block py-2 hover:bg-gray-100">
              ブログ
            </Link>
            <Link to="/demon-girl-light-novel" className="block py-2 hover:bg-gray-100">
              デーモンガールライトノベル
            </Link>
            <Link to="/kishore" className="block py-2 hover:bg-gray-100">
              キショール
            </Link>
            <Link to="/donate" className="block py-2 hover:bg-gray-100">
              寄付
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className={`hidden md:!flex flex-row justify-start items-center gap-2 md:gap-8 w-full mt-4 md:mt-0 ml-4`}>
        {/* About Us Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={() => toggleDropdown("about")}
            className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
          >
            私たちについて
          </button>
          {openDropdown === "about" && (
            <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
              <Link
                to="/our-vision"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                私たちのビジョン
              </Link>
              <Link
                to="/our-artists"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                アーティスト紹介
              </Link>
              <Link to="/join-us" className="block px-4 py-2 hover:bg-gray-100">
                チームに参加しよう
              </Link>
            </div>
          )}
        </div>

        {/* Merch Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={() => toggleDropdown("merch")}
            className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
          >
            グッズ
          </button>
          {openDropdown === "merch" && (
            <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
              <Link
                to="/comiket-preorder"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                コミケ予約
              </Link>
              <Link
                to="/photos-of-no-one"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                誰の写真
              </Link>
            </div>
          )}
        </div>

        {/* Updates Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={() => toggleDropdown("updates")}
            className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
          >
            最新情報
          </button>
          {openDropdown === "updates" && (
            <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
              <Link to="/updates" className="block px-4 py-2 hover:bg-gray-100">
                ブログ
              </Link>
            </div>
          )}
        </div>

        {/* Light Novels Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={() => toggleDropdown("light-novels")}
            className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
          >
            ライトノベル
          </button>
          {openDropdown === "light-novels" && (
            <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
              <Link
                to="/demon-girl-light-novel"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                デーモンガールライトノベル
              </Link>
            </div>
          )}
        </div>

        {/* Manga Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={() => toggleDropdown("manga")}
            className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
          >
            漫画
          </button>
          {openDropdown === "manga" && (
            <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
              <Link to="/kishore" className="block px-4 py-2 hover:bg-gray-100">
                キショール
              </Link>
            </div>
          )}
        </div>

        {/* Anime Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={() => toggleDropdown("anime")}
            className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
          >
            アニメ
          </button>
          {openDropdown === "anime" && (
            <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
              <Link to="/donate" className="block px-4 py-2 hover:bg-gray-100">
                寄付
              </Link>
            </div>
          )}
        </div>

        <div className="relative dropdown">
          <button
            onClick={() => toggleDropdown("join-us")}
            className={`${isWhite ? 'text-white' : 'text-black'} underline underline-offset-4 md:font-bold text-sm md:text-xl`}
          >
            参加する
          </button>
          {openDropdown === "join-us" && (
            <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg border rounded-md w-48">
              <Link to="/join-us" className="block px-4 py-2 hover:bg-gray-100">
                参加する
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="md:w-[240px] mt-4 md:mt-0 z-10 w-full flex justify-end">
        {/* Cart Panel Component */}
        <div className="md:mr-8 mr-2 flex">
          <Search className={`${isWhite ? 'text-white' : 'text-black'}`} size={32}/>
          <CartPanel isWhite={isWhite} />
        </div>
      </div>
      <Link to="/" className="flex items-center gap-2 md:!block">
        <img
          className="h-[100px] w-[120px] md:h-[130px] md:w-[200px]"
          src={logo || "/placeholder.svg"}
          alt="S Plus Studios"
        />
      </Link>
    </nav>
  );
}
