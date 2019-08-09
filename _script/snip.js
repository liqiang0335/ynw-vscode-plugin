const fs = require("fs");
const path = require("path");
const getFiles = require("./utils/getFiles");
const ynwPath = path.join(__dirname, "../snippets/ynw.json");
const vuePath = path.join(__dirname, "../snippets/vue.json");
const vueSource = require("../snippets/src/vue-source.json");

// Files
const SOURCE = "D:\\Git\\ynw";

main();
function main() {
  const files = getFiles()(SOURCE);
  const jsfiles = files.filter(it => it.extname === ".js");

  const ynwString = jsfiles.map(item => template(item)).join(",");
  fs.writeFileSync(ynwPath, `{${ynwString}}`);

  // add ywn to vue
  setTimeout(() => {
    const ynw = require("../snippets/ynw.json");
    const vueSnip = Object.assign(vueSource, ynw);
    fs.writeFileSync(vuePath, JSON.stringify(vueSnip));
  }, 500);
}

function template(item) {
  const name = item.basename.replace(/\.\w+$/, "");
  const react = /react/.test(item.dirname) ? "react/" : "";
  return `"==ynw.${name}==": {
      "prefix": "ynw.${name}",
      "body": ["import ${name} from 'ynw/${react}${name}'"]
    }`;
}
