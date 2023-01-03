const vscode = require("vscode");
/**
 * Insert Contnet to Selection
 */
module.exports = function (content) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("consoleLog:fail");
    return;
  }
  editor.edit(editBuilder => {
    let position = editor.selection.end;
    editBuilder.insert(position, content);
  });
};
