import express from "express";
import {
  forgorPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlerware.js";

// route object.
const router = express.Router();

//routing.
// REGISTER || POST.
router.post("/register", registerController);

// LOGIN || POST.
router.post("/login", loginController);

// FORGOT-PASSWORD || POST.
router.post("/forgot-password", forgorPasswordController);

// Test. || GET.
router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth for user.
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected route auth for admin.
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
