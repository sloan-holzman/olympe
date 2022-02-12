module.exports = {
  "extends": "airbnb-base",
  "rules":{
    "linebreak-style": 0,
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "max-len": ["warning", { "ignoreComments": true }]
  },
  "overrides": [
      {
        "files": ["*.spec.js"],
        "rules": {
            "no-undef": "off",
        }
      }
  ]
};
