const vscode = require("vscode");
const { getRelativePath } = require("./util.js");
const path = require("path");

const maps = [
  {
    reg: /\.scss$/,
    handler: ({ relativePath }) => `import styles from "${relativePath}"`
  },
  {
    reg: /\.css$/,
    handler: ({ relativePath }) => `import "${relativePath}"`
  },
  {
    reg: /(api)$/,
    handler: ({ relativePath, basename }) =>
      `import * as ${basename} from "${relativePath}"`
  },
  {
    reg: /(const|utils)$/i,
    handler: ({ relativePath }) => `import {  } from "${relativePath}"`
  }
];

module.exports = function(URI) {
  const activeDocument = vscode.window.activeTextEditor.document;
  if (!activeDocument) return;
  const relativePath = getRelativePath(URI.fsPath, activeDocument.uri.fsPath);
  const basename = path.basename(relativePath);
  const ext = path.extname(basename);
  const ctx = { relativePath, ext, basename };
  const match = maps.find(item => item.reg.test(basename));
  const content = match
    ? match.handler(ctx) + ";\n"
    : `import ${basename} from "${relativePath}";\n`;

  //insert to open document
  vscode.window.activeTextEditor.edit(editBuilder => {
    let position = vscode.window.activeTextEditor.selection.end;
    editBuilder.insert(position, content);
  });
};
