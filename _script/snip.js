const fs = require("fs");
const path = require("path");
const getFiles = require("./utils/getFiles");
const SOURCE = "D:\\Git\\ynw";

main();
function main() {
  const files = getFiles()(SOURCE);

  const jsContent = files
    .filter(it => it.extname === ".js")
    .map(item => template(item))
    .join(",");
  fs.writeFileSync(
    path.join(__dirname, "../snippets/ynw.json"),
    `{${jsContent}}`
  );

  const vueContents = files
    .filter(it => it.extname === ".vue")
    .map(item => template(item))
    .join(",");
  fs.writeFileSync(
    path.join(__dirname, "../snippets/ynw-vue.json"),
    `{${vueContents}}`
  );
}

function template(item) {
  const name = item.basename.replace(/\.\w+$/, "");
  const forlder = getFolder(item);
  const prefix = getPrefix(item);
  return `"==ynw.${name}==": {
      "prefix": "${prefix}.${name}",
      "body": ["import ${name} from 'ynw/${forlder}${name}'"]
    }`;
}

function getFolder(item) {
  const { dirname, extname } = item;
  if (extname === ".vue") {
    return "vue/";
  }
  if (/react/.test(dirname)) {
    return "react/";
  }
  return "";
}

function getPrefix(item) {
  const { extname } = item;
  if (extname === ".vue") {
    return "yv";
  }
  return "yy";
}
