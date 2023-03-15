import protect from "../../middlewares/auth.middleware";
import { create, findAll, findForDropDown } from "./location.controller";
import express, { Router } from "express";
const router: Router = express.Router();
//
router.post("/create/", create);
router.post("/find_all/", findAll);
router.get("/find/", protect, findForDropDown);
//
export default router;
