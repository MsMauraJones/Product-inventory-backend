
const { product } = require("../models");
const db = require ("../models");
const Product = db.product;
const Owner = db.owner;
const Ministry = db.ministry;
const ScrumMaster = db.scrumMaster;
const Developer = db.developer;
const Methodology = db.methodology;
const Status = db.status;

exports.getAllProductsPublic = (req, res) => {
    const excludedStatusId = req.params.excludedStatusId;

    Product.find({ statusId: { $ne: excludedStatusId } })
        .populate('ministryId', 'ministryName')
        .populate('statusId', 'statusName')
        .then(products => {
            const productList = products.map(product => {
                return {
                    productId: product._id,
                    productName: product.productName,
                    ministryName: product.ministryId.ministryName,
                    statusName: product.statusId.statusName,
                    startDate: product.startDate
                };
            });
            return res.json(productList);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        });
};


exports.getAllProductsDraft = (req, res) => {
    Product.find()
        .populate('ownerId', 'ownerName')
        .populate('ministryId', 'ministryName')
        .populate('scrumMasterId', 'scrumMasterName')
        .populate('developerId', 'developerName') 
        .populate('methodologyId', 'methodologyName')
        .populate('statusId', 'statusName')
        .then(products =>{
            const productList = products.map(product => {
                return {
                    productId: product._id,
                    productName: product.productName,
                    ownerId: product.ownerId._id,
                    ownerName: product.ownerId.ownerName,
                    ministryId: product.ministryId._id,
                    ministryName: product.ministryId.ministryName,
                    scrumMasterId: product.scrumMasterId._id,
                    scrumMasterName: product.scrumMasterId.scrumMasterName,
                    developerId: product.developerId.map(dev => dev._id), // <---- maps developerIds to an array of ids
                    developerName: product.developerId.map(dev => dev.developerName), // <---- maps developerNames to an array of names
                    methodologyId: product.methodologyId._id,
                    methodologyName: product.methodologyId.methodologyName,
                    statusId: product.statusId._id,
                    statusName: product.statusId.statusName,
                    startDate: product.startDate
                };
            });
            return res.json(productList);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        });
};

exports.addNewOwner = (req, res) => {
    const owner = new Owner({
        ownerName: req.body.ownerName,   
        ministryId: req.body.ministryId
    });
    Owner.create(owner, function(err, newOwner){
        if (err) {
            console.error(err);
            res.status(500).send("Error adding owner");
          } else {
            console.log("New owner added:", newOwner)
            res.send("Owner added successfully");
          }
        });
};

exports.addMinistry = (req, res) => {
    const ministry = new Ministry({
        ministryName: req.body.ministryName     
    });
    Ministry.create(ministry, function(err){
        if (err) {
            console.error(err);
            res.status(500).send("Error adding ministry");
          } else {
            res.send("Ministry added successfully");
          }
        });
};

exports.addScrumMaster = (req, res) => {
    const scrumMaster = new ScrumMaster({
        scrumMasterName: req.body.scrumMasterName     
    });
    ScrumMaster.create(scrumMaster, function(err){
        if (err) {
            console.error(err);
            res.status(500).send("Error adding scrum master");
          } else {
            res.send("Scrum master added successfully");
          }
        });
};

exports.addDeveloper = (req, res) => {
    const developer = new Developer({
        developerName: req.body.developerName     
    });
    Developer.create(developer, function(err, doc){
        if (err) {
            console.error(err);
            res.status(500).send("Error adding developer");
          } else {
            console.log("New developer added:", doc)
            res.send("Developer added successfully");
          }
        });
};

exports.addProduct = (req, res) => {
    const product = new Product ({
        productName: req.body.productName,
        ownerId: req.body.ownerId,
        ministryId: req.body.ministryId,
        scrumMasterId: req.body.scrumMasterId,
        developerId: req.body.developerId,
        methodologyId: req.body.methodologyId,
        statusId: req.body.statusId,
        startDate: req.body.startDate
    });
    Product.create(product, (err, doc) => {
        if(err){
            console.error(err);
            res.status(500).send("Error adding product");
        } else {
            console.log(doc)
            res.send("Product added successfully");
        }
    });
};

exports.addMethodology = (req, res) => {
    const methodology = new Methodology ({
        methodologyName: req.body.methodologyName
    });
    Methodology.create(methodology, (err, doc) => {
        if(err){
            console.error(err);
            res.status(500).send("Error adding methodology");
        } else {
            console.log(doc)
            res.send("Methodology added successfully");
        }
    });
};

exports.addStatus = (req, res) => {
    const status = new Status({
        statusName: req.body.statusName
    });
    Status.create(status, (err, doc) => {
        if(err){
            console.error(err);
            res.status(500).send("Error adding status");
        } else {
            console.log(doc)
            res.send("Status added successfully");
        }
    });
};


      
