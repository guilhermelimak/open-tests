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
      'open-tests:open-test': this.openTest,
      'open-tests:open-template': this.openTemplate,
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  openTest() {
    const shouldCreate = atom.config.get('open-tests.shouldCreateFile')
    const path = atom.workspace.getActivePaneItem().buffer.file.path
    const extension = atom.config.get('open-tests.testExtension')

    const file = fm.isFileType(path, extension)
      ? fm.getFilePath(path, extension)
      : fm.getTestPath(path, extension)

    fm.openFile(file, shouldCreate, atom)
  },

  openTemplate() {
    const shouldCreate = atom.config.get('open-tests.shouldCreateFile')
    const path = atom.workspace.getActivePaneItem().buffer.file.path
    const extension = atom.config.get('open-tests.templateExtension')

    const file = fm.isFileType(path, extension)
      ? fm.getFilePath(path, extension)
      : fm.getTemplatePath(path, extension)

    fm.openFile(file, shouldCreate, atom)
  },
}
