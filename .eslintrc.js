module.exports = {
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest-dom/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    quotes: ['error', 'single']
  }
}
