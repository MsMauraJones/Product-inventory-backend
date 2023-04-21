//define a schema and a model for a "developers" collection

const mongoose = require("mongoose");

const Developer = mongoose.model(
  "Developer",
  mongoose.Schema(
    {
      developerName: {
        type: String
      }
    },{
    collection: 'developerCollection'
    }
  )
);

module.exports = Developer;