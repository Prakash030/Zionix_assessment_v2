import { searchController, updateVolumeController } from "../controller/searchController.js";
import express from "express";
const router = express.Router();

router.post("/search", searchController);
router.post("/update", updateVolumeController);

export default router;