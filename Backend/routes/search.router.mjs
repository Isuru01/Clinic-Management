import { Router } from "express";
import {
  search,
  getDocList,
  getSpecList,
} from "../controllers/search.controller.mjs";

const router = Router();

router.route("/").get(search);
router.route("/doctor").get(getDocList);
router.route("/specialization").get(getSpecList);

export default router;
