const fs = require("fs");
const getLocalFile = require("./getLocalFile");
const filePath = getLocalFile("yy.config.js");
const exsits = fs.existsSync(filePath);
module.exports = exsits ? require(filePath) : {};
