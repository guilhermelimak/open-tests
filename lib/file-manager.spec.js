import FileManager from './file-manager'

jest.mock('atom', () => ({
  open: jest.fn(),
  notifications: { addError: jest.fn() },
}))

jest.mock('fs', () => ({
  existsSync: jest.fn(() => false),
}))

let testExtension
let testPath
let filePath
let fs
let atom

describe('File manager', () => {
  beforeEach(() => {
    fs = require('fs')
    atom = require('atom')
    testExtension = '.spec'
    testPath = '/home/test/file.spec.js'
    filePath = '/home/test/file.js'

    fs.existsSync.mockClear()
  })

  describe('isTestFile', () => {
    it('should return true if the file have text extension', () => {
      expect(FileManager.isTestFile(testPath, testExtension)).toBe(true)
    })
  })

  describe('getTestPath', () => {
    it('should add the text extension to file path', () => {
      expect(FileManager.getTestPath(filePath, testExtension)).toBe(testPath)
    })
  })

  describe('getFilePath', () => {
    it('should get the file path from the test path', () => {
      expect(FileManager.getFilePath(testPath, testExtension)).toBe(filePath)
    })
  })

  describe('openFile', () => {
    afterEach(() => {
      fs.existsSync.mockClear()
      atom.open.mockClear()
    })

    it('should call fs.existsSync with path', () => {
      fs.existsSync = jest.fn(() => true)
      FileManager.openFile(filePath, true, atom)

      expect(fs.existsSync).toHaveBeenCalledWith(filePath)
    })

    it('should open file if shouldCreate is true and file exist', () => {
      fs.existsSync = jest.fn(() => true)
      FileManager.openFile(filePath, true, atom)

      expect(atom.open).toHaveBeenCalledWith({ pathsToOpen: filePath })
    })

    it('should open file if shouldCreate is true and file dont exist', () => {
      fs.existsSync = jest.fn(() => false)
      FileManager.openFile(filePath, true, atom)

      expect(atom.open).toHaveBeenCalledWith({ pathsToOpen: filePath })
    })

    it('should not open file if shouldCreate is false and file dont exist', () => {
      fs.existsSync = jest.fn(() => false)
      FileManager.openFile(filePath, false, atom)

      expect(atom.open).not.toHaveBeenCalled()
      expect(atom.notifications.addError).toHaveBeenCalledWith('File not found')
    })

    it('should open file if shouldCreate is false and file exist', () => {
      fs.existsSync = jest.fn(() => true)
      FileManager.openFile(filePath, false, atom)

      expect(atom.open).toHaveBeenCalledWith({ pathsToOpen: filePath })
    })
  })
})
