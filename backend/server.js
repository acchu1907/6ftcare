require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
//for patient 
const patientRoutes = require("./routes/patient");
const recordsRoutes = require("./routes/records");
const pharmacyRoutes = require("./routes/pharmacy");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/records", recordsRoutes);




app.use("/api/pharmacy", pharmacyRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});