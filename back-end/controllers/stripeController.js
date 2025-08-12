import Stripe from "stripe";
import dotenv from "dotenv";

// Ensure dotenv is configured
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'  // Add API version for consistency
});
const BASE_URL = "http://localhost:3000";

// Stripe checkout session creation
export const createCheckoutSession = async (req, res) => {
    try {
        // Add a check to ensure Stripe is properly initialized
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("STRIPE_SECRET_KEY environment variable is not set");
        }

        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const line_items = cartItems.map((item) => {
            let price = item.actual_Price.replace(/[¥$,]/g, "");
            let numericPrice = parseInt(price);
            
            if (isNaN(numericPrice) || numericPrice < 0) {
                numericPrice = 0;
            }

            let imageUrl = item.url;
            if (imageUrl.startsWith('../../../public/')) {
                imageUrl = imageUrl.replace('../../../public/', '/');
            }
            if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
                imageUrl = `/${imageUrl}`;
            }
            const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.itemName,
                        images: [fullImageUrl],
                    },
                    unit_amount: numericPrice * 100,
                },
                quantity: item.quantity,
            };
        });

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
};
