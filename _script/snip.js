const fs = require("fs");
const path = require("path");
const getFiles = require("./utils/getFiles");
const target = path.join(__dirname, "../snippets/ynw.json");

// Files
const SOURCE = "D:\\Git\\ynw";

main();
function main() {
  const files = getFiles()(SOURCE).filter(it => {
    return it.extname === ".js" && !/vue/.test(it.filePath);
  });
  const content = files.map(item => template(item)).join(",");
  fs.writeFileSync(target, `{${content}}`);
}

function template(item) {
  const name = item.basename.replace(/\.\w+$/, "");
  const react = /react/.test(item.dirname) ? "react/" : "";
  return `"==ynw.${name}==": {
      "prefix": "ynw.${name}",
      "body": ["import ${name} from 'ynw/${react}${name}'"]
    }`;
}
