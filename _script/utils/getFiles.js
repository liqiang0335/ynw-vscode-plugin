const fs = require("fs");
const path = require("path");
const excludes = /[\\\/]+[._]/;

/**
 * @param {Regex, Optional} reg - 要排除的文件夹正则
 * @param {String} folder - 目标文件夹
 *
 * @return {Array}
 */
const getDirFiles = function(reg) {
  const result = [];
  return function getFiles(folder) {
    // exclues
    if (excludes.test(folder)) return;
    if (reg && reg.test(folder)) return;
    const files = fs.readdirSync(folder);
    for (let name of files) {
      const filePath = path.join(folder, name);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        getFiles(filePath);
      } else {
        result.push({
          filePath,
          mtime: stat.mtime,
          basename: path.basename(filePath),
          dirname: path.dirname(filePath),
          extname: path.extname(filePath)
        });
      }
    }

    return result;
  };
};

module.exports = getDirFiles;
