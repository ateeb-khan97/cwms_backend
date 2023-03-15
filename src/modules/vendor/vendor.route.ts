import {
  create,
  findAll,
  find,
  update,
  findVendorTax,
  findForPurchaseOrder,
  findForDataTable,
  vendorForCreation,
  findForPurchaseOrderById,
} from "./vendor.controller";
import express, { Router } from "express";
import upload from "../../middlewares/upload.middleware";
//
const router: Router = express.Router();
//
router.post("/create/", upload.single("file_attachment"), create);
router.post("/update/", update);
router.post("/find/", find);
router.get("/find_all/", findAll);
router.get("/find_vendor_tax/", findVendorTax);
router.get("/find_for_po/", findForPurchaseOrder);
router.get("/find_for_dt/", findForDataTable);
router.post("/find_for_creation/", vendorForCreation);
router.post("/find_for_po/", findForPurchaseOrderById);
//
export default router;
