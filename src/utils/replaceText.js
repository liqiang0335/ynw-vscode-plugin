const vscode = require("vscode");
/**
 * ----------------------------------------
 * 替换选定的内容
 * ----------------------------------------
 */
const replaceText = text => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const selection = editor.selection;
  const range = new vscode.Range(selection.start, selection.end);
  editor.edit(editBuilder => {
    editBuilder.replace(range, text);
  });
};

module.exports = replaceText;
