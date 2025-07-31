const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// Config - Always load environment variables
require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Serve frontend build files in production
if (process.env.NODE_ENV === "PRODUCTION" || process.env.NODE_ENV === "production") {
  console.log("🌐 Serving frontend build files...");
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    console.log("📄 Serving index.html for route:", req.path);
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
} else {
  // For development, show a simple message
  app.get("/", (req, res) => {
    res.json({
      message: "MERN Ecommerce API is running!",
      environment: process.env.NODE_ENV || "development",
      endpoints: {
        products: "/api/v1/products",
        users: "/api/v1/register",
        login: "/api/v1/login"
      }
    });
  });
}

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
