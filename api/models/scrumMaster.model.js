//define a schema and a model for a "scrumMaster" collection

const mongoose = require("mongoose");

const ScrumMaster = mongoose.model(
  "scrumMaster",
  mongoose.Schema(
    {
    scrumMasterName: String
    },
    {collection: 'scrumMasterCollection'}
  )
);

module.exports = ScrumMaster;