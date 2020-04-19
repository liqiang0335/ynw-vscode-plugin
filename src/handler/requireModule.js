const getRalativeInfo = require("../utils/getRalativeInfo");
const insertContent = require("../utils/insertContent");

const RegExpTable = [
  {
    reg: /s\.js$/,
    handler: ({ relativePath }) => `const {  } = require("${relativePath}")`,
  },
];

module.exports = function (URI) {
  const info = getRalativeInfo(URI.fsPath);
  if (!info) return;

  const { fullName, baseName, relativePath } = info;
  const regMatch = RegExpTable.find(item => item.reg.test(fullName));

  const content = regMatch
    ? regMatch.handler(info) + ";\n"
    : `const ${baseName} = require("${relativePath}")\n`;

  insertContent(content);
};
