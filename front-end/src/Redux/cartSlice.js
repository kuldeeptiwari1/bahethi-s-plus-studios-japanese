import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-hot-toast"

// Load cart from Local Storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart")
  return storedCart ? JSON.parse(storedCart) : []
}

// Save cart to Local Storage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

const initialState = {
  cartItems: loadCartFromLocalStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The payload now contains 'price' (number) instead of 'actual_Price' (string)
      const existingItem = state.cartItems.find(
        (item) => item.url === action.payload.url && item.size === action.payload.size,
      )
      if (existingItem) {
        // Add the new quantity to the existing quantity
        existingItem.quantity += action.payload.quantity
        toast.success(`${action.payload.itemName} quantity updated!`)
      } else {
        // Store the price as a number.
        // The payload should already have 'price' as a number from ScrollableImage.
        state.cartItems.push({ ...action.payload })
        toast.success(`${action.payload.itemName} added to cart!`)
      }
      saveCartToLocalStorage(state.cartItems)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => !(item.url === action.payload.url && item.size === action.payload.size),
      )
      toast.error(`${action.payload.itemName} removed from cart!`)
      saveCartToLocalStorage(state.cartItems)
    },
    decreaseCart: (state, action) => {
      const item = state.cartItems.find((item) => item.url === action.payload.url && item.size === action.payload.size)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
          toast.error(`Decreased quantity of ${item.itemName}`)
        } else {
          state.cartItems = state.cartItems.filter((i) => !(i.url === item.url && i.size === item.size))
          toast.error(`${item.itemName} removed from cart!`)
        }
        saveCartToLocalStorage(state.cartItems)
      }
    },
    clearCart: (state) => {
      state.cartItems = []
      localStorage.removeItem("cart") // Clear local storage
      toast.success("Payment successful! Redirecting to home page...")
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
