import React from "react";
import { Link } from "react-router-dom";
import {FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";


function Footer() {
  return (
    <footer className="w-full border-t border-gray-200">
      <div className="mx-auto px-8 py-3">
        <div className="flex justify-center gap-6 mb-2">
          {/* <div className="p-2 border border-gray-600 rounded-full hover:border-black">
            <Link to="/" className="text-gray-600 hover:text-black">
              <FaXTwitter className="w-6 h-6" />
            </Link>
          </div>
          <div className="p-2 border border-gray-600 rounded-full hover:border-black">
            <Link to="/" className="text-gray-600 hover:text-black">
              <FaFacebook className="w-6 h-6" />
            </Link>
          </div> */}
          <Link
            to="https://www.instagram.com/splusstudios?igsh=eWFyZXNvbnNwNG1i&utm"
            className="text-gray-600 hover:text-black"
          >
            <div className="p-2 border border-gray-600 rounded-full hover:border-black">
              <FaInstagram className="w-6 h-6" />
            </div>
          </Link>
          <Link
            to="https://www.youtube.com/@SPlusStudiosLLC"
            className="text-gray-600 hover:text-black"
          >
            <div className="p-2 border border-gray-600 rounded-full hover:border-black">
              <FaYoutube className="w-6 h-6" />
            </div>
          </Link>
          <Link
            to="https://www.tiktok.com/@splusstudiosllc"
            className="text-gray-600 hover:text-black"
          >
            <div className="p-2 border border-gray-600 rounded-full hover:border-black">
              <FaTiktok className="w-6 h-6" />
            </div>
          </Link>
        </div>
        <div className="w-full">
          <p className="text-center mb-1">Follow Us to Stay Up to Date</p>
        </div>

        <div className="text-center tracking-wide text-sm text-gray-800">
          <div>
            <Link to="/our-vision" className="hover:underline">
              Our Vision
            </Link>
            {" | "}
            <Link to="/terms" className="hover:underline">
              Terms of Use
            </Link>
            {" | "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            {" | "}
            <Link to="/cookie" className="hover:underline">
              Cookie Notice
            </Link>
            {" | "}
            <Link to="/faq" className="hover:underline">
              FAQ
            </Link>
          </div>
          <p className="md:text-right mt-2 md:mt-0 text-center text-black font-bold">
            2025 S Plus Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
