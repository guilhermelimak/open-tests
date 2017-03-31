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
  },

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-tests:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    const editor = atom.workspace.getActivePaneItem()
    const filePath = editor.buffer.file.path
    const index = filePath.lastIndexOf('.')
    const ext = filePath.substring(index)
    const fileWithoutExt = filePath.substring(0,index)

    const testPath = fileWithoutExt + '.spec' + ext

    const shouldCreate = atom.config.get('open-tests.shouldCreateFile')

    if (!fs.existsSync(path) && !shouldCreate) {
      atom.notifications.addError('File not found')
      return
    }

    atom.open({ pathsToOpen: testPath })
  }
};
