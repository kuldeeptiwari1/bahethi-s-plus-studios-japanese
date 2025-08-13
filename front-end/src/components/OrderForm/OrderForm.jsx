
// import React, { useState } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import { CheckCircle, User, Mail, Phone, MapPin, MessageSquare, Package } from "lucide-react";

// const OrderForm = ({ orderNumber, onFormSubmit }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     notes: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Basic validation
//     if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
//       toast.error("Please fill in all required fields");
//       setIsSubmitting(false);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error("Please enter a valid email address");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Prepare data for submission
//       const submissionData = {
//         orderNumber: orderNumber,
//         ...formData,
//         submittedAt: new Date().toISOString()
//       };

//       console.log("Submitting order data:", submissionData);
      
//       // UPDATED ENDPOINT - Changed from /api/submit-order to /api/submit-order
//       const response = await fetch("http://localhost:5000/api/submit-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submissionData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit order");
//       }

//       toast.success("Order details submitted successfully!");
//       setIsSubmitted(true);
      
//       // Call the callback after successful submission
//       setTimeout(() => {
//         onFormSubmit();
//       }, 1500);

//     } catch (error) {
//       console.error("Error submitting order:", error);
//       toast.error("Failed to submit order details. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
//         <Toaster position="top-center" />
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//           <div className="mb-6">
//             <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
//             <p className="text-gray-600">Your order details have been submitted successfully.</p>
//           </div>
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//             <p className="text-green-800 font-semibold">Order #: {orderNumber}</p>
//           </div>
//           <p className="text-sm text-gray-500">Redirecting you to home page...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
//       <Toaster position="top-center" />
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
//           <div className="text-center">
//             <Package className="mx-auto text-blue-500 mb-4" size={48} />
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmation</h1>
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//               <p className="text-blue-800 font-semibold text-lg">Order Number: #{orderNumber}</p>
//             </div>
//             <p className="text-gray-600">Please provide your details for order processing and delivery</p>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                 <User className="mr-2 text-blue-500" size={20} />
//                 Personal Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="Enter your phone number"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Mail className="inline mr-1" size={16} />
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="Enter your email address"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Shipping Address */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                 <MapPin className="mr-2 text-green-500" size={20} />
//                 Shipping Address
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Street Address *
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="Enter your street address"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="City"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Postal Code
//                     </label>
//                     <input
//                       type="text"
//                       name="postalCode"
//                       value={formData.postalCode}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="Postal Code"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Country
//                     </label>
//                     <input
//                       type="text"
//                       name="country"
//                       value={formData.country}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="Country"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Notes */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                 <MessageSquare className="mr-2 text-purple-500" size={20} />
//                 Additional Notes
//               </h3>
//               <textarea
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
//                 placeholder="Any special instructions or notes for your order..."
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-center pt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
//                   isSubmitting
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg"
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Submitting...
//                   </div>
//                 ) : (
//                   "Submit Order Details"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Footer Note */}
//         <div className="text-center mt-6">
//           <p className="text-sm text-gray-500">
//             * Required fields. Your information will be used for order processing and delivery only.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderForm;









import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { CheckCircle, User, Mail, Phone, MapPin, MessageSquare, Package } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  address: Yup.string()
    .min(2, 'Address must be at least 2 characters')
    .max(100, 'Address must be less than 100 characters')
    .required('Street address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .max(30, 'City must be less than 30 characters'),
  postalCode: Yup.string()
    .min(3, 'Postal code must be at least 3 characters')
    .max(10, 'Postal code must be less than 10 characters'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .max(30, 'Country must be less than 30 characters'),
  notes: Yup.string()
    .max(500, 'Notes must be less than 500 characters')
});

const OrderForm = ({ orderNumber, onFormSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    notes: ""
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      // Prepare data for submission
      const submissionData = {
        orderNumber: orderNumber,
        ...values,
        submittedAt: new Date().toISOString()
      };

      console.log("Submitting order data:", submissionData);
      
      // UPDATED ENDPOINT - Changed from /api/submit-order to /api/submit-order
      const response = await fetch("http://localhost:5000/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      toast.success("Order details submitted successfully!");
      setIsSubmitted(true);
      
      // Call the callback after successful submission
      setTimeout(() => {
        onFormSubmit();
      }, 1500);

    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <Toaster position="top-center" />
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-gray-600">Your order details have been submitted successfully.</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">Order #: {orderNumber}</p>
          </div>
          <p className="text-sm text-gray-500">Redirecting you to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center">
            <Package className="mx-auto text-blue-500 mb-4" size={48} />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmation</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 font-semibold text-lg">Order Number: #{orderNumber}</p>
            </div>
            <p className="text-gray-600">Please provide your details for order processing and delivery</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="mr-2 text-blue-500" size={20} />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Field
                        type="text"
                        name="fullName"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.fullName && touched.fullName
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.phone && touched.phone
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline mr-1" size={16} />
                      Email Address *
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.email && touched.email
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <MapPin className="mr-2 text-green-500" size={20} />
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <Field
                        type="text"
                        name="address"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.address && touched.address
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Enter your street address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <Field
                          type="text"
                          name="city"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.city && touched.city
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="City"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <Field
                          type="text"
                          name="postalCode"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.postalCode && touched.postalCode
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Postal Code"
                        />
                        <ErrorMessage
                          name="postalCode"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <Field
                          type="text"
                          name="country"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.country && touched.country
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Country"
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <MessageSquare className="mr-2 text-purple-500" size={20} />
                    Additional Notes
                  </h3>
                  <Field
                    as="textarea"
                    name="notes"
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                      errors.notes && touched.notes
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="Any special instructions or notes for your order..."
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Order Details"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            * Required fields. Your information will be used for order processing and delivery only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
