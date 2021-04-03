module.exports = {
  extends: [
    'airbnb-typescript',
    'eslint-config-prettier',
    'plugin:testcafe/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['testcafe'],
  rules: {
    'react/jsx-props-no-spreading': [
      true,
      {
        exceptions: ['svg'],
      },
    ],
  },
};
