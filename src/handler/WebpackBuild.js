const vscode = require("vscode");
const path = require("path");

const exec = (cmd, name) => {
  const terminal = vscode.window.createTerminal({ name });
  terminal.show(true);
  terminal.sendText(cmd);
};

module.exports = function(URI, env) {
  const relative = vscode.workspace.asRelativePath(URI);
  const dirname = path.dirname(relative).match(/\w+$/);
  const entry = relative.replace(/\\+/g, "/").replace(/\.[a-z]+$/, "");
  const key = dirname[0];
  exec(`ynw build=${key} entry=${entry} env=${env}`, key);
};
