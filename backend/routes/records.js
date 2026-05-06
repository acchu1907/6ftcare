const express = require("express");
const router = express.Router();
const multer = require("multer");

const Record = require("../models/Record");


// ================= MULTER =================
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },

});

const upload = multer({ storage });


// ================= UPLOAD =================
router.post(
  "/upload",
  upload.single("file"),

  async (req, res) => {

    try {

      const newRecord = new Record({
        patientId: req.body.patientId,
        fileName: req.file.originalname,
        fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,
      });

      await newRecord.save();

      res.json({
        message: "File uploaded",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Upload failed",
      });

    }

  }
);


// ================= GET RECORDS =================
router.get("/:patientId", async (req, res) => {

  try {

    const records = await Record.find({
      patientId: req.params.patientId,
    });

    res.json(records);

  } catch (error) {

    console.log(error);

  }

});


// ================= RENAME =================
router.put("/rename/:id", async (req, res) => {

  try {

    await Record.findByIdAndUpdate(
      req.params.id,
      {
        fileName: req.body.fileName,
      }
    );

    res.json({
      message: "File renamed",
    });

  } catch (error) {

    console.log(error);

  }

});

module.exports = router;