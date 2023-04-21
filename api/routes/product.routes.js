const { authJwt } = require("../middlewares");
const { verifyOwner } = require("../middlewares");
const { verifyMinistry } = require("../middlewares");
const { verifyScrumMaster } = require("../middlewares");
const { verifyDeveloper } = require("../middlewares");
const { verifyMethodology } = require("../middlewares");
const { verifyStatus } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/test/all-products/:excludedStatusId", controller.getAllProductsPublic);

    app.get("/api/test/all-products-draft", [authJwt.verifyToken],controller.getAllProductsDraft);

    app.get("api/test/owner", [verifyOwner.checkOwnerIdExists]);

    app.get("/api/test/ministry", [verifyMinistry.checkMinistryIdExists]);

    app.get("/api/test/methodology", [verifyMethodology.checkMethodologyIdExists]);

    app.get("/api/test/scrumMaster", [verifyScrumMaster.checkScrumMasterIdExists]);

    app.get("/api/test/developer", [verifyDeveloper.checkDeveloperIdExists])

    app.get("/api/test/status", [verifyStatus.checkStatusIdExists]);

    app.post("/api/test/add-owner-new", 
    [
      verifyMinistry.checkMinistryIdExists
    ],
    controller.addNewOwner);

    app.post(
      "/api/test/add-status",
      [
        verifyStatus.checkDuplicateStatusName
      ],
      controller.addStatus
    );

    app.post(
      "/api/test/add-methodology", controller.addMethodology
    )

    app.post("/api/test/add-ministry", controller.addMinistry)

    app.post("/api/test/add-scrumMaster", controller.addScrumMaster)

    app.post("/api/test/add-developer", controller.addDeveloper)
    
    app.post("/api/test/add-product",
    [verifyOwner.checkOwnerIdExists],
    [verifyMinistry.checkMinistryIdExists],
    [verifyScrumMaster.checkScrumMasterIdExists],
    [verifyDeveloper.checkArrayDeveloperIdExists],
    [verifyMethodology.checkMethodologyIdExists],
    [verifyStatus.checkStatusIdExists], 
    controller.addProduct)

};