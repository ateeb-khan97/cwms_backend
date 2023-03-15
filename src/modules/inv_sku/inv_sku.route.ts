import { Router } from "express";
import protect from "../../middlewares/auth.middleware";
import InventorySKUController from "./inv_sku.controller";
const routes = Router();
//
routes.get("/find_all/", protect, InventorySKUController.find_all);
routes.post("/create_child/", protect, InventorySKUController.create_child);
//
export default routes;
