var router = require("express").Router();
var controller = require("./sheetController");
var { catchErrors } = require("../../handlers/errorHandlers");

router
  .route("/")
  .get(catchErrors(controller.get))
  .post(catchErrors(controller.post));

router
  .route("/:id")
  .get(catchErrors(controller.get))
  .post(catchErrors(controller.post));

module.exports = router;
