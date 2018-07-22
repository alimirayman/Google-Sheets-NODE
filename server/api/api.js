var router = require("express").Router();

// api router will mount other routers
// for all our resources
router.use("/sheets", require("./sheet/sheetRoutes"));
router.use("/", require("./default/defaultRoutes"));

module.exports = router;
