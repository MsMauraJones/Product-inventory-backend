const db = require("../models");
const Owner = db.owner;

checkOwnerIdExists = (req, res, next) => {
    const ownerId = req.body.ownerId;
    
    Owner.findById(ownerId, (err, doc) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (!doc) {
            res.status(404).send({ message: 'Owner not found.' });
            return;
        }
    
        //res.send('This owner id exists');

        next();

      });
};

const verifyOwner = {
    checkOwnerIdExists
}

module.exports = verifyOwner;