const vscode = require("vscode");
const path = require("path");
const getConfigValue = require("../utils/getConfigValue");

const exec = (cmd, name) => {
  const terminal = vscode.window.createTerminal({ name });
  terminal.show(true);
  terminal.sendText(cmd);
};

module.exports = function (URI, env) {
  const relative = vscode.workspace.asRelativePath(URI);
  const dirname = path.dirname(relative).match(/\w+$/) || ["app"];
  const entry = relative.replace(/\\+/g, "/").replace(/\.[a-z]+$/, "");
  const key = dirname[0];
  const cmdName = getConfigValue("cmdName") || "yy";
  try {
    exec(`${cmdName} build=${key} entry=./${entry} env=${env}`, key);
  } catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
};
