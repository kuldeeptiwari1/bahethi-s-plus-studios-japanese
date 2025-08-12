




// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import Stripe from "stripe";
// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import mongoose from "mongoose";

// dotenv.config(); // Load environment variables

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const BASE_URL = "http://localhost:3000";

// // Gmail OAuth2 configuration
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// const USER_EMAIL = process.env.USER_EMAIL || 'your-email@gmail.com';

// // Create OAuth2 client
// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/splusstudios', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Order Schema
// const orderSchema = new mongoose.Schema({
//   orderNumber: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   items: [{
//     itemName: String,
//     quantity: Number,
//     price: Number,
//     url: String
//   }],
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   customerDetails: {
//     fullName: String,
//     email: String,
//     phone: String,
//     address: String,
//     city: String,
//     postalCode: String,
//     country: String,
//     notes: String
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'completed', 'failed'],
//     default: 'pending'
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'failed'],
//     default: 'pending'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Order = mongoose.model('Order', orderSchema);

// const app = express();
// app.use(express.json());
// app.use(cors());

// console.log("Stripe Key Loaded:", process.env.STRIPE_SECRET_KEY ? "Yes" : "No");

// // Email function (simplified)
// async function sendEmailToUser(userEmail, orderNumber, userName) {
//   try {
//     const { token } = await oAuth2Client.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: USER_EMAIL,
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: token,
//       },
//     });

//     const mailOptions = {
//       from: `S Plus Studios <${USER_EMAIL}>`,
//       to: userEmail,
//       subject: `Order Confirmation - Order #${orderNumber}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <h1 style="color: #2c3e50;">Order Confirmation</h1>
//           <p>Dear ${userName},</p>
//           <p>Thank you for your order! Your order number is <strong>#${orderNumber}</strong></p>
//           <p>We'll process your order within 1-2 business days.</p>
//           <p>Best regards,<br>S Plus Studios Team</p>
//         </div>
//       `
//     };

//     const result = await transporter.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// }

// app.get("/", (req, res) => {
//     res.send("Welcome to S Plus Studios backend server!");
// });

// // Store order in database when payment is initiated
// app.post("/store-order", async (req, res) => {
//     try {
//         console.log("Storing order in database:", req.body);
        
//         const { orderNumber, cartItems, totalAmount } = req.body;

//         // Validate required fields
//         if (!orderNumber || !cartItems || !totalAmount) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Missing required fields" 
//             });
//         }

//         // Transform cart items for database storage
//         const items = cartItems.map(item => ({
//             itemName: item.itemName,
//             quantity: item.quantity,
//             price: typeof item.actual_Price === 'string' 
//                 ? parseFloat(item.actual_Price.replace(/[¥$,]/g, '')) 
//                 : item.actual_Price,
//             url: item.url
//         }));

//         // Create new order in database
//         const newOrder = new Order({
//             orderNumber: orderNumber,
//             items: items,
//             totalAmount: totalAmount,
//             status: 'pending',
//             paymentStatus: 'pending'
//         });

//         await newOrder.save();
//         console.log("Order stored successfully:", orderNumber);

//         return res.status(200).json({
//             success: true,
//             message: "Order stored successfully",
//             orderNumber: orderNumber,
//         });

//     } catch (error) {
//         console.error("Error storing order:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error storing order",
//             error: error.message,
//         });
//     }
// });

// // Stripe checkout session creation
// app.post("/create-checkout-session", async (req, res) => {
//     try {
//         const { cartItems } = req.body;

//         if (!cartItems || cartItems.length === 0) {
//             return res.status(400).json({ error: "Cart is empty" });
//         }

//         const line_items = cartItems.map((item) => {
//             let price = item.actual_Price.replace(/[¥$,]/g, "");
//             let numericPrice = parseInt(price);
            
//             if (isNaN(numericPrice) || numericPrice < 0) {
//                 numericPrice = 0;
//             }

//             let imageUrl = item.url;
//             if (imageUrl.startsWith('../../../public/')) {
//                 imageUrl = imageUrl.replace('../../../public/', '/');
//             }
//             if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
//                 imageUrl = `/${imageUrl}`;
//             }
//             const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;

//             return {
//                 price_data: {
//                     currency: "usd",
//                     product_data: {
//                         name: item.itemName,
//                         images: [fullImageUrl],
//                     },
//                     unit_amount: numericPrice * 100,
//                 },
//                 quantity: item.quantity,
//             };
//         });

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items,
//             mode: "payment",
//             success_url: "http://localhost:3000/success",
//             cancel_url: "http://localhost:3000/cancel",
//         });

//         res.json({ id: session.id });
//     } catch (error) {
//         console.error("Stripe error:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update order with customer details and mark as paid
// app.post("/submit-order", async (req, res) => {
//     try {
//         const { 
//             orderNumber, 
//             fullName, 
//             email, 
//             phone, 
//             address, 
//             city, 
//             postalCode, 
//             country, 
//             notes 
//         } = req.body;

//         if (!orderNumber || !fullName || !email || !phone || !address) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Missing required fields" 
//             });
//         }

//         // Update order with customer details
//         const updatedOrder = await Order.findOneAndUpdate(
//             { orderNumber: orderNumber },
//             {
//                 customerDetails: {
//                     fullName,
//                     email,
//                     phone,
//                     address,
//                     city,
//                     postalCode,
//                     country,
//                     notes
//                 },
//                 paymentStatus: 'paid',
//                 status: 'processing',
//                 updatedAt: new Date()
//             },
//             { new: true }
//         );

//         if (!updatedOrder) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Order not found"
//             });
//         }

//         // Send email to customer
//         await sendEmailToUser(email, orderNumber, fullName);

//         return res.status(200).json({
//             success: true,
//             message: "Order updated and confirmation email sent successfully",
//             orderNumber: orderNumber,
//         });

//     } catch (error) {
//         console.error("Error updating order:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error updating order",
//             error: error.message,
//         });
//     }
// });

// // Get all orders for admin panel
// app.get("/api/orders", async (req, res) => {
//     try {
//         const orders = await Order.find({})
//             .sort({ createdAt: -1 }) // Most recent first
//             .limit(100); // Limit to 100 orders

//         return res.status(200).json({
//             success: true,
//             orders: orders
//         });

//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error fetching orders",
//             error: error.message,
//         });
//     }
// });

// // Update order status
// app.put("/api/orders/:orderNumber/status", async (req, res) => {
//     try {
//         const { orderNumber } = req.params;
//         const { status } = req.body;

//         if (!['pending', 'processing', 'completed', 'failed'].includes(status)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid status"
//             });
//         }

//         const updatedOrder = await Order.findOneAndUpdate(
//             { orderNumber: orderNumber },
//             { 
//                 status: status,
//                 updatedAt: new Date()
//             },
//             { new: true }
//         );

//         if (!updatedOrder) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Order not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Order status updated successfully",
//             order: updatedOrder
//         });

//     } catch (error) {
//         console.error("Error updating order status:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error updating order status",
//             error: error.message,
//         });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDatabase();

console.log("Stripe Key Loaded:", process.env.STRIPE_SECRET_KEY ? "Yes" : "No");

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to S Plus Studios backend server!");
});

app.use('/assets', express.static('public/assets'));
app.use("/", stripeRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
