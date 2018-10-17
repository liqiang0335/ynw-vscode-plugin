const vscode = require("vscode");

/**
 * activate
 */
exports.activate = function(context) {
  let disposable = vscode.commands.registerCommand(
    "ynw.relavePath",
    function() {
      const terminal = vscode.window.createTerminal("Helos");
      terminal.sendText("ls");
      terminal.show();

      vscode.window.showInformationMessage("Hello World!");
    }
  );
  context.subscriptions.push(disposable);
};

/**
 * deactivate
 */
exports.deactivate = function() {};
