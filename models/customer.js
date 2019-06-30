const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(3)
      .max(50)
      .required()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerSchema;
