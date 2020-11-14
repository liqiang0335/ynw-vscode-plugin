const vscode = require("vscode");
/**
 * ----------------------------------------
 *   导入公共模块时, 设置相同的名称
 * ----------------------------------------
 */
module.exports = function (URI) {
  const editor = vscode.window.activeTextEditor;
  const document = editor.document;
  const selecton = editor.selection.end;
  const line = document.lineAt(selecton);
  console.log(line);
};
