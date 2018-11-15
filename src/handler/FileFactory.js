const vscode = require("vscode");
const path = require("path");
const util = require("./util");

const exec = (cmd, name) => {
  const terminal = vscode.window.createTerminal({ name });
  terminal.sendText(cmd);
  terminal.show(true);
};

module.exports = async function(URI) {
  const { workspace } = vscode;
  const cwd = workspace.workspaceFolders[0].uri.path;
  const selectPath = URI.fsPath;
  const ext = path.extname(selectPath).replace(".", "");
  const handlerName = `ynw-${ext}-factory.js`;
  const handlerPath = path
    .join(cwd, handlerName)
    .replace(/\\+/g, "\\\\")
    .replace(/^\\+/, "");
  const exist = await util.exists(handlerPath);

  // console.log("cwd", cwd);
  // console.log("selectPath", selectPath);
  // console.log("handlerName", handlerName);
  // console.log("handlerPath", handlerPath);
  // console.log("exist", exist);

  if (exist) {
    const cmd = `node ${handlerName} ${util.toWinPath(selectPath)}`;
    exec(cmd, "ynw-process");
  }
};
