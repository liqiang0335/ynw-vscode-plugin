const vscode = require("vscode");
const path = require("path");
const utils = require("./util");
const { copy } = require("copy-paste");
const getConfigValue = require("../utils/getConfigValue");

module.exports = async function (URI) {
  const filePath = URI ? URI.fsPath : vscode.window.activeTextEditor.document.fileName;

  const stat = await utils.stat(filePath);
  const fileType = stat.isDirectory() ? "dir" : "file";
  const styleFileType = getConfigValue("styleFileType");
  const scriptFileType = getConfigValue("scriptFileType");

  const fileTypeHandler = {
    file() {
      const dirname = path.dirname(filePath);
      const name = path.basename(filePath).match(/^\w+/)[0];
      const fullName = name + "." + styleFileType;
      const target = path.join(dirname, fullName);
      const content = "\n";
      copy(`import styles from "./${fullName}"`);
      return { target, content };
    },
    dir() {
      const name = filePath.match(/\w+$/)[0];
      const target = path.join(filePath, name + "." + scriptFileType);
      const content = `import React from "react";\n\n
      export default function ${name}(){
        return <div>${name}</div>
      }`;
      return { target, content };
    },
  };

  const { content, target } = fileTypeHandler[fileType]();
  const exist = await utils.exists(target);
  if (!exist) {
    await utils.writeFile(target, content);
  }
};
