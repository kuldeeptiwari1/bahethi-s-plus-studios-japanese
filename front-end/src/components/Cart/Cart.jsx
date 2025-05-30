import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, addToCart, decreaseCart, clearCart } from "../../Redux/cartSlice"
import { Link } from "react-router-dom"
import { ArrowLeft } from 'lucide-react'
import { FaShoppingCart, FaTrash } from "react-icons/fa"
import { loadStripe } from "@stripe/stripe-js"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  const handlePayment = async () => {
    console.log("Sending cartItems to backend:", cartItems)
    const stripe = await stripePromise

    try {
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const session = await response.json()
      if (!session.id) {
        throw new Error("Invalid session response")
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id })

      if (!result.error) {
        // ✅ Clear the cart after a successful payment
        dispatch(clearCart())
      } else {
        console.error(result.error)
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Something went wrong. Please try again later.")
    }
  }

  // Function to increase quantity
  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }))
  }

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => {
      // Ensure we're working with numbers
      const price = typeof item.actual_Price === 'string' 
        ? parseFloat(item.actual_Price.replace('$', '')) 
        : item.actual_Price
      
      return total + (item.quantity * price)
    },
    0
  )

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center p-4 md:p-6 min-h-[60vh] relative">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 flex justify-center items-center">
          Your Cart{" "}
          <span className="ml-1">
            {" "}
            <FaShoppingCart />
          </span>
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-xl md:text-2xl">Your cart is empty !!!</p>
        ) : (
          <div className="w-full max-w-md">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <img src={item.url || "/placeholder.svg"} alt={item.itemName} className="h-16 w-16 object-cover mr-3" />
                  <div className="flex flex-col">
                    <p className="font-medium text-sm md:text-base">{item.itemName}</p>
                    {item.size && <p className="text-gray-500 text-xs">Size: {item.size}</p>}
                    <p className="text-red-600 font-semibold mb-4 sm:mb-0">
                      ${(item.quantity * parseFloat(item.actual_Price.replace("$", ""))).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300">
                    <button 
                      onClick={() => dispatch(decreaseCart(item))} 
                      className="bg-gray-200 px-3 py-1"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button 
                      onClick={() => handleIncreaseQuantity(item)} 
                      className="bg-gray-200 px-3 py-1"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center"
                    aria-label="Remove item"
                  >
                    <FaTrash size={15} className="mr-1" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="text-lg font-semibold mt-6 mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-green-600 text-xl">Total: ${totalPrice.toFixed(2)}</span>
                <button
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 p-2 px-4 rounded-md text-white font-medium"
                  onClick={handlePayment}
                >
                  Proceed to Check Out
                </button>
              </div>
            </div>
          </div>
        )}

        <Link
          to="/comiket-preorder"
          className="mt-4 flex text-blue-500 underline tracking-wide text-lg md:text-xl absolute bottom-5"
        >
          <ArrowLeft className="mr-1 mt-1" size={18} />
          Back to Shopping
        </Link>
      </div>
    </>
  )
}

export default Cart
