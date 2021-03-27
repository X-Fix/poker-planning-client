module.exports = {
  extends: ['airbnb-typescript', 'eslint-config-prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-props-no-spreading': [
      true,
      {
        exceptions: ['svg'],
      },
    ],
  },
};
