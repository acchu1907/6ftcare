const express = require("express");

const router = express.Router();

const Record = require("../models/Record");


// ================= GET RECORDS =================
router.get("/:patientId", async (req, res) => {

  try {

    const records = await Record.find({
      patientId: req.params.patientId,
    });

    res.json(records);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching records",
    });

  }

});

module.exports = router;