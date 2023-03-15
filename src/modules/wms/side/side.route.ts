import { add_side, find_all } from "./side.controller";
import { Router } from "express";
import protect from "../../../middlewares/auth.middleware";
const route = Router();
//
route.get("/find_all/", find_all);
route.post("/add_side/", protect, add_side);
//
export default route;
