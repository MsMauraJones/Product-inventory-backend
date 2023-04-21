//Define a schema and model for a "users" collection    
const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    mongoose.Schema({
        username: {
          type: String
        },
        email: { 
          type: String,
          unique: true
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        password: String
      })
);

module.exports = User;