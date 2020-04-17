const vscode = require("vscode");
const RelativePathHandler = require("./handler/RelativePath");
const WebpackBuildHandler = require("./handler/WebpackBuild");
const ImportModule = require("./handler/ImportModule");
const requireModule = require("./handler/requireModule");
const CreateSameNameFile = require("./handler/CreateSameNameFile");
const fastInput = require("./handler/fastInput");

/**
 * activate
 */
exports.activate = function (context) {
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

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "ynw.createSameNameFile",
      CreateSameNameFile
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.importModule", ImportModule)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.requireModule", requireModule)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.fastInput", fastInput)
  );

  ////////////////////// END ///////////////////////
};

/**
 * deactivate
 */
exports.deactivate = function () {};
