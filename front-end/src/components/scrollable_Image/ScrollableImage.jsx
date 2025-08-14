import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/cartSlice'; // Adjust path as needed for your Redux setup
import { toast, Toaster } from 'react-hot-toast';
import { ShoppingCart, X } from 'lucide-react';
import logo_sr from '../../../public/logo_sr.png'
import prod1 from '../../../public/prod1.png'
export default function ScrollableImage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  // Products matching the image
  const products = [
    {
      id: 1,
      name: 'Art Print',
      nameJapanese: 'アートプリント',
      price: 1500,
      description: 'High-quality anime art print',
      url: '/prod1.png'
    },
    {
      id: 2,
      name: 'Manga',
      nameJapanese: '漫画',
      price: 1500,
      description: 'Original manga volume',
      url: '/prod2.png'
    },
    {
      id: 3,
      name: 'T-Shirt',
      nameJapanese: 'Tシャツ',
      price: 1500,
      description: 'Anime character t-shirt',
      url: '/prod3.png'
    },
    {
      id: 4,
      name: 'Light Novel',
      nameJapanese: 'ライトノベル',
      price: 1500,
      description: 'Original light novel',
      url: '/prod4.png'
    },
    {
      id: 5,
      name: '15-Min Sketch',
      nameJapanese: '15分スケッチ',
      price: 1500,
      description: 'Custom 15-minute character sketch',
      url: '/prod5.png'
    },
    {
      id: 6,
      name: 'Cheki/Polaroid',
      nameJapanese: 'チェキ',
      price: 888,
      description: 'Polaroid-style photo',
      url: '/prod1.png'
    }
  ];

  // Perfectly aligned invisible button positions over each "購入する" button
  const purchaseButtons = [
    { id: 1, product: products[0], x: 48, y: 20.5, width: 40, height: 3 }, // Art Print button
    { id: 2, product: products[1], x: 29, y: 39.8, width: 40, height: 3 }, // Manga button
    { id: 3, product: products[2], x: 29, y: 54.2, width: 40, height: 3 }, // T-Shirt button
    { id: 4, product: products[3], x: 11, y: 67.5, width: 40, height: 3 }, // Light Novel button
    { id: 5, product: products[4], x: 49, y: 80, width: 40, height: 3 }, // 15-Min Sketch button
    { id: 6, product: products[5], x: 29, y: 94, width: 40, height: 3 }  // Cheki button
  ];

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleAddToCart = (product) => {
    // Add to cart using Redux

    console.log(product.name)
    dispatch(
      addToCart({
        url: product.url,
        itemName: `${product.nameJapanese} (${product.name})`,
        actual_Price: `¥${product.price}`,
        quantity: 1,
        size: 'default', // Adding size property as required by your cart slice
      })
    );

    // Update local cart state (if still needed for display logic)
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Show success toast
    toast.success(`${product.nameJapanese} added to cart!`, {
      duration: 2000,
      style: {
        background: '#10B981',
        color: '#fff',
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" />

      {/* Header with Cart Button */}
    
      <div className=" gap-6">
        {/* Interactive Menu Image */}
        <div className="lg:col-span-2">
          <div className="relative inline-block w-full">
            <img
              src={logo_sr}
              alt="Anime product menu with purchase buttons"
              className="w-full h-auto rounded-lg shadow-lg "
            />

            {/* Invisible Purchase Buttons */}
            {purchaseButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleAddToCart(button.product)}
                className="absolute bg-transparent  border-2 border-transparent rounded transition-all duration-200 group cursor-pointer"
                style={{
                  left: `${button.x}%`,
                  top: `${button.y}%`,
                  width: `${button.width}%`,
                  height: `${button.height}%`,
                }}
                title={`Add ${button.product.nameJapanese} (¥${button.product.price}) to cart`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg font-bold">
                    +Cart
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-600 mt-2 text-center">
            Click on the red "購入する" buttons to add items to your cart
          </p>
        </div>
        {/* Shopping Cart */}
      
      </div>
    </div>
  );
}
