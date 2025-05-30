import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-red-600">Payment Canceled!</h2>
      <p className="text-gray-600">Your transaction was not completed.</p>
      <Link to="/cart" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Back to Cart</Link>
    </div>
  );
};

export default Cancel;
