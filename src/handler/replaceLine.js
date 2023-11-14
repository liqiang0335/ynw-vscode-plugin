const vscode = require("vscode");
/**
 *  Replace self closing tag to open and close tag
 */
module.exports = function () {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const { document } = editor;
    const currentLine = editor.selection.active.line;
    editor.edit((editBuilder) => {
      const range = document.lineAt(currentLine).range;
      const currentLineContent = document.getText(range);
      editBuilder.delete(range);

      let newText = "";
      const isCloseTag = currentLineContent.match(/><\//);
      if (isCloseTag) {
        newText = currentLineContent.replace(/<(\w+)><\/\1>/g, "<$1 />");
      } else {
        newText = currentLineContent.replace(/<(\w+)\s*\/>/g, "<$1></$1>");
      }
      editBuilder.insert(range.start, newText);
    });
  }
};
