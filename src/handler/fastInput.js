const vscode = require("vscode");
const fs = require("fs");
const getLocalFile = require("../utils/getLocalFile");

const getLocalFastValue = () => {
  const localFile = getLocalFile("ynw-fast.txt");
  if (fs.existsSync(localFile)) {
    return fs.readFileSync(localFile, "utf-8");
  } else {
    return "/**\n * @param {Number} name - explain\n * @return {}\n*/";
  }
};

module.exports = function() {
  const fastValue = getLocalFastValue();
  vscode.window.activeTextEditor.edit(editBuilder => {
    let position = vscode.window.activeTextEditor.selection.end;
    editBuilder.insert(position, fastValue);
  });
};
