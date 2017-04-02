module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import",
    "jest"
  ],
  "rules": {
    "semi": [2, "never"],
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "global-require": "off",
  },
  "env": {
    "jest/globals": true
  },
  "globals": {
    "atom": true,
  }
};
