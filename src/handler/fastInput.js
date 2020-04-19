const fs = require("fs");
const getLocalFile = require("../utils/getLocalFile");
const insertContent = require("../utils/insertContent");
const DefaultContent =
  "/**\n * @param {Number} name - explain\n * @return {}\n*/";

const getLocalFastValue = () => {
  const localFile = getLocalFile("ynw-copy.txt");
  const exists = fs.existsSync(localFile);
  return exists ? fs.readFileSync(localFile, "utf-8") : DefaultContent;
};

module.exports = function () {
  const contents = getLocalFastValue();
  insertContent(contents);
};
