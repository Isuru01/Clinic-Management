import { Router } from "express";
import { search, getDocList } from "../controllers/search.controller.mjs";

const router = Router();

router.route("/").get(search);
router.route("/doctor").get(getDocList);
router.route("/specialization").get();

export default router;
