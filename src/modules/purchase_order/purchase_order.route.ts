import express, { Router } from "express";
import {
  approve,
  cancel,
  create,
  findAll,
  find_for_grn,
  receive,
} from "./purchase_order.controller";
const router: Router = express.Router();
//
router.post("/approve/", approve);
router.post("/cancel/", cancel);
router.post("/receive/", receive);
router.get("/find_all/", findAll);
router.post("/create/", create);
router.post("/find_for_grn/", find_for_grn);
//
export default router;
