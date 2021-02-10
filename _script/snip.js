const fs = require("fs");
const getFiles = require("./utils/getFiles");
const os = require("os");
const path = require("path");

/**====================================*/
const SOURCE =
  os.platform() === "darwin"
    ? "/Users/liqiang/Documents/Git/YNW/ynw"
    : "D:\\Git\\ynw";
/**====================================*/

main();
function main() {
  const files = getFiles(/lib/)(SOURCE);

  //1. JS FILES
  const jsContent = files
    .filter(it => it.extname === ".js")
    .filter(it => !/index/.test(it.basename))
    .map(item => createSnipTemplate(item))
    .join(",");
  fs.writeFileSync(
    path.join(__dirname, "../snippets/ynw.json"),
    `{${jsContent}}`
  );

  //2. VUE FILES
  const vueContents = files
    .filter(it => it.extname === ".vue")
    .map(item => createSnipTemplate(item))
    .join(",");
  fs.writeFileSync(
    path.join(__dirname, "../snippets/ynw-vue.json"),
    `{${vueContents}}`
  );
}

function createSnipTemplate(item) {
  const name = item.basename.replace(/\.\w+$/, "");
  const forlder = getFolder(item);
  const prefix = forlder ? forlder + "." : "";
  const dir = forlder ? forlder + "/" : "";
  return `"==ynw.${name}==": {
      "prefix": "ynw.${prefix}${name}",
      "body": ["import ${name} from 'ynw/${dir}${name}'"]
    }`;
}

function getFolder(item) {
  const { dirname } = item;
  const match = dirname.match(/ynw\/(\w+)\/?/);
  if (match) {
    return match[1];
  }
  return "";
}
