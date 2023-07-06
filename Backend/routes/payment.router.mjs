import { createPayment } from "../controllers/payment.controller.mjs";
import { Router } from "express";

const router = Router();

router.route("/").post(createPayment);

export default router;
