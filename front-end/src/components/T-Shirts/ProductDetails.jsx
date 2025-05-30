import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../../Redux/cartSlice.js"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { toast, Toaster } from "react-hot-toast"

// Import the tshirts array from the TShirts component
const tshirts = [
  {
    id: 1,
    name: "GSR 2024 HATSUNE MIKU RACING JACKET",
    price: 140.0,
    image: "/assets/productImages/product1.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "A stylish jacket featuring Hatsune Miku, perfect for racing enthusiasts.",
  },
  {
    id: 2,
    name: "DOOFIGHT - SENKOGU EDITION",
    price: 135.0,
    image: "/assets/productImages/product2.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "Limited edition Doofight jacket with unique design.",
  },
  {
    id: 3,
    name: "AGRS RACER SERIES",
    price: 120.0,
    image: "/assets/productImages/product3.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "AGRS Racer Series jacket, designed for comfort and style.",
  },
  {
    id: 4,
    name: "GSR 2024 HATSUNE MIKU RACING JACKET - BLACK",
    price: 145.0,
    image: "/assets/productImages/product4.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "Black version of the GSR 2024 Hatsune Miku Racing Jacket.",
  },
  {
    id: 5,
    name: "DOOFIGHT - PREMIUM EDITION",
    price: 150.0,
    image: "/assets/productImages/product5.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "Premium edition of the Doofight jacket with enhanced features.",
  },
  {
    id: 6,
    name: "AGRS RACER SERIES - LIMITED",
    price: 125.0,
    image: "/assets/productImages/product6.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "Limited edition AGRS Racer Series jacket with exclusive design.",
  },
  {
    id: 7,
    name: "GSR 2023 HATSUNE MIKU RACING JACKET",
    price: 130.0,
    image: "/assets/productImages/product7.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "GSR 2023 Hatsune Miku Racing Jacket, designed for speed",
  },
  {
    id: 8,
    name: "DOOFIGHT - CLASSIC EDITION",
    price: 115.0,
    image: "/assets/productImages/product8.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "Classic edition of the Doofight jacket, a timeless design.",
  },
  {
    id: 9,
    name: "AGRS RACER SERIES - VINTAGE",
    price: 110.0,
    image: "/assets/productImages/product9.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "Vintage style AGRS Racer Series jacket, perfect for retro lovers.",
  },
  {
    id: 10,
    name: "GSR 2022 HATSUNE MIKU RACING JACKET",
    price: 125.0,
    image: "/assets/productImages/product10.webp",
    sizes: ["S", "M", "L", "XL"],
    description: "GSR 2022 Hatsune Miku Racing Jacket, designed for speed and style.",
  },
]


export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Find the product based on the ID from the URL
  const product = tshirts.find((p) => p.id === Number(id))

  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const addToCartHandler = () => {
    if (!selectedSize) {
      toast.error("Please select a size")
      return
    }

    // Create the cart item with the necessary properties
    const cartItem = {
      url: product.image,
      itemName: product.name,
      actual_Price: `$${product.price.toFixed(2)}`,
      size: selectedSize,
      quantity: quantity,
      id: product.id,
    }

    // Dispatch to Redux
    dispatch(addToCart(cartItem))

    // toast.success(`Added ${quantity} ${product.name} (${selectedSize}) to cart!`)
  }


  // If product not found, show error or redirect
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <button onClick={() => navigate("/t-shirts")} className="mt-4 px-4 py-2 bg-black text-white rounded">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-8">
      <Toaster position="top-center" />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="relative h-[500px] w-full">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-3xl font-bold mt-4">${product.price.toFixed(2)}</p>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">SIZE</h2>
            <div className="flex gap-2 mb-6">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border-2 ${
                    selectedSize === size ? "border-black bg-black text-white" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">QUANTITY</h2>
              <div className="flex items-center border-2 border-gray-300 w-fit">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 border-r border-gray-300"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button onClick={increaseQuantity} className="px-4 py-2 border-l border-gray-300">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={addToCartHandler}
              className="w-full py-3 border-2 rounded-md border-black text-lg font-bold uppercase hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify-center"
            >
              <ShoppingBag className="mr-2" size={20} />
              Add to Cart
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">DESCRIPTION</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
