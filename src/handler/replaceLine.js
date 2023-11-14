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
      let range = document.lineAt(currentLine).range;
      let currentLineContent = document.getText(range);

      let regs = [
        { match: /><\//, find: /<(\w+)><\/\1>/, replace: "<$1 />" },
        { match: /<(\w+)\s+\/>/, find: /<(\w+)\s+\/>/, replace: "<$1></$1>" },
      ];
      let matched = false;
      for (let i = 0; i < regs.length; i++) {
        const reg = regs[i];
        if (reg.match.test(currentLineContent)) {
          matched = true;
          const newText = currentLineContent.replace(reg.find, reg.replace);
          editBuilder.delete(range);
          editBuilder.insert(range.start, newText);
          return;
        }
      }

      if (!matched) {
        vscode.window.showInformationMessage("没有匹配的替换");
      }
    });
  }
};
