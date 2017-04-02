'use babel';

import { CompositeDisposable } from 'atom';
import fs from 'fs';
import config from './config'

export default {
  modalPanel: null,
  subscriptions: null,
  config,


  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-tests:open': () => this.open()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  getTestPath() {
    const testExtension = atom.config.get('open-tests.testExtension')
    const filePath = atom.workspace.getActivePaneItem().buffer.file.path

    const index = filePath.lastIndexOf('.')
    const fileExtension = filePath.substring(index)
    const fileWithoutExt = filePath.substring(0,index)

    return (fileWithoutExt + testExtension + fileExtension)
  },

  open() {
    const shouldCreate = atom.config.get('open-tests.shouldCreateFile')

    const testPath = this.getTestPath()

    if (!fs.existsSync(path) && !shouldCreate) {
      atom.notifications.addError('File not found')
      return
    }

    atom.open({ pathsToOpen: testPath })
  }
};
