const vscode = require("vscode");
const path = require("path");
const utils = require("./util");
const { copy } = require("copy-paste");

const DefualtFileInputs = {
  "style.js": "import styled from 'styled-components';",
  scss: ".container"
};

module.exports = async function(URI) {
  const filePath = URI
    ? URI.fsPath
    : vscode.window.activeTextEditor.document.fileName;

  const stat = await utils.stat(filePath);
  const fileType = stat.isDirectory() ? "dir" : "file";

  const config = vscode.workspace.getConfiguration("ynw");
  const ext = config.get("styleFileType");
  const scriptFileType = config.get("scriptFileType");

  const fileTypeHandler = {
    file() {
      const dirname = path.dirname(filePath);
      const name = path.basename(filePath).match(/^\w+/)[0];
      const fullName = name + "." + ext;
      const target = path.join(dirname, fullName);
      const content = (DefualtFileInputs[ext] || "") + "\n";
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
    }
  };

  const { content, target } = fileTypeHandler[fileType]();
  const exist = await utils.exists(target);
  if (!exist) {
    await utils.writeFile(target, content);
  }
};
