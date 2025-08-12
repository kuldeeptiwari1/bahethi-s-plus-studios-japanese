import express from "express";
import { storeOrder, submitOrder, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/store-order", storeOrder);
router.post("/submit-order", submitOrder);
router.get("/orders", getAllOrders);
router.put("/orders/:orderNumber/status", updateOrderStatus);

export default router;
