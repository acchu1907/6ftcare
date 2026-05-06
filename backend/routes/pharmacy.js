router.post("/order", auth, async (req, res) => {
  const order = new Order({
    patientId: req.user.id,
    medicine: req.body.medicine
  });

  await order.save();
  res.json(order);
});

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ patientId: req.user.id });
  res.json(orders);
});