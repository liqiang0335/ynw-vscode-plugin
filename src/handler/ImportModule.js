const vscode = require("vscode");
const { getRelativePath } = require("./util.js");
const path = require("path");

module.exports = function(URI) {
  const activeDocument = vscode.window.activeTextEditor.document;
  if (!activeDocument) return;
  const relativePath = getRelativePath(URI.fsPath, activeDocument.uri.fsPath);
  const basename = path.basename(relativePath);
  //insert to open document
  vscode.window.activeTextEditor.edit(editBuilder => {
    let position = vscode.window.activeTextEditor.selection.end;
    const content = `import ${basename} from "${relativePath}";`;
    editBuilder.insert(position, content);
  });
};
