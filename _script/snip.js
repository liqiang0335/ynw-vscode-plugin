const fs = require("fs");
const path = require("path");
const getFiles = require("./utils/getFiles");
const ynw = path.join(__dirname, "../snippets/ynw.json");

// Files
const SOURCE = "D:\\Git\\ynw";

main();
function main() {
  const files = getFiles()(SOURCE);
  const jsfiles = files.filter(it => it.extname === ".js");

  const content = jsfiles.map(item => template(item)).join(",");
  fs.writeFileSync(ynw, `{${content}}`);

  // add ynw to vue.json
}

function template(item) {
  const name = item.basename.replace(/\.\w+$/, "");
  const react = /react/.test(item.dirname) ? "react/" : "";
  return `"==ynw.${name}==": {
      "prefix": "ynw.${name}",
      "body": ["import ${name} from 'ynw/${react}${name}'"]
    }`;
}
