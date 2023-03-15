import {
  create,
  findAll,
  find,
  update,
  findForDropDown,
} from "./category.controller";
import { Router } from "express";
const router = Router();
//
router.post("/create/", create);
router.get("/find_all/", findAll);
router.post("/find/", find);
router.get("/find_for_dd/", findForDropDown);
router.post("/update/", update);
//
export default router;
