const path = require("path");
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
