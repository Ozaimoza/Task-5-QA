import express, { Router } from "express";
import User from "../controllers/userControllers";

const router: Router = express.Router();

router.post("/", User.createUser);
router.put("/:id", User.updateUser);

export default router;
