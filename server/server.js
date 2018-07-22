var express = require("express");
var app = express();
var api = require("./api/api");
var errorHandlers = require("./handlers/errorHandlers");

// setup the app middlware
require("./middleware/appMiddlware")(app);

// setup default route
app.use("/", require("./api/default/defaultRoutes"));

// setup the api
app.use("/api/v1", api);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Development error handler
if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// export the app for testing
module.exports = app;
