const replace = require("../utils/replace");
const getSelection = require("../utils/getSelection");

module.exports = function() {
  const selection = getSelection();
  if (!selection) {
    return;
  }

  const source = selection.split("_");
  const constantName = source.map(it => it.toUpperCase()).join("_");
  const creatorName = source
    .map(item => {
      const strArr = item.split("");
      strArr[0] = strArr[0].toUpperCase();
      return strArr.join("");
    })
    .join("");

  const content =
    `export const ${constantName} = "${constantName}"\n` +
    `export const dispatch${creatorName} = createAction(${constantName})\n`;

  replace(content);
};
