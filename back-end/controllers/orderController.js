import { Order } from "../models/Order.js";
import { sendEmailToUser } from "../services/emailService.js";

// Store order in database when payment is initiated
export const storeOrder = async (req, res) => {
    try {
        console.log("Storing order in database:", req.body);
        
        const { orderNumber, cartItems, totalAmount } = req.body;

        // Validate required fields
        if (!orderNumber || !cartItems || !totalAmount) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        // Transform cart items for database storage
        const items = cartItems.map(item => ({
            itemName: item.itemName,
            quantity: item.quantity,
            price: typeof item.actual_Price === 'string' 
                ? parseFloat(item.actual_Price.replace(/[¥$,]/g, '')) 
                : item.actual_Price,
            url: item.url
        }));

        // Create new order in database
        const newOrder = new Order({
            orderNumber: orderNumber,
            items: items,
            totalAmount: totalAmount,
            status: 'pending',
            paymentStatus: 'pending'
        });

        await newOrder.save();
        console.log("Order stored successfully:", orderNumber);

        return res.status(200).json({
            success: true,
            message: "Order stored successfully",
            orderNumber: orderNumber,
        });

    } catch (error) {
        console.error("Error storing order:", error);
        return res.status(500).json({
            success: false,
            message: "Error storing order",
            error: error.message,
        });
    }
};

// Update order with customer details and mark as paid
export const submitOrder = async (req, res) => {
    try {
        const { 
            orderNumber, 
            fullName, 
            email, 
            phone, 
            address, 
            city, 
            postalCode, 
            country, 
            notes 
        } = req.body;

        if (!orderNumber || !fullName || !email || !phone || !address) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        // Update order with customer details
        const updatedOrder = await Order.findOneAndUpdate(
            { orderNumber: orderNumber },
            {
                customerDetails: {
                    fullName,
                    email,
                    phone,
                    address,
                    city,
                    postalCode,
                    country,
                    notes
                },
                paymentStatus: 'paid',
                status: 'processing',
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Send email to customer
        await sendEmailToUser(email, orderNumber, fullName);

        return res.status(200).json({
            success: true,
            message: "Order updated and confirmation email sent successfully",
            orderNumber: orderNumber,
        });

    } catch (error) {
        console.error("Error updating order:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating order",
            error: error.message,
        });
    }
};

// Get all orders for admin panel
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .sort({ createdAt: -1 }) // Most recent first
            .limit(100); // Limit to 100 orders

        return res.status(200).json({
            success: true,
            orders: orders
        });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message,
        });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const { status } = req.body;

        if (!['pending', 'processing', 'completed', 'failed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { orderNumber: orderNumber },
            { 
                status: status,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating order status",
            error: error.message,
        });
    }
};
