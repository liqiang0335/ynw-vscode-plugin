const path = require("path");
const fs = require("fs");
const util = require("util");
const vscode = require("vscode");

// Handle window's Style file path
const toWinPath = p => p.replace(/\\+/g, "\\\\").replace(/^\\+/, "");

/**
 * Get Relative Path for active
 */
const getRelativePath = function (selectFilePath, activeFilePath) {
  let relativePath = path
    .relative(activeFilePath, selectFilePath)
    .replace(/\\+/g, "/") //replace sep
    .replace(/^\.\.\//, "");

  // remove extension for some file type
  if (/\.(jsx?|vue|json)$/.test(relativePath)) {
    relativePath = relativePath.replace(/\.[a-z]+$/, "");
  }

  if (!relativePath.startsWith(".")) {
    relativePath = "./" + relativePath;
  }
  return relativePath;
};

const getActiveDocumentPath = () => {
  const activeDocument = vscode.window.activeTextEditor.document;
  return activeDocument ? activeDocument.uri.fsPath : "";
};

/**
 * Get Path With Suffix
 */
const getRelativePathInfo = function (selectFilePath) {
  const activeFilePath = getActiveDocumentPath();
  if (!activeFilePath) return "";

  let relativePath = path
    .relative(activeFilePath, selectFilePath)
    .replace(/\\+/g, "/") //replace sep
    .replace(/^\.\.\//, "");

  const ext = path.extname(relativePath);
  let result = relativePath;

  // remove extension for some file type
  if (/\.(jsx?|vue)$/.test(relativePath)) {
    result = relativePath.replace(/\.[a-z]+$/, "");
  }
  if (!result.startsWith(".")) {
    result = "./" + result;
  }

  return { relativePath: result, ext };
};

////////////////////////////////////////////////////////////

exports.stat = util.promisify(fs.stat);
exports.writeFile = util.promisify(fs.writeFile);
exports.exists = util.promisify(fs.exists);
exports.getRelativePath = getRelativePath;
exports.toWinPath = toWinPath;
exports.getRelativePathInfo = getRelativePathInfo;
