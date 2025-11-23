const express = require("express");
const app = express();
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");

// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

//connect to database
const { connectDB } = require("./db/db");
connectDB();

const rabbitMq = require("./service/rabbit");
rabbitMq.connect();

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON
app.use(cookieParser()); // Added cookie-parser middleware
app.use(express.urlencoded({ extended: true })); // Built-in middleware for parsing URL-encoded data

app.use("/", captainRoutes);

module.exports = app;
