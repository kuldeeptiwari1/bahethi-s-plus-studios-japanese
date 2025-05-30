import { Link } from "react-router-dom";
import girlImage from "/assets/girlImage.webp";

export default function JoinUs() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around mt-[100px] md:mt-0 mb-1 w-full md:h-[60vh] bg-white">
      {/* Content Section - 75% Width */}
      <div className="flex-1 md:w-3/4 flex flex-col justify-center items-center px-4 mb-12 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase">Why us?</h1>
        <p className="text-lg md:text-2xl mb-4 max-w-[425px] text-start uppercase">
          S Plus Studios LLC is looking for artists and writers of all backgrounds and skill levels to partner with.
        </p>
        <p className="text-lg md:text-2xl mb-4 max-w-[425px] text-start uppercase">
          We can help bring your stories to life or embed you within a team of experienced artists that you can learn from.
        </p>
        <p className="text-lg md:text-2xl mb-4 max-w-[425px] text-start uppercase">
        Payment is negotiated on a per contract basis.
        </p>
        <p className="text-lg md:text-2xl mb-4 max-w-[425px] text-start uppercase">
          Email us at <a href="mailto:SPlusStudiosLLC@gmail.com" className="text-blue-500 underline">SPlusStudiosLLC@gmail.com</a> to learn more.
        </p>
      </div>

      {/* Girl Image Section - 25% Width */}
      <div className="flex items-center justify-center flex-1 md:w-1/4">
        <img
          className="w-[350px] h-[500px] object-cover md:!block"
          src={girlImage}
          alt="Girl Image S plus Studios"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}