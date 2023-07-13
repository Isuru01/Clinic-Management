import { Router } from "express";
import {
  getEventByDoctor,
  getEvent,
} from "../controllers/event.controller.mjs";

const router = Router();

router.route("/").get().post();
router.route("/bydoc/:id").get(getEventByDoctor);
router.route("/:id").get(getEvent).put().delete();

export default router;
