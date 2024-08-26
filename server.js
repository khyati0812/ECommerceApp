const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoute");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter=require("./routes/productRoutes")
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
// Connect to MongoDB
connectDB()
  .then(() => {
    app.use(cors()); // Enable CORS for all routes
    app.use(express.json());
    app.use(morgan("dev"));
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/auth/category", categoryRouter);
    app.use("/api/v1/auth/product", productRouter);
    app.get("/", (req, res) => {
      return res.send("<h1>Welcome to ECommerce Project</h1>");
    });

    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`.rainbow);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
