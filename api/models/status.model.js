//define a schema and a model for a "status" collection

const mongoose = require("mongoose");

const Status = mongoose.model(
  "Status",
  mongoose.Schema({
    statusName: String
  })
);

module.exports = Status;