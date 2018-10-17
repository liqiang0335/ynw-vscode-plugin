const vscode = require("vscode");
const { copy } = require("copy-paste");
const path = require("path");

/**
 * activate
 */
exports.activate = function(context) {
  const registerCallback = function(URI) {
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

  let disposable = vscode.commands.registerCommand(
    "ynw.relavePath",
    registerCallback
  );
  context.subscriptions.push(disposable);
};

/**
 * deactivate
 */
exports.deactivate = function() {};
