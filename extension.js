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
      vscode.window.showInformationMessage("No Open Document");
      return;
    }
    let selectFilePath = URI.fsPath;
    const activeFilePath = activeDocument.uri.fsPath;

    let relativePath = path
      .relative(activeFilePath, selectFilePath)
      .replace(/^\.\.\\/, "")
      .replace(/\.[a-z]+$/, "") //remove ext
      .replace(/\\/g, "/"); //replace sep

    if (!relativePath.startsWith(".")) {
      relativePath = "./" + relativePath;
    }

    copy(relativePath);
    vscode.window.showInformationMessage("OK");
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
