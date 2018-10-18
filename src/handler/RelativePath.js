const vscode = require("vscode");
const { copy } = require("copy-paste");
const path = require("path");

/**
 * RelativePathHandler
 */
module.exports = function(URI) {
  const activeDocument = vscode.window.activeTextEditor.document;
  if (!activeDocument) {
    return;
  }
  let selectFilePath = URI.fsPath;
  const activeFilePath = activeDocument.uri.fsPath;

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
  copy(relativePath);
};
