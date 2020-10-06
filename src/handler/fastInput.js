const fs = require("fs");
const getLocalFile = require("../utils/getLocalFile");
const insertContent = require("../utils/insertContent");

const getLocalFastValue = () => {
  const CopyPath = getLocalFile("ynw-copy.txt");
  const FastPath = getLocalFile("ynw-fast.js");

  // copy
  if (fs.existsSync(CopyPath)) {
    return fs.readFileSync(CopyPath, "utf-8");
  }
  // Dynamic content
  if (fs.existsSync(FastPath)) {
    const value = require(FastPath)();
    return `${value}`;
  }
  // Default
  return `${Date.now()}`;
};

module.exports = function () {
  const contents = getLocalFastValue();
  insertContent(contents);
};
