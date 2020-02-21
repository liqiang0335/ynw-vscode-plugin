const vscode = require("vscode");
const path = require("path");
const config = vscode.workspace.getConfiguration("ynw");
const moduleType = config.get("moduleType");
const isESM = moduleType === "esm";
const { getRelativePathInfo } = require("./util.js");

const RegsTable = [
  {
    reg: /\.scss$/,
    handler: ({ relativePath }) => `import styles from "${relativePath}"`
  },
  { reg: /\.css$/, handler: ({ relativePath }) => `import "${relativePath}"` },
  {
    reg: /s\.js$/i,
    handler: ({ relativePath }) => `import {  } from "${relativePath}"`
  }
];

module.exports = function(URI) {
  const activeDocument = vscode.window.activeTextEditor.document;
  if (!activeDocument) return;
  const { relativePath, ext } = getRelativePathInfo(
    URI.fsPath,
    activeDocument.uri.fsPath
  );
  const basename = path.basename(relativePath).match(/^[\w\-_]+/)[0];
  const fullName = basename + ext;
  const ctx = { relativePath, ext, basename, fullName };
  const match = RegsTable.find(item => item.reg.test(fullName));

  const content = !isESM
    ? `const ${basename} = require("${relativePath}");\n`
    : match
    ? match.handler(ctx) + ";\n"
    : `import ${basename} from "${relativePath}";\n`;

  //insert to open document
  vscode.window.activeTextEditor.edit(editBuilder => {
    let position = vscode.window.activeTextEditor.selection.end;
    editBuilder.insert(position, content);
  });
};
