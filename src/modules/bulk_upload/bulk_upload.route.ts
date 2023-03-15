import BulkUpload from "./bulk_upload.controller";
import { Router } from "express";
//
const router = Router();
//
router.post("/product_upload", BulkUpload.product_upload);
router.post("/category_upload", BulkUpload.category_upload);
router.post("/vendor_upload", BulkUpload.vendor_upload);
router.post("/manufacturer_upload", BulkUpload.manufacturer_upload);
//
export default router;
