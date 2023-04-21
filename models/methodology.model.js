//define a schema and a model for a "methodlogy" collection

const mongoose = require("mongoose");

const Methodology = mongoose.model(
  "Methodology",
  mongoose.Schema(
    {
      methodologyName:String
    },
    {collection: 'methodologyCollection'})
);

module.exports = Methodology;


