const vscode = require("vscode");
const path = require("path");
const utils = require("./util");
const fs = require("fs");

let result = [];
let jsonIgnore;

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
    const config = vscode.workspace.getConfiguration("ynw");
    jsonIgnore = config.get("jsonIgnore");
    const jsonName = config.get("jsonName");
    const target = path.join(filePath, jsonName + ".json");

    gen(filePath, { rel: path.basename(filePath) });
    fs.writeFile(target, JSON.stringify(result), err => {
      if (err) {
        console.log(err);
      }
    });
  }
};

function gen(folder, inject) {
  const files = fs.readdirSync(folder);
  for (var name of files) {
    const reg = new RegExp(jsonIgnore);
    if (reg.test(name)) {
      continue;
    }
    const filePath = path.join(folder, name);
    const stat = fs.statSync(filePath);
    const isDir = stat.isDirectory();
    if (isDir) {
      const id = uuid();
      result.push({ name, id, ...inject });
      const rel = inject && inject.rel ? `${inject.rel}/${name}` : name;
      gen(filePath, { pid: id, rel });
    }
  }
}
