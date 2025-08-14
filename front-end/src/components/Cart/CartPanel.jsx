"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FaShoppingCart, FaTrash } from "react-icons/fa"
import { X, Plus, Minus, LucideShoppingCart, ShoppingBagIcon } from "lucide-react"
import { addToCart, decreaseCart, removeFromCart } from "../../Redux/cartSlice"

export default function CartPanel({ isWhite }) {
  const [isOpen, setIsOpen] = useState(false)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    // Ensure we're working with numbers
    console.log("consolee from cartpanel", item)
    const price =
      typeof item.actual_Price === "string" ? Number.parseFloat(item.actual_Price.replace(/[¥$,]/g, '')) : item.actual_Price

    return total + item.quantity * price
  }, 0)

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const panel = document.getElementById("cart-panel")
      const cartButton = document.getElementById("cart-button")

      if (panel && !panel.contains(event.target) && cartButton && !cartButton.contains(event.target) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Function to increase quantity
  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }))
  }

  return (
    <>
      {/* Cart Button */}
      <div
        id="cart-button"
        className="h-8 w-16 text-slate-800 flex items-center justify-center gap-1 relative cursor-pointer rounded-md hover:text-slate-700 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBagIcon className={`${isWhite ? "text-white" : "text-black"}`} size={40} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-0 bg-red-600 text-white text-xs px-2 rounded-full">
            {cartItems.length}
          </span>
        )}
      </div>

      {/* Cart Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Cart Panel */}
      <div
        id="cart-panel"
         className={`fixed top-0 right-0 h-full w-[85vw] sm:w-80 md:w-96 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl flex items-center">
              Your Cart <FaShoppingCart className="ml-2" />
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-200"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <LucideShoppingCart size={48} className="mb-4" />
                <p className="text-center">Your cart is currently empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex border-b pb-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 border border-gray-200 flex items-center justify-center mr-3">
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.itemName}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{item.itemName}</h3>
                      <p className="text-red-600 font-semibold">{item.actual_Price}</p>
                      {item.size && <p className="text-gray-500 text-xs">Size: {item.size}</p>}

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <div className="border p-1">
                         {/* Minus Button */}
                          <button
                            onClick={() => dispatch(decreaseCart(item))}
                            disabled={item.quantity === 1} // Disable when quantity is 1
                            className={`p-1 rounded-l ${item.quantity === 1 ? " cursor-not-allowed" : ""}`}
                            title={item.quantity === 1 ? "Cannot decrease further" : "Decrease quantity"}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(item)}
                            className="p-1 rounded-r"
                            title={"Increase quantity"}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item))}
                          className="ml-auto p-1 text-red-500 hover:text-red-700"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            {cartItems.length > 0 && (
              <>
                <div className="mb-4">
                  <span className="tracking-wider">Total:</span>
                  <span className="font-bold ms-2 text-green-600">¥{totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  to="/cart"
                  className="block w-full bg-green-500 text-white py-2 text-center rounded-md hover:bg-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  View Cart & Checkout
                </Link>
              </>
            )}
            {cartItems.length === 0 && (
              <Link
                to="/comiket-preorder"
                className="block w-full bg-purple-500 text-white tracking-wide py-2 text-center rounded-md hover:bg-purple-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Start Shopping
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
