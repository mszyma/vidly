const config = require("config");

module.exports = function() {
  if (!config.get("passMario")) {
    // eslint-disable-next-line no-console
    throw new Error("FATAL ERROR: passMario is not defined");
    process.exit(1);
  }
};
