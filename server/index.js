const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const clipboardRoutes = require("./routes/clipboard");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/clipboard", clipboardRoutes);

// Add this:
app.get("/", (req, res) => {
  res.status(200).send("Backend is alive!");
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running on port 5000"));
  })
  .catch(console.error);
