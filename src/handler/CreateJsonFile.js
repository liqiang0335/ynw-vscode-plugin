const vscode = require("vscode");
const path = require("path");
const utils = require("./util");
const fs = require("fs");

const config = vscode.workspace.getConfiguration("ynw");
const jsonIgnore = config.get("jsonIgnore");
const isIncludeFile = config.get("jsonIncludeFiles");
const jsonName = config.get("jsonName") + ".json";

let result = [];

const uuid = () => {
  const now = Date.now();
  const num = Math.floor(Math.random() * 10000 * 1000);
  return `${now}${num}`;
};

module.exports = async function(URI) {
  const filePath = URI.fsPath;
  const stat = await utils.stat(filePath);
  const isDir = stat.isDirectory();
  if (isDir) {
    result = [];
    const target = path.join(filePath, jsonName);
    gen(filePath, { rel: path.basename(filePath) });

    fs.writeFile(target, JSON.stringify(result), err => {
      if (err) {
        console.log(err);
        return;
      }
      vscode.window.showInformationMessage("create JSON: OK");
    });
  }
};

function gen(folder, inject) {
  const files = fs.readdirSync(folder);
  for (var name of files) {
    const reg = new RegExp(jsonIgnore);
    if (reg.test(name) || jsonName == name) {
      continue;
    }
    const filePath = path.join(folder, name);
    const stat = fs.statSync(filePath);
    const isDir = stat.isDirectory();

    if (!isDir && !isIncludeFile) {
      continue;
    }

    const id = uuid();
    result.push({ name, id, isDir, ...inject });
    const rel = inject && inject.rel ? `${inject.rel}/${name}` : name;

    if (isDir) {
      gen(filePath, { pid: id, rel });
    }
  }
}
