import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlerware.js";
import {
  ProductByCategoryController,
  createProductController,
  deleteProductController,
  getAllProductController,
  oneProductController,
  photoProductController,
  productCountController,
  productFilterController,
  productListController,
  searchProductController,
  updateProductController,
} from "../controller/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create product.
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product.
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all product.
router.get("/get-allproducts", getAllProductController);

// get single product.
router.get("/get-product/:slug", oneProductController);

// get photo.
router.get("/product-photo/:pid", photoProductController);

// delete product.
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// filter product.
router.post("/product-filter", productFilterController);

// product count.
router.get("/product-count", productCountController);

// product page.
router.get("/product-list/:page", productListController);

// search product.
router.get("/search/:keyword", searchProductController);

// category wise product.
router.get("/product-category/:slug", ProductByCategoryController);

export default router;
