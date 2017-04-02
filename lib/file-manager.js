const fs = require('fs')

module.exports = {
  getTestPath(filePath, testExtension) {
    const index = filePath.lastIndexOf('.')
    const fileExtension = filePath.substring(index)
    const fileWithoutExt = filePath.substring(0, index)

    return (fileWithoutExt + testExtension + fileExtension)
  },

  getFilePath(testPath, testExtension) {
    return testPath.replace(testExtension, '')
  },

  isTestFile(path, testExtension) {
    return path.includes(testExtension)
  },

  openFile(path, shouldCreate, atom) {
    if (!fs.existsSync(path) && !shouldCreate) {
      atom.notifications.addError('File not found')
      return
    }

    atom.open({ pathsToOpen: path })
  },
}
