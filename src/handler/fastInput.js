const fs = require("fs");
const getLocalFile = require("../utils/getLocalFile");
const insertContent = require("../utils/insertContent");

const getLocalFastValue = () => {
  const CopyPath = getLocalFile("yy-copy.txt");
  const FastPath = getLocalFile("yy-fast.js");

  // copy
  if (fs.existsSync(CopyPath)) {
    return fs.readFileSync(CopyPath, "utf-8");
  }

  // dynamic
  if (fs.existsSync(FastPath)) {
    const value = require(FastPath)();
    return `${value}`;
  }

  // default
  return `${Date.now()}`;
};

module.exports = function () {
  const contents = getLocalFastValue();
  insertContent(contents);
};
