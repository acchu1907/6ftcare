const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  patientId: mongoose.Schema.Types.ObjectId,
  medicine: String,
  status: {
    type: String,
    default: "Ordered"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);