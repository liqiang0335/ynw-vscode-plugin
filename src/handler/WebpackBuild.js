const vscode = require("vscode");
const path = require("path");

const exec = cmd => {
  const terminal = vscode.window.createTerminal({ name: "ynw" });
  terminal.show(true);
  terminal.sendText(cmd);
};

module.exports = function(URI, env) {
  const relative = vscode.workspace.asRelativePath(URI);
  const dirname = path.dirname(relative);
  const entry = relative.replace(/\\+/g, "/").replace(/\.[a-z]+$/, "");
  exec(`ynw build=${dirname} entry=${entry} env=${env}`);
};
