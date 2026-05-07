
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/Orders");
router.post("/Orders", auth, async (req, res) => {
  const order = new Order({
    patientId: req.user.id,
    medicine: req.body.medicine
  });

  await order.save();
  res.json(order);
});

router.get("/Orders", auth, async (req, res) => {
  const orders = await Order.find({ patientId: req.user.id });
  res.json(orders);
});

module.exports = router;