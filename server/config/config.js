var _ = require("lodash");
var dotenv = require("dotenv").config();

var config = {
  dev: "development",
  test: "testing",
  prod: "production",
  port: process.env.PORT || 8080,
  // 10 days in minutes
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || "gumball"
  },
  sheet: {
    id: process.env.SHEET_ID || "1lG56JjfVQsp1-2TL64XK8eZik4hI4KOQeQbasEfLzd0"
  },
  user: {
    email:
      process.env.USER_ID
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
  envConfig = require("./" + config.env);
  // just making sure the require actually
  // got something back :)
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
module.exports = _.merge(config, envConfig);
