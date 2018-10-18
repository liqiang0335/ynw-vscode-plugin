const vscode = require("vscode");
const RelativePathHandler = require("./handler/RelativePath");
const WebpackBuildHandler = require("./handler/WebpackBuild");

/**
 * activate
 */
exports.activate = function(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.relavePath", RelativePathHandler)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.webpackBuild.dev", uri =>
      WebpackBuildHandler(uri, "dev")
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.webpackBuild.hot", uri =>
      WebpackBuildHandler(uri, "hot")
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.webpackBuild.pro", uri =>
      WebpackBuildHandler(uri, "pro")
    )
  );
};

/**
 * deactivate
 */
exports.deactivate = function() {};
