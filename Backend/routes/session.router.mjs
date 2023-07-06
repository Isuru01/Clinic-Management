import { Router } from "express";
import {
  getSession,
  getAllSession,
  createSession,
  updateSession,
  deleteeSession,
} from "../controllers/session.controller.mjs";

const router = Router();

router.route("/").get(getAllSession).post(createSession);
router.route("/:id").get(getSession).put(updateSession).delete(deleteeSession);

export default router;
