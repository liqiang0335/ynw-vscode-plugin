const replace = require("../utils/replace");
const getSelection = require("../utils/getSelection");

module.exports = function() {
  const selection = getSelection();
  if (!selection) {
    return;
  }
  const source = selection.split("_");
  const constantName = source.map(it => it.toUpperCase()).join("_");
  const content = `export const ${constantName} = "${constantName}"\n`;
  replace(content);
};
