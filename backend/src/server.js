require("dotenv").config();

const express = require("express");
const cors = require("cors");

// ✅ Import DB
const connectDB = require("./config/db");

const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Middlewares
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Role Radar Backend Running ✅");
});

// ✅ Port (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});