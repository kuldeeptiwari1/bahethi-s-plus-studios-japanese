// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { clearCart } from "../../Redux/cartSlice";
// import { useNavigate } from "react-router-dom";

// const Success = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [orderNumber, setOrderNumber] = useState(null);

//   useEffect(() => {
//     // Get the order number from localStorage
//     const savedOrderNumber = localStorage.getItem('orderNumber');
//     if (savedOrderNumber) {
//       setOrderNumber(savedOrderNumber);
//       console.log("Order Number Retrieved:", savedOrderNumber);
//     }

//     dispatch(clearCart());
//     localStorage.removeItem("cart");
//     // Clean up order number after retrieving it
//     localStorage.removeItem("orderNumber");
    
//     setTimeout(() => {
//       navigate("/"); 
//     }, 5000);
//   }, [dispatch, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
//       {orderNumber && (
//         <p className="text-xl font-semibold mt-4">Your Order Number: #{orderNumber}</p>
//       )}
//       <p className="text-gray-600 mt-4">Thank you for your purchase.</p>
//       <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Go to Home</Link>
//     </div>
//   );
// };

// export default Success;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import OrderForm from "../OrderForm/OrderForm";


const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Get the order number from localStorage
    const savedOrderNumber = localStorage.getItem('orderNumber');
    if (savedOrderNumber) {
      setOrderNumber(savedOrderNumber);
      console.log("Order Number Retrieved:", savedOrderNumber);
      // Show form after getting order number
      setShowForm(true);
    }

    dispatch(clearCart());
    localStorage.removeItem("cart");
  }, [dispatch]);

  const handleFormSubmit = () => {
    // Clean up order number after form submission
    localStorage.removeItem("orderNumber");
    
    // Navigate to home after 2 seconds
    setTimeout(() => {
      navigate("/"); 
    }, 2000);
  };

  if (showForm && orderNumber) {
    return <OrderForm orderNumber={orderNumber} onFormSubmit={handleFormSubmit} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      <h2 className="text-2xl font-bold text-green-600 mt-4">Payment Successful!</h2>
      <p className="text-gray-600 mt-2">Processing your order...</p>
    </div>
  );
};

export default Success;
