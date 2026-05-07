const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashed,
    role,
    bloodGroup: req.body.bloodGroup,
    emergencyContact: {
      name: req.body.emergencyContact.name,
      phone: req.body.emergencyContact.phone,
      relation: req.body.emergencyContact.relation
    } 


  });

  await user.save();
  res.json({ message: "User registered successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role, user,});
});

//PROFILE EDIT
router.put("/update", auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json("Update failed");
  }
});
module.exports = router;