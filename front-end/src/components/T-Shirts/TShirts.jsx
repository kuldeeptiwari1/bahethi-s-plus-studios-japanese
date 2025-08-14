import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Tshirts.css"

// Sample product data - in a real app, this would come from an API or props
const tshirts = [
  {
    id: 1,
    name: "GSR 2024 HATSUNE MIKU RACING JACKET",
    price: 140.0,
    image: "/assets/productImages/product1.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "DOOFIGHT - SENKOGU EDITION",
    price: 135.0,
    image: "/assets/productImages/product2.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "AGRS RACER SERIES",
    price: 120.0,
    image: "/assets/productImages/product3.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "GSR 2024 HATSUNE MIKU RACING JACKET - BLACK",
    price: 145.0,
    image: "/assets/productImages/product4.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "DOOFIGHT - PREMIUM EDITION",
    price: 150.0,
    image: "/assets/productImages/product5.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "AGRS RACER SERIES - LIMITED",
    price: 125.0,
    image: "/assets/productImages/product6.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "GSR 2023 HATSUNE MIKU RACING JACKET",
    price: 130.0,
    image: "/assets/productImages/product7.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "DOOFIGHT - CLASSIC EDITION",
    price: 115.0,
    image: "/assets/productImages/product8.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "AGRS RACER SERIES - VINTAGE",
    price: 110.0,
    image: "/assets/productImages/product9.webp",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 10,
    name: "GSR 2022 HATSUNE MIKU RACING JACKET",
    price: 125.0,
    image: "/assets/productImages/product10.webp",
    sizes: ["S", "M", "L", "XL"],
  },
]

// Split products into two rows
const firstRowProducts = tshirts.slice(0, 5)
const secondRowProducts = tshirts.slice(5, 10)

// Product Card Component
function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="min-w-[250px] max-w-[250px] border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {/* Sale tag could be added conditionally */}
          {Math.random() > 0.7 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">SALE</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium line-clamp-2 h-10">{product.name}</h3>
          <p className="text-lg font-bold mt-2">¥{product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}

// Carousel component with navigation buttons
function ProductCarousel({ products, direction = "left" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  })

  const [isPaused, setIsPaused] = useState(false)

  // Navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Auto-scrolling
  useEffect(() => {
    if (!emblaApi || isPaused) return

    const interval = setInterval(() => {
      if (direction === "left") {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollPrev()
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [emblaApi, isPaused, direction])

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        onClick={scrollPrev}
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        onClick={scrollNext}
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Carousel container */}
      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-4">
          {/* Duplicate products for infinite scroll effect */}
          {[...products, ...products].map((product, index) => (
            <div className="flex-[0_0_auto]" key={`${product.id}-${index}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TShirts() {
  return (
    <div className="w-full py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our T-Shirts Collection</h2>

      {/* First row - slides left to right */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Featured Products</h3>
        <ProductCarousel products={firstRowProducts} direction="left" />
      </div>

      {/* Second row - slides right to left (opposite direction) */}
      <div>
        <h3 className="text-xl font-semibold mb-4">New Arrivals</h3>
        <ProductCarousel products={secondRowProducts} direction="right" />
      </div>
    </div>
  )
}
