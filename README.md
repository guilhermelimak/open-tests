# open-tests

[![Build Status](https://travis-ci.org/guilhermelimak/open-tests.svg?branch=master)](https://travis-ci.org/guilhermelimak/open-tests)

A simple atom package to open the tests related to the current file or the file related to the current test.

Example:
If the current open file is `~/feature.js`, the open command will open the `~/feature.spec.js` file and if you keep pressing it you can keep going back and forth between the file and the tests.

The `.spec` part is the `Test extension` option avaliable in this package settings.

The `shouldCreateFile` option define the behavior when the file been opened doesn't exist. If false it will show a toast notification saying 'File not found'.
