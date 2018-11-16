const vscode = require("vscode");
const path = require("path");
const util = require("./util");

const exec = (cmd, name) => {
  const terminal = vscode.window.createTerminal({ name });
  terminal.sendText(cmd);
  terminal.show(true);
};

module.exports = async function(URI) {
  const { workspace, window } = vscode;
  const selectPath = URI
    ? URI.fsPath
    : window.activeTextEditor.document.fileName;
  const cwd = workspace.workspaceFolders[0].uri.path;
  const ext = path.extname(selectPath).replace(".", "");
  const handlerName = `ynw-${ext}-factory.js`;
  const handlerPath = path
    .join(cwd, handlerName)
    .replace(/\\+/g, "\\\\")
    .replace(/^\\+/, "");
  const exist = await util.exists(handlerPath);

  if (exist) {
    const cmd = `node ${handlerName} ${util.toWinPath(selectPath)}`;
    exec(cmd, "ynw-process");
  }
};
