import { find_all, add_bin } from "./bin.controller";
import { Router } from "express";
import protect from "../../../middlewares/auth.middleware";
const router = Router();
//
router.get("/find_all/", find_all);
router.post("/add_bin/", protect, add_bin);
//
export default router;
