const path = require("path");
const vscode = require("vscode");
const { workspace } = vscode;

module.exports = name => {
  return path
    .join(workspace.workspaceFolders[0].uri.path, name)
    .replace(/\\+/, "\\\\")
    .replace(/^\\+/, "");
};
