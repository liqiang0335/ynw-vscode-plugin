const vscode = require("vscode");
const { copy } = require("copy-paste");
const { getRelativePath } = require("./util.js");

module.exports = function(uri) {
  const activeDocument = vscode.window.activeTextEditor.document;
  if (!activeDocument) return;
  const relativePath = getRelativePath(uri.fsPath, activeDocument.uri.fsPath);
  copy(relativePath);
};
