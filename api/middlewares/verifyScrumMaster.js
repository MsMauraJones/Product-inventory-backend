const db = require("../models");
const ScrumMaster = db.scrumMaster;

checkScrumMasterIdExists = (req, res, next) => {
    const scrumMasterId = req.body.scrumMasterId;
    
    ScrumMaster.findById(scrumMasterId, (err, doc) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (!doc) {
            res.status(404).send({ message: 'Scrum Master not found.' });
            return;
        }
    
        //res.send('This scrum master id exists');

        next();

      });
};

const verifyScrumMaster = {
    checkScrumMasterIdExists
}

module.exports = verifyScrumMaster;