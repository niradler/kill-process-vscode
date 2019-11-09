// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const mp = require("manage-ports");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "kill-process" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.killPort",
    function() {
      try {
        vscode.window
          .showInputBox()
          .then(port => {
            if (!port) throw new Error("Please provide port.");
            mp.killProcessByPort(port)
              .then(status => {
                if (status) {
                  vscode.window.showInformationMessage(
                    `Successfully killed process listening to port ${port}.`
                  );
                } else {
                  throw new Error("Process not found.");
                }
              })
              .catch(e => {
                throw e;
              });
          })
          .catch(e => {
            throw e;
          });
      } catch (error) {
        vscode.window.showErrorMessage(error.message);
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
