import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
    setTimeout(() => {
      navigate("/"); 
    }, 3000);
  }, [dispatch, navigate]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      <p className="text-gray-600">Thank you for your purchase.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Go to Home</Link>
    </div>
  );
};

export default Success;
