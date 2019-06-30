const { Customer, validate } = require("../models/customer");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// Create a new customer
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Create customer
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });
  customer = await customer.save();

  res.send(customer);
});

// Modify a user
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.body.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("The ID of the customer could not be found");

  res.send(customer);
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res.status(404).send("The ID of the customer could not be found");

  res.send(customer);
});

// Get a specific user by ID
router.get("/id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send("The ID of the customer could not be found");

  res.send(customer);
});

module.exports = router;
