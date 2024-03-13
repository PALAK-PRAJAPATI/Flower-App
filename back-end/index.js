import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

// configure env.
dotenv.config();

// rest object.
const app = express();

app.use(express.json());
app.use(cors());

// routes.
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("Data Base Connected Successfully...");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});
