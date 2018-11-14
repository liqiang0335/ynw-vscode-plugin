const vscode = require("vscode");
const path = require("path");
const util = require("./util");

const exec = (cmd, name) => {
  const terminal = vscode.window.createTerminal({ name });
  terminal.show(true);
  terminal.sendText(cmd);
};

module.exports = async function() {
  const { window, workspace } = vscode;
  const document = window.activeTextEditor.document;
  const cwd = workspace.workspaceFolders[0].uri.path;
  const { fileName } = document;
  const ext = path.extname(fileName).replace(".", "");
  const handlerName = `ynw-${ext}-factory.js`;
  const handlerPath = path.join(cwd, handlerName);
  const exist = await util.exists(handlerPath);
  if (exist) {
    const cmd = `node ${handlerName} ${fileName}`;
    exec(cmd, "ynw-process");
  }
};
