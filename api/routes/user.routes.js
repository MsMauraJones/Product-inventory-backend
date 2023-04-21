const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/director", [authJwt.verifyToken], controller.directorBoard);

  app.get("/api/test/all-roles", [authJwt.verifyToken, authJwt.isAdmin],
  controller.getRoles
)

  app.get(
    "/api/test/devops",
    [authJwt.verifyToken, authJwt.isDevOps],
    controller.devopsBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/allusers",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUsersWithRoles

  );

  app.get(
    "/api/test/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUser
  );

  app.get(
    "/api/test/users/search/:username",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.searchUser
  );
  
  app.delete(
    "/api/test/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.put(
    "/api/test/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );


};