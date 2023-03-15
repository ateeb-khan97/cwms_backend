import { register, login, findAll } from "./user.controller";
import express, { Router } from "express";
const router: Router = express.Router();
//
router.post("/register/", register);
router.post("/login/", login);
router.get("/find_all/", findAll);
// router.get("/find_all/", findAll);
// router.post("/find/", find);
// router.post("/update/", update);
//
export default router;
