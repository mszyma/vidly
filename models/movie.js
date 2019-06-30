const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 1,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 1,
    max: 255
  }
});

const Movie = mongoose.model("Movies", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(1)
      .max(255)
      .required(),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
exports.movieSchema = movieSchema;
