const vscode = require("vscode");
const replaceText = require("../utils/replaceText");
const dayjs = require("dayjs");
/**
 * ----------------------------------------
 * 打印选中变量
 * ----------------------------------------
 */
module.exports = function () {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("没有打开的窗口");
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);
  const time = dayjs().format("YYYY-MM-DD HH:mm:ss");

  if (text) {
    vscode.commands.executeCommand("editor.action.insertLineAfter").then(() => {
      const value = `console.log("⭕️ ${text}: ", ${text});`;
      replaceText(value);
    });
  } else {
    replaceText(`console.log("⭕️ [${time}]","");`);
  }
};
