import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;