const vscode = require("vscode");
const yyconfig = require("./yyconfig");
const userConfig = vscode.workspace.getConfiguration("ynw");
/**
 * 优先读取 ynw 配置
 */
module.exports = function (key) {
  const local = yyconfig.vscode || {};
  return local[key] || userConfig.get(key);
};
