import { Link } from "react-router-dom";
import girlImage from "/assets/girlImage.webp";

export default function OurVision() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around mt-[50px] md:my-24 mb-1 w-full md:h-[60vh] bg-white">
      {/* Girl Image Section - 25% Width */}
      <div className="flex items-center justify-center flex-1 md:w-[20%]">
        <img
          className="w-[360px] h-[500px] object-cover md:!block"
          src={girlImage}
          alt="Girl Image S plus Studios"
          style={{ display: "none" }}
        />
      </div>

      {/* Content Section - 75% Width */}
      <div className="flex-1 md:w-[80%] flex flex-col justify-center items-center px-4  md:mb-0 md:pr-16">
        <h1 className="text-4xl md:text-6xl font-semibold mb-4">私たちは何者か</h1>
        <p className="text-lg md:text-2xl mb-4 max-w-2xl text-start uppercase">
          S Plus Studios LLCは2024年3月に設立され、漫画、ライトノベル、アニメへの情熱を原動力としています。私たちの使命は、高品質で倫理的な制作に真摯に取り組みながら、メディアを創造することです。私たちを形作ってきた物語にインスピレーションを受け、誠実さ、創造性、革新性を大切にしながら、心を動かす物語をお届けします。
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/join-us"
            className="bg-transparent text-center border text-2xl font-semibold tracking-wide pb-4 border-blue-950 text-blue-950 px-6 py-2 rounded-full underline hover:bg-blue-950 hover:text-white transition-colors"
          >
            チームに参加しよう
          </Link>
          <Link
            to="/our-artists"
            className="bg-transparent text-center border text-2xl font-semibold tracking-wide pb-4 border-blue-950 text-blue-950 px-6 py-2 rounded-full underline hover:bg-blue-950 hover:text-white transition-colors"
          >
            アーティスト紹介
          </Link>
        </div>
      </div>
    </div>
  );
}
