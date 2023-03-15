import { create } from "./customer.controller";
import express, { Router } from "express";
const router: Router = express.Router();
//
router.post("/create/", create);
// router.get("/find_all/", findAll);
// router.post("/find/", find);
// router.post("/update/", update);
//
export default router;
