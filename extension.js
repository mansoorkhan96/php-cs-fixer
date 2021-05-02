const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const tmp = require('tmp');
const cp = require('child_process');

function formatDocument(document) {
    if (document.languageId !== 'php') {
        return;
    }

    let toolPath = getConfig('toolPath');
    let filename = document.fileName;
    let args = [];
    let opts = { cwd: path.dirname(filename) };

    if (!toolPath) {
        toolPath = vscode.extensions.getExtension('mansoorkhan96.php-cs-fixer').extensionPath + '/php-cs-fixer';
    }

    args.push(toolPath);
    args.push('fix');

    if (!getConfig('useCache')) {
        args.push('--using-cache=no');
    }

    if (getConfig('allowRisky')) {
        args.push('--allow-risky=yes');
    }

    let config = getConfig('config');
    if (config) {
        // Support config file with relative path
        if (!path.isAbsolute(config)) {
            let currentPath = opts.cwd;
            let triedPaths = [currentPath];
            while (!fs.existsSync(currentPath + path.sep + config)) {
                let lastPath = currentPath;
                currentPath = path.dirname(currentPath);
                if (lastPath == currentPath) {
                    vscode.window.showErrorMessage(`Unable to find ${config} file in ${triedPaths.join(", ")}`);
                    return;
                } else {
                    triedPaths.push(currentPath);
                }
            }
            config = currentPath + path.sep + config;
        }

        args.push('--config=' + config);
    } else {
        let rules = getConfig('rules');
        if (rules) {
            args.push('--rules=' + rules);
        }
    }

    const tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, document.getText(null));

    // console.log('php-cs-fixer temporary file: ' + tmpFile.name);

    return new Promise(function(resolve) {
        cp.execFile('php', [...args, tmpFile.name], opts, function (err) {
            if (err) {
                tmpFile.removeCallback();

                if (err.code === 'ENOENT') {
                    vscode.window.showErrorMessage('Unable to find the php-cs-fixer tool.');
                    throw err;
                }

                vscode.window.showErrorMessage('There was an error while running php-cs-fixer. Check the Developer Tools console for more information.');
                throw err;
            }

            const text = fs.readFileSync(tmpFile.name, 'utf-8');
            tmpFile.removeCallback();

            resolve(text);
        });
    });
}

function registerDocumentProvider(document, options) {
    return new Promise(function(resolve, reject) {
        formatDocument(document).then(function(text) {
            const range = new vscode.Range(new vscode.Position(0, 0), document.lineAt(document.lineCount - 1).range.end);
            resolve([new vscode.TextEdit(range, text)]);
        }).catch(function(err) {
            reject();
        });
    });
}

function getConfig(key) {
    return vscode.workspace.getConfiguration('php-cs-fixer').get(key);
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('php-cs-fixer.fix', function (textEditor) {
        vscode.commands.executeCommand('editor.action.formatDocument');
    }));

    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(function(event) {
        if (event.document.languageId === 'php' && getConfig('fixOnSave') && vscode.workspace.getConfiguration('editor', null).get('formatOnSave') == false) {
            event.waitUntil(vscode.commands.executeCommand('editor.action.formatDocument'));
        }
    }));

    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('php', {
        provideDocumentFormattingEdits: function(document, options) {
            return registerDocumentProvider(document, options);
        }
    }));
}

exports.activate = activate;

function deactivate() {
}

exports.deactivate = deactivate;
