const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  fileName: String,

  fileType: String,

  fileUrl: String,

}, { timestamps: true });

module.exports = mongoose.model(
  "Record",
  recordSchema
);