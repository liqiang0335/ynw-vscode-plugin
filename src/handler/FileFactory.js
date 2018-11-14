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
  const selectPath = URI.path;
  const ext = path.extname(selectPath).replace(".", "");
  const handlerName = `ynw-${ext}-factory.js`;
  const handlerPath = path.join(cwd, handlerName);
  const exist = await util.exists(handlerPath);
  console.log(handlerName);
  console.log(handlerPath);
  console.log(exist);
  if (exist) {
    const cmd = `node ${handlerName} ${selectPath}`;
    exec(cmd, "ynw-process");
  }
};
