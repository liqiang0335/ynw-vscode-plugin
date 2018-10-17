const vscode = require("vscode");

exports.shell = cmd => {
  const terminal = vscode.window.createTerminal();
  terminal.show();
  terminal.sendText(cmd);
};
