const getRalativeInfo = require("../utils/getRalativeInfo");
const insertContent = require("../utils/insertContent");

const RegExpTable = [
  {
    reg: /api/,
    handler: ({ relativePath }) => `import * as api from "${relativePath}"`,
  },
  { reg: /\.css$/, handler: ({ relativePath }) => `import "${relativePath}"` },
  {
    reg: /\.scss$/,
    handler: ({ relativePath }) => `import styles from "${relativePath}"`,
  },
];

module.exports = function (URI) {
  const info = getRalativeInfo(URI.fsPath);
  if (!info) return;

  const { fullName, baseName, relativePath } = info;
  const regMatch = RegExpTable.find(item => item.reg.test(fullName));

  const content = regMatch
    ? regMatch.handler(info) + ";\n"
    : `import ${baseName} from "${relativePath}";\n`;

  insertContent(content);
};
