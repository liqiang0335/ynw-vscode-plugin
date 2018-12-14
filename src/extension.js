const vscode = require("vscode");
const RelativePathHandler = require("./handler/RelativePath");
const WebpackBuildHandler = require("./handler/WebpackBuild");
const ImportModule = require("./handler/ImportModule");
const CreateSameNameFile = require("./handler/CreateSameNameFile");
const FileFactory = require("./handler/FileFactory");
const CreateJsonFile = require("./handler/CreateJsonFile");
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

  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.importModule", ImportModule)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.fileFactory", FileFactory)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "ynw.createSameNameFile",
      CreateSameNameFile
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("ynw.createJson", CreateJsonFile)
  );

  ////////////////////// END ///////////////////////
};

/**
 * deactivate
 */
exports.deactivate = function() {};
