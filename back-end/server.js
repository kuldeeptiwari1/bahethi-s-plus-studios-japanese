import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Stripe from "stripe";

dotenv.config(); // Load environment variables

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BASE_URL ="http://localhost:3000";

const app = express();
app.use(express.json());
app.use(cors());

console.log("Stripe Key Loaded:", process.env.STRIPE_SECRET_KEY ? "Yes" : "No");



app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
  });
  
  app.use('/assets', express.static('public/assets'));

app.post("/create-checkout-session", async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.itemName,
                    images: [`${BASE_URL}${item.url}`],
                },
                unit_amount: parseInt(item.actual_Price.replace("$", "")) * 100, // Convert price to cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



