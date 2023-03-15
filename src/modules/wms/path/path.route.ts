import { add_path, find_all } from "./path.controller";
import { Router } from "express";
import protect from "../../../middlewares/auth.middleware";
const router = Router();
//
router.get("/find_all/", find_all);
router.post("/add_path/", protect, add_path);
//
export default router;
