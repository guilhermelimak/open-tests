module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import",
        "jest"
    ],
    "rules": {
      "semi": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "import/extensions": "off"
    },
    "env": {
      "jest/globals": true
    },
    "globals": {
      "atom": true,
    }
};
