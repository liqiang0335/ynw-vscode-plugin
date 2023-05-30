const getRalativeInfo = require("../utils/getRalativeInfo");
const insertContent = require("../utils/insertContent");
const _ = require("lodash");

/**
 * 规则和处理函数
 * @param {RegExp} reg 正则表达式,匹配文件名
 * @param {Function} handler({relativePath, fullName, baseName}) 处理函数
 */
const RegExpTable = [
  {
    reg: /\w+\.(service|controller|module|schema|middleware|exception|decorator|filter|pipe)/,
    handler: ({ baseName, relativePath, fullName }) => {
      const name = _.capitalize(baseName);
      const type = _.capitalize(fullName.match(/\w+$/)[0]);
      return `import { ${name}${type} } from "${relativePath}"`;
    },
  },
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

  const regMatch = RegExpTable.find((item) => item.reg.test(fullName));

  const content = regMatch ? regMatch.handler(info) + ";\n" : `import ${baseName} from "${relativePath}";\n`;

  insertContent(content);
};
