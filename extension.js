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

    const relativePath = path.relative(activeFilePath, selectFilePath);
    console.log("selectFilePath", selectFilePath);
    console.log("activeFilePath", activeFilePath);
    console.log("relativePath", relativePath);

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
