import { Router } from "express";
import {
  getPatient,
  getAllPatient,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.mjs";
const router = Router();

router.route("/").get(getAllPatient).post(createPatient);
router.route("/:id").get(getPatient).put(updatePatient).delete(deletePatient);

export default router;
