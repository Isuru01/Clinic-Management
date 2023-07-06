import { Router } from "express";
import { signIn } from "../controllers/user.controller.mjs";

const router = Router();

router.route("/signin").post(signIn);

export default router;
