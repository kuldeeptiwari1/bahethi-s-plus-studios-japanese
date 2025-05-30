import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200">
      <div className="mx-auto px-8 py-3">
        <div className="flex justify-center gap-6 mb-2">
          <Link
            to="https://www.instagram.com/splusstudiosjp?igsh=MXh4N2dlY3N4NTNkZQ%3D%3D&utm_source=qr"
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
          <p className="text-center mb-1">最新情報を受け取るにはフォローしてください</p>
        </div>

        <div className="text-center tracking-wide text-sm text-gray-800">
          <div>
            <Link to="/our-vision" className="hover:underline">
              私たちのビジョン
            </Link>
            {" | "}
            <Link to="/terms" className="hover:underline">
              利用規約
            </Link>
            {" | "}
            <Link to="/privacy" className="hover:underline">
              プライバシーポリシー
            </Link>
            {" | "}
            <Link to="/cookie" className="hover:underline">
              クッキーに関するお知らせ
            </Link>
            {" | "}
            <Link to="/faq" className="hover:underline">
              よくある質問
            </Link>
          </div>
          <p className="md:text-right mt-2 md:mt-0 text-center text-black font-bold">
            2025 S Plus Studios. 無断転載を禁じます。
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
