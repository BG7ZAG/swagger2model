/*
 * @Descripttion:
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-26
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-26
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue', '@typescript-eslint', 'eslint-plugin-simple-import-sort'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',

    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'simple-import-sort/imports': 'error', //排序
    'simple-import-sort/exports': 'error' //排序
  }
}
