const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const tmp = require('tmp')
const cp = require('child_process')

function formatDocument(document) {
    if (document.languageId !== 'php') {
        return
    }

    let toolPath = getConfig('toolPath')
    let phpCmd = getConfig('phpCmd')
    let filename = document.fileName
    let args = []

    let opts = {
        cwd: path.dirname(filename),
        shell: true,
    }

    if (getConfig('ignoreEnv')) {
        opts.env = { PHP_CS_FIXER_IGNORE_ENV: 1 }
    }

    if (getFixerFromComposer()) {
        toolPath = getFixerFromComposer()
    }

    if (!toolPath) {
        toolPath = path.resolve(__dirname, 'php-cs-fixer')
    }

    if (!phpCmd) {
        phpCmd = 'php'
    }

    args.push(toolPath)
    args.push('fix')

    if (!getConfig('useCache')) {
        args.push('--using-cache=no')
    }

    if (getConfig('allowRisky')) {
        args.push('--allow-risky=yes')
    }

    let config = getConfig('config')

    if (getPreset()) {
        args.push('--config=' + getPreset())
    } else if (config) {
        // Support config file with relative path
        if (!path.isAbsolute(config)) {
            let currentPath = opts.cwd
            let triedPaths = [currentPath]
            while (!fs.existsSync(currentPath + path.sep + config)) {
                let lastPath = currentPath
                currentPath = path.dirname(currentPath)
                if (lastPath == currentPath) {
                    vscode.window.showErrorMessage(`Unable to find ${config} file in ${triedPaths.join(', ')}`)
                    return
                } else {
                    triedPaths.push(currentPath)
                }
            }
            config = currentPath + path.sep + config
        }

        args.push('--config=' + config)
    } else if (projectConfigFile()) {
        args.push('--config=' + projectConfigFile())
    } else {
        let rules = getConfig('rules')
        if (rules) {
            args.push('--rules=' + rules)
        }
    }

    const tmpFile = tmp.fileSync()
    fs.writeFileSync(tmpFile.name, document.getText(null))

    return new Promise(function (resolve) {
        cp.execFile(phpCmd, [...args, tmpFile.name], opts, function (err) {
            if (err) {
                tmpFile.removeCallback()

                if (err.code === 'ENOENT') {
                    vscode.window.showErrorMessage('Unable to find the php-cs-fixer tool.')
                    throw err
                }

                vscode.window.showErrorMessage(
                    'There was an error while running php-cs-fixer. Check the Developer Tools console for more information.'
                )
                throw err
            }

            const text = fs.readFileSync(tmpFile.name, 'utf-8')
            tmpFile.removeCallback()

            resolve(text)
        })
    })
}

function getProjectRoot() {
    return vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri).uri.fsPath
}

function getFixerFromComposer() {
    let composerPath = getProjectRoot() + path.sep + 'vendor' + path.sep + 'bin' + path.sep + 'php-cs-fixer'

    if (fs.existsSync(composerPath)) {
        return composerPath
    }

    return null
}

function projectConfigFile() {
    if (fs.existsSync(getProjectRoot() + path.sep + '.php-cs-fixer.php')) {
        return getProjectRoot() + path.sep + '.php-cs-fixer.php'
    }

    if (fs.existsSync(getProjectRoot() + path.sep + '.php-cs-fixer.dist.php')) {
        return getProjectRoot() + path.sep + '.php-cs-fixer.dist.php'
    }

    return null
}

function getPreset() {
    const preset = getConfig('preset')

    if (['laravel', 'per', 'psr12', 'symfony'].includes(preset.toLowerCase())) {
        return path.resolve(__dirname, `presets/${preset.toLowerCase()}.php`)
    } else if (preset) {
        vscode.window.showErrorMessage(`Unable to find preset: ${preset}.`)
    }
}

function registerDocumentProvider(document, options) {
    return new Promise(function (resolve, reject) {
        formatDocument(document)
            .then(function (text) {
                const range = new vscode.Range(
                    new vscode.Position(0, 0),
                    document.lineAt(document.lineCount - 1).range.end
                )
                resolve([new vscode.TextEdit(range, text)])
            })
            .catch(function (err) {
                reject()
            })
    })
}

function getConfig(key) {
    return vscode.workspace.getConfiguration('php-cs-fixer').get(key)
}

function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand('php-cs-fixer.fix', function (textEditor) {
            vscode.commands.executeCommand('editor.action.formatDocument')
        })
    )

    context.subscriptions.push(
        vscode.workspace.onWillSaveTextDocument(function (event) {
            if (event.document.languageId === 'php' && getConfig('fixOnSave')) {
                event.waitUntil(vscode.commands.executeCommand('editor.action.formatDocument'))
            }
        })
    )

    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('php', {
            provideDocumentFormattingEdits: function (document, options) {
                return registerDocumentProvider(document, options)
            },
        })
    )
}

exports.activate = activate

function deactivate() {}

exports.deactivate = deactivate
