const express = require ('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const app = express(); 
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, './.env')
});

const db = require("./models");
const Role = db.role;
const Ministry = db.ministry;


mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Mongo connected");
  const server = app.listen(8080, () => {
    console.log("Listening on port 8080");
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/product.routes')(app);
