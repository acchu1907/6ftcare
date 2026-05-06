const express = require("express");

const router = express.Router();

const Appointment = require("../models/Appointment");


// ================= BOOK APPOINTMENT =================
router.post("/book", async (req, res) => {

  try {

    const appointment = new Appointment(req.body);

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {

    res.status(500).json({
      message: "Booking failed",
    });

  }

});


// ================= GET ALL APPOINTMENTS =================
router.get("/appointments", async (req, res) => {

  try {

    const patientId = req.query.patientId;

    const appointments = await Appointment.find({
      patientId,
    });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching appointments",
    });

  }

});
router.put("/cancel/:id", async (req, res) => {

  try {

    await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Cancelled"
      }
    );

    res.json({
      message: "Appointment cancelled"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Cancel failed"
    });

  }

});


module.exports = router;