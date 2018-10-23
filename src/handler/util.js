const path = require("path");
const fs = require("fs");
const util = require("util");
/**
 * Get Relative Path for active
 */
exports.getRelativePath = function(selectFilePath, activeFilePath) {
  let relativePath = path
    .relative(activeFilePath, selectFilePath)
    .replace(/\\+/g, "/") //replace sep
    .replace(/^\.\.\//, "");

  //remove extension for some file type
  if (/\.(jsx?|vue|json)$/.test(relativePath)) {
    relativePath = relativePath.replace(/\.[a-z]+$/, "");
  }

  if (!relativePath.startsWith(".")) {
    relativePath = "./" + relativePath;
  }
  return relativePath;
};

exports.stat = util.promisify(fs.stat);
exports.writeFile = util.promisify(fs.writeFile);
exports.exists = util.promisify(fs.exists);
