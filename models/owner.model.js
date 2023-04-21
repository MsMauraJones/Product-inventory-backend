const mongoose = require("mongoose")

const Owner = mongoose.model(
    "Owner",
    mongoose.Schema(
      {
        ownerName: {
          type: String
        },

        ministryId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ministry',
        }
      },{
          collection: 'ownerCollection'
      }
    )
);

module.exports = Owner;