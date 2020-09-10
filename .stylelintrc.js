module.exports = {
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-prettier',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'prettier/prettier': true,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
