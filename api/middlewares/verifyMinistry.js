const db = require("../models");
const Ministry = db.ministry;

checkMinistryIdExists = (req, res, next) => {
    const ministryId = req.body.ministryId;
    
    Ministry.findById(ministryId, (err, doc) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (!doc) {
            res.status(404).send({ message: 'Ministry not found.' });
            return;
        }
    
        //res.send('This ministry id exists');

        next();

      });
};

const verifyMinistry = {
    checkMinistryIdExists
}

module.exports = verifyMinistry;