const { window } = require("vscode");
const output = window.createOutputChannel("YNW");
module.exports = message => output.appendLine(message);
