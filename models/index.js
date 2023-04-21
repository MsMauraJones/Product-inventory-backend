const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.product = require("./product.model");
db.developer = require("./developer.model");
db.methodology = require("./methodology.model");
db.owner = require ("./owner.model");
db.ministry = require("./ministry.model");
db.scrumMaster = require("./scrumMaster.model");
db.status = require("./status.model");

db.ROLES = ["Director", "Admin", "DevOps"];

module.exports = db;