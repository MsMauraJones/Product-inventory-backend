//define a schema and a model for a "ministry" collection

const mongoose = require("mongoose");

const Ministry = mongoose.model(

    "Ministry",
    mongoose.Schema(
        {
            ministryName: {
                type: String,
                unique: true
            }
        },{
            collection: 'ministryCollection'
        }
    )
);

module.exports = Ministry;
