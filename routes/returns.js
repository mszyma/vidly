const express = require("express");
const { Customer } = require("../models/customer");
const { Rental } = require("../models/rental");
const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.customerId) return res.status(400).send("customerId not found");

  if (!req.body.mmovieId) return res.status(400).send("movieId not found");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId
  });
  if (!rental) return res.status(404).send("rental not found");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed");

  res.status(401).send("Unauthorized");
});

module.exports = router;
