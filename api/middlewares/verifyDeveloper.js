const db = require("../models");
const Developer = db.developer;

checkDeveloperIdExists = (req, res, next) => {
    const developerId = req.body.developerId;
    
    Developer.findById(developerId, (err, doc) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (!doc) {
            res.status(404).send({ message: 'Developer not found.' });
            return;
        }
    
        res.send('This developer id exists');

        //next();

      });
};

checkArrayDeveloperIdExists = (req, res, next) => {
    const developerId = req.body.developerId;
    
    if (!Array.isArray(developerId)) {
        res.status(400).send({ message: 'Invalid format - send developerId in an array.' });
        return;
    }
    
    Developer.find({ _id: { $in: developerId } }, (err, docs) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (docs.length !== developerId.length) {
            res.status(404).send({ message: 'One or more developers not found.' });
            return;
        }
    
        //res.send('All developer ids exist');

        next();

    });
};

const verifyDeveloper = {
    checkDeveloperIdExists,
    checkArrayDeveloperIdExists
}

module.exports = verifyDeveloper;