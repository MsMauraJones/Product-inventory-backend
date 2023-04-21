const db = require("../models");
const Status = db.status;

checkDuplicateStatusName = (req, res, next) => {
    Status.findOne({
        statusName: req.body.statusName
    }).exec((err, doc) =>{
        if(err){
            res.status(500).send({ message: err});
            return;
        }
        if(doc){
            res.status(400).send({ message: "Status name already exists"});
            return;
        }

        next();
    })
};

checkStatusIdExists = (req, res, next) => {
    const statusId = req.body.statusId;

    Status.findById(statusId, (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!doc) {
      res.status(404).send({ message: 'Status not found.' });
      return;
    }

    // res.send('This status id exists');

    next();

  });
}

const verifyStatus = {
    checkDuplicateStatusName,
    checkStatusIdExists
};

module.exports = verifyStatus;