import { find_all, add_shelf } from "./rack.controller";
import { Router } from "express";
import protect from "../../../middlewares/auth.middleware";
const route = Router();
//
route.get("/find_all/", find_all);
route.post("/add_shelf/", protect, add_shelf);
//
export default route;
