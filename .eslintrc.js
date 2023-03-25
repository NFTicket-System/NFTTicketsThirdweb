module.exports = {
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest-dom/recommended',
      'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    /* 'react/jsx-indent-props': ['error', 'first'], */
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } }
    ],
    quotes: ['error', 'single']
  }
}
