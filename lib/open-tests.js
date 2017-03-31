'use babel';

import { CompositeDisposable } from 'atom';
import fs from 'fs';

export default {
  modalPanel: null,
  subscriptions: null,

  config: {
    shouldCreateFile: {
      type: 'boolean',
      default: true,
    },
    testExtension: {
      type: 'string',
      default: '.spec',
    },
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-tests:open': () => this.open()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  open() {
    const testExtension = atom.config.get('open-tests.testExtension')
    const shouldCreate = atom.config.get('open-tests.shouldCreateFile')

    const filePath = atom.workspace.getActivePaneItem().buffer.file.path

    const index = filePath.lastIndexOf('.')
    const fileExtension = filePath.substring(index)
    const fileWithoutExt = filePath.substring(0,index)

    const testPath = fileWithoutExt + testExtension + fileExtension

    if (!fs.existsSync(path) && !shouldCreate) {
      atom.notifications.addError('File not found')
      return
    }

    atom.open({ pathsToOpen: testPath })
  }
};
