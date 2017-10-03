const fs = require('fs')

module.exports = {
  getTestPath(filePath, testExtension) {
    const index = filePath.lastIndexOf('.')
    const fileExtension = filePath.substring(index)
    const fileWithoutExt = filePath.substring(0, index)

    return (fileWithoutExt + testExtension + fileExtension)
  },

  getTemplatePath(filePath, templateExtension) {
    const index = filePath.lastIndexOf('.')
    const fileWithoutExt = filePath.substring(0, index)

    return (fileWithoutExt + templateExtension)
  },

  getFilePath(testPath, testExtension) {
    return testPath.replace(testExtension, '')
  },

  isFileType(path, extension) {
    return path.includes(extension)
  },

  openFile(pathsToOpen, shouldCreate, atom) {
    if (!fs.existsSync(pathsToOpen) && !shouldCreate) {
      atom.notifications.addError('File not found')
      return
    }

    atom.open({ pathsToOpen })
  },
}
