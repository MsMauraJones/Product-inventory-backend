const db = require("../models");
const Methodology = db.methodology;

checkMethodologyIdExists = (req, res, next) => {
    const methodologyId = req.body.methodologyId;
    
    Methodology.findById(methodologyId, (err, doc) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (!doc) {
            res.status(404).send({ message: 'Methodology not found.' });
            return;
        }
    
        // res.send('This methodology id exists');

        next();

      });
};

const verifyMethodology = {
    checkMethodologyIdExists
}

module.exports = verifyMethodology;