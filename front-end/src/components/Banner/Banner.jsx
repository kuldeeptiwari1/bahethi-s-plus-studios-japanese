import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import BannerNav from "./BannerNav.jsx";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    id: "kishore",
    backgroundImage: "/assets/bannerBg.webp",
    title: "KISHORE",
    subtitle: "キショア",
    buttonText: "READ NOW",
    link: "/kishore",
  },
  {
    id: "second",
    backgroundImage: "/assets/bannerBg2.webp",
    title: "COMING SOON",
    subtitle: "次に来る",
    buttonText: "EXPLORE",
    link: "/comiket-preorder",
  },
];

export default function Banner() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", direction: "ltr" },
    [Autoplay({ delay: 4000 })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // Initial selection
  }, [emblaApi, onSelect]);

  const renderSlideContent = (slide) => {
    console.log(`Rendering slide: ${slide.id}`); // Debug log
    switch (slide.id) {
      case "kishore":
        return (
          <div className="relative z-40 text-white text-center p-8 rounded-xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-2 tracking-wider">
              {slide.title}
            </h1>
            <p className="text-2xl font-semibold mb-4">{slide.subtitle}</p>
            <Link
              to={slide.link}
              className="inline-block text-lg md:text-xl font-bold underline hover:text-blue-300 transition"
            >
              {slide.buttonText}
            </Link>
          </div>
        );

      case "second":
        return (
          <div className="relative z-40 text-center mt-5">
            <h1 className="md:leading-[120px] leading-[50px] md:!text-[8rem] text-center md:m-3">
              <span className="font-semibold italic p-0 text-[2rem] md:!text-[5.5rem] !text-white">BUY OUR</span>
              <br />
              <span className="font-edo p-0 text-[3rem] md:!text-[10rem]" style={{ color: "#8c52ff" }}>
                MERCH
              </span>
            </h1>
            <p className="text-xl md:text-4xl font-light mt-2 text-white mb-6">
              Available now to pre-order<br />
            </p>
            <Link
              to={slide.link}
              className="bg-white text-purple-500 font-bold text-2xl py-2 px-10 rounded-full transition"
            >
              BUY NOW
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <BannerNav isWhite={true} />
        </div>
      <div className="relative w-full md:h-screen overflow-hidden">

        {/* Carousel */}
        <div className="embla overflow-hidden md:h-screen" ref={emblaRef}>
          <div className="embla__container flex h-[300px] md:h-full">
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className="embla__slide relative md:min-w-full md:h-full min-w-full h-full flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-30 z-10" />

                {/* Content */}
                {renderSlideContent(slide)}
              </div>
            ))}
          </div>
        </div>

        {/* Dot Pagination */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                selectedIndex === index
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white"
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
