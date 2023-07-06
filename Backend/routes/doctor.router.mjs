import { Router } from "express";
import {
  getDoctor,
  getPrivateDoctor,
  getAllDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller.mjs";

const router = Router();

router.route("/").get(getAllDoctor).post(createDoctor);
router.route("/:id").get(getDoctor).put(updateDoctor).delete(deleteDoctor);

export default router;
