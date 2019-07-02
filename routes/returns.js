const express = require("express");
const auth = require("../middleware/auth");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const moment = require("moment");
const _ = require("lodash");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId) return res.status(400).send("customerId not found");

  if (!req.body.mmovieId) return res.status(400).send("movieId not found");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId
  });
  if (!rental) return res.status(404).send("rental not found");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed");

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.dateOut, "days");
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { movieInStock: 1 }
    }
  );

  res.status(200).send(rental);
});

module.exports = router;
