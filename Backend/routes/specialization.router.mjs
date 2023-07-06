import { Router } from "express";
import {
  getSpecialization,
  getAllSpecialization,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
} from "../controllers/specialization.controller.mjs";

const router = Router();

router.route("/").get(getAllSpecialization).post(createSpecialization);
router
  .route("/:id")
  .get(getSpecialization)
  .put(updateSpecialization)
  .delete(deleteSpecialization);

export default router;
