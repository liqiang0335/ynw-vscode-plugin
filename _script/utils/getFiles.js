const fs = require("fs");
const path = require("path");
const excludes = /[\\\/]+[._]/;

/**
 * @return {Array<{filePath,mtime,basename,dirname, extname}>}
 */
const getDirFiles = function() {
  const result = [];
  return function getFiles(folder) {
    if (excludes.test(folder)) {
      return;
    }
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
