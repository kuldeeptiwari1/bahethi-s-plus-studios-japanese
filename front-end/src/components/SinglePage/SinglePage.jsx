"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../../Redux/cartSlice"
import { toast, Toaster } from "react-hot-toast"
import { X } from "lucide-react"

// Product data
const characters = Array.from({ length: 15 }, (_, i) => ({
  id: `character-${i + 1}`,
  type: "character",
  name: `Character ${i + 1}`,
  price: 2.5,
  url: `/assets/characters/ch${i + 1}.png`,
}))

const outfits = Array.from({ length: 20 }, (_, i) => {
  const characterIndex = Math.floor(i / 2)
  const outfitType = i % 2 === 0 ? "Regular" : "Revealing"
  return {
    id: `outfit-${i + 1}`,
    type: "outfit",
    name: `${outfitType} Outfit ${Math.floor(i / 2) + 1}`,
    characterId: `character-${characterIndex + 1}`,
    isRevealing: i % 2 === 1,
    price: 2.5,
    url: `/assets/outfits/outfit${i + 1}.png`,
  }
})

const backgrounds = Array.from({ length: 10 }, (_, i) => ({
  id: `background-${i + 1}`,
  type: "background",
  name: `Background ${i + 1}`,
  price: 2.5,
  url: `/placeholder.svg?height=300&width=200`,
  color: [
    "#FFD700", "#4682B4", "#FF6347", "#32CD32", "#9370DB",
    "#FF69B4", "#20B2AA", "#F4A460", "#778899", "#DC143C"
  ][i],
}))

// Bundle pricing
const bundlePricing = [
  { bundles: 2, savings: 5 },
  { bundles: 6, savings: 21 },
  { bundles: 10, savings: 45 },
]

export default function SinglePage() {
  const dispatch = useDispatch()
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [selectedOutfits, setSelectedOutfits] = useState([])
  const [selectedBackground, setSelectedBackground] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Ref for invisible button
  const hiddenAddToCartButtonRef = useRef(null)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Filter outfits based on selected character
  const filteredOutfits = selectedCharacter
    ? outfits.filter((outfit) => outfit.characterId === selectedCharacter.id)
    : []

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0
    if (selectedCharacter) total += selectedCharacter.price
    if (selectedBackground) total += selectedBackground.price
    selectedOutfits.forEach((outfit) => {
      total += outfit.price
    })
    // Apply bundle discount if applicable
    if (selectedCharacter && selectedBackground && selectedOutfits.length === 2) {
      const bundleCount = 1
      const discount = 2 // $2 discount for 1 bundle
      total -= discount
    }
    return total.toFixed(2)
  }

  // Handle character selection
  const handleCharacterSelect = (character) => {
    if (selectedCharacter && selectedCharacter.id === character.id) {
      setSelectedCharacter(null)
      setSelectedOutfits([])
    } else {
      setSelectedCharacter(character)
      setSelectedOutfits([])
    }
  }

  // Handle outfit selection
  const handleOutfitSelect = (outfit) => {
    if (selectedOutfits.some((o) => o.id === outfit.id)) {
      setSelectedOutfits(selectedOutfits.filter((o) => o.id !== outfit.id))
    } else {
      // If trying to add more than 2 outfits, replace the oldest one
      if (selectedOutfits.length >= 2) {
        setSelectedOutfits([...selectedOutfits.slice(1), outfit])
      } else {
        setSelectedOutfits([...selectedOutfits, outfit])
      }
    }
  }

  // Handle background selection
  const handleBackgroundSelect = (background) => {
    if (selectedBackground && selectedBackground.id === background.id) {
      setSelectedBackground(null)
    } else {
      setSelectedBackground(background)
    }
  }

  // Add selected items to cart
  const handleAddToCart = () => {
    if (!selectedCharacter && !selectedBackground && selectedOutfits.length === 0) {
      toast.error("Please select at least one item")
      return
    }

    // Create a bundle name if it's a complete bundle
    let bundleName = ""
    if (selectedCharacter && selectedBackground && selectedOutfits.length > 0) {
      bundleName = `${selectedCharacter.name} Bundle`
    }

    // Add items to cart
    if (bundleName) {
      // Add as a bundle
      dispatch(
        addToCart({
          url: selectedCharacter.url,
          itemName: bundleName,
          actual_Price: `$${calculateTotalPrice()}`,
          quantity: 1,
          bundleItems: [selectedCharacter, ...selectedOutfits, selectedBackground],
        }),
      )
    } else {
      // Add individual items
      let addedItems = 0

      if (selectedCharacter) {
        dispatch(
          addToCart({
            url: selectedCharacter.url,
            itemName: selectedCharacter.name,
            actual_Price: `$${selectedCharacter.price.toFixed(2)}`,
            quantity: 1,
          }),
        )
        addedItems++
      }

      selectedOutfits.forEach((outfit) => {
        dispatch(
          addToCart({
            url: outfit.url,
            itemName: outfit.name,
            actual_Price: `$${outfit.price.toFixed(2)}`,
            quantity: 1,
          }),
        )
        addedItems++
      })

      if (selectedBackground) {
        dispatch(
          addToCart({
            url: selectedBackground.url,
            itemName: selectedBackground.name,
            actual_Price: `$${selectedBackground.price.toFixed(2)}`,
            quantity: 1,
          }),
        )
        addedItems++
      }
    }

    // Reset selections
    setSelectedCharacter(null)
    setSelectedOutfits([])
    setSelectedBackground(null)
  }

  // Clear all selections
  const handleClearSelections = () => {
    setSelectedCharacter(null)
    setSelectedOutfits([])
    setSelectedBackground(null)
  }

  const TotalPrice = () => {
    let total = 0
    if (selectedCharacter) total += selectedCharacter.price
    if (selectedBackground) total += selectedBackground.price
    selectedOutfits.forEach((outfit) => {
      total += outfit.price
    })
    // Apply bundle discount if applicable
    if (selectedCharacter && selectedBackground && selectedOutfits.length === 2) {
      const bundleCount = 1
      const discount = bundlePricing.find((b) => b.bundles === bundleCount)?.savings || 0
      total -= discount
    }
    return total.toFixed(2)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Selection Sections */}
        <div className="md:w-1/2">
          {/* Characters Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-2">Characters</h2>
            <p className="mb-4">$2.50 EACH</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 overflow-x-auto">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className={`cursor-pointer border-2 ${
                    selectedCharacter?.id === character.id ? "border-black border-4" : "border-gray-300"
                  } p-1 min-w-[60px] h-[60px] sm:min-w-[80px] sm:h-[80px] flex items-center justify-center`}
                  onClick={() => handleCharacterSelect(character)}
                >
                  <img
                    src={character.url || "/placeholder.svg"}
                    alt={character.name}
                    className="max-w-full max-h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Outfits Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-2">Outfits</h2>
            <p className="mb-4">$2.50 EACH</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 overflow-x-auto">
              {(selectedCharacter ? filteredOutfits : outfits.slice(0, 10)).map((outfit) => (
                <div
                  key={outfit.id}
                  className={`cursor-pointer border-2 ${
                    selectedOutfits.some((o) => o.id === outfit.id) ? "border-black" : "border-gray-300"
                  } p-1 min-w-[60px] h-[60px] flex items-center justify-center ${!selectedCharacter && "opacity-50"}`}
                  onClick={() => selectedCharacter && handleOutfitSelect(outfit)}
                >
                  <img
                    src={outfit.url || "/placeholder.svg"}
                    alt={outfit.name}
                    className="max-w-full max-h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Backgrounds Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-2">Background</h2>
            <p className="mb-4">$2.50 EACH</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 overflow-x-auto">
              {backgrounds.map((background) => (
                <div
                  key={background.id}
                  className={`cursor-pointer border-2 ${
                    selectedBackground?.id === background.id ? "border-black" : "border-gray-300"
                  } p-1 min-w-[60px] h-[60px] flex items-center justify-center`}
                  onClick={() => handleBackgroundSelect(background)}
                >
                  <div className="w-full h-full" style={{ backgroundColor: background.color }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Preview and Bundle Info */}
        <div className="md:w-1/2 flex flex-col md:flex-row gap-4">
          {/* Preview Window */}
          <div className="md:w-3/5">
            <div className="relative w-full h-[300px] sm:h-[400px] border-2 border-black overflow-hidden flex items-center justify-center">
              {/* Invisible Add to Cart Button Over Preview - positioned at the top */}
              <button
                ref={hiddenAddToCartButtonRef}
                className="absolute top-0 left-0 w-full h-20 opacity-0 cursor-pointer z-[9999]"
                onClick={handleAddToCart}
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
                aria-label="Add to cart"
              />

              {/* Background Layer */}
              {selectedBackground && (
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{ backgroundColor: selectedBackground.color }}
                ></div>
              )}

              {/* Character Layer */}
              {selectedCharacter && (
                <div className="absolute top-20 flex items-center justify-center">
                  <img
                    src={selectedCharacter.url || "/placeholder.svg"}
                    alt={selectedCharacter.name}
                    className="max-w-[80%] max-h-[80%] object-contain z-50"
                  />
                </div>
              )}

              {/* Outfit Layers (in reverse order so more revealing is underneath) */}
              {[...selectedOutfits].reverse().map((outfit, index) => (
                <div key={outfit.id} className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="max-w-[70%] max-h-[70%] flex items-center justify-center"
                    style={{ zIndex: 20 + index }}
                  >
                    <img
                      src={outfit.url || "/placeholder.svg"}
                      alt={outfit.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {!selectedBackground && !selectedCharacter && selectedOutfits.length === 0 && (
                <div className="text-center text-gray-500">
                  <p className="mb-2">Select items to preview</p>
                </div>
              )}
            </div>

            {/* Selection Summary */}
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">Current Selection:</h3>
              <div className="text-sm">
                <p>
                  <span className="font-medium">Character:</span> {selectedCharacter ? selectedCharacter.name : "None"}
                </p>
                <p>
                  <span className="font-medium">Outfits:</span>{" "}
                  {selectedOutfits.length > 0 ? selectedOutfits.map((o) => o.name).join(", ") : "None"}
                </p>
                <p>
                  <span className="font-medium">Background:</span>{" "}
                  {selectedBackground ? selectedBackground.name : "None"}
                </p>
              </div>

              {/* Clear Selection Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="mt-2 py-2 px-4 border border-gray-300 bg-gray-300 rounded-md">
                  Total- ${calculateTotalPrice()}
                </div>
                <button
                  className={`mt-2 flex justify-between pe-2 items-center py-2 px-4 border border-gray-300 rounded-md ${
                    !selectedCharacter && !selectedBackground && selectedOutfits.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={handleClearSelections}
                  disabled={!selectedCharacter && !selectedBackground && selectedOutfits.length === 0}
                >
                  Clear Selection <X className="text-red-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Bundle Information */}
          <div className="md:w-2/5 mt-6 md:mt-0">
            <div className="border-l pl-4">
              <h2 className="text-2xl font-bold mb-2">1 BUNDLE</h2>
              <p className="mb-1">1 CHARACTER</p>
              <p className="mb-1">2 OUTFITS</p>
              <p className="mb-4">1 BACKGROUND</p>

              <h3 className="text-2xl font-bold mb-2">IF YOU BUY</h3>
              <p className="mb-1">2 BUNDLES/SAVE$5</p>
              <p className="mb-1">6 BUNDLES/SAVE$21</p>
              <p className="mb-1">10 BUNDLES/SAVE$45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
