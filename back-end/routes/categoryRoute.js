import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlerware.js";
import {
  categoryAllController,
  createCategoryController,
  deleteCategoryController,
  oneCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const route = express.Router();

// routes.
// create category.
route.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category.
route.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// getAll category.
route.get("/get-allcategory", categoryAllController);

// single category.
route.get("/single-category/:slug", oneCategoryController);

// delete category.
route.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default route;
