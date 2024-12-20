const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const complaintsRoutes = require("./routes/complaints");

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/complaints_db";
app.use(cors());
app.use(bodyParser.json());
app.use("/api/complaints", complaintsRoutes);
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
