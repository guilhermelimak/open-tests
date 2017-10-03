'use babel'

const { CompositeDisposable } = require('atom')
const fm = require('./file-manager')
const config = require('./config')

export default {
  subscriptions: null,
  config,

  activate() {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-tests:open': this.open,
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  open() {
    const shouldCreate = atom.config.get('open-tests.shouldCreateFile')
    const testExtension = atom.config.get('open-tests.testExtension')

    const path = atom.workspace.getActivePaneItem().buffer.file.path

    const file = fm.isTestFile(path, testExtension)
      ? fm.getFilePath(path, testExtension)
      : fm.getTestPath(path, testExtension)

    fm.openFile(file, shouldCreate, atom)
  },
}
