const fs = require("fs");
const getLocalFile = require("../utils/getLocalFile");
const insertContent = require("../utils/insertContent");

const getLocalFastValue = () => {
  const CopyPath = getLocalFile("ynw-copy.txt");
  const FastPath = getLocalFile("ynw-fast.js");

  if (fs.existsSync(CopyPath)) {
    return fs.readFileSync(CopyPath, "utf-8");
  }
  if (fs.existsSync(FastPath)) {
    const value = require(FastPath)();
    return `${value}`;
  }

  return `${Date.now()}`;
};

module.exports = function () {
  const contents = getLocalFastValue();
  insertContent(contents);
};
