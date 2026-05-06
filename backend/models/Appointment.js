const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  doctorName: String,

  speciality: String,

  hospital: String,

  date: String,

  time: String,

  status: {
    type: String,
    enum: [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Rejected"
],
    default: "Pending",
  },

}, { timestamps: true });

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);