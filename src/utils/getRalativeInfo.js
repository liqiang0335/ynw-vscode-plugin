const path = require("path");
const activeDocument = require("./activeDocument");

/**
 * 右键选中的文档-相对-当前文档路径
 * @param {String} selectFilePath
 * @return Object { relativePath, ext }
 */
const getRelativeInfo = function (selectFilePath) {
  const active = activeDocument();
  if (!active) return;

  let relativePath = path
    .relative(active, selectFilePath)
    .replace(/\\+/g, "/") // 转换为正斜杠
    .replace(/^\.\.\//, ""); // 去掉开头的 ../

  const ext = path.extname(relativePath);
  let result = relativePath;

  // 去掉拓展名
  if (/\.([jt]sx?)$/.test(relativePath)) {
    result = relativePath.replace(/\.[a-z]+$/, "");
  }
  if (!result.startsWith(".")) {
    result = "./" + result;
  }

  const baseName = path.basename(relativePath).match(/^[\w\-_]+/)[0];
  const fullName = result.match(/[^/]+$/)[0];

  return { relativePath: result, ext, baseName, fullName };
};

module.exports = getRelativeInfo;
