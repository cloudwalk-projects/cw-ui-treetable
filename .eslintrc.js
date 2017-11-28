// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // extends: 'airbnb-base',
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html','import'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // 自定义规则
  rules: {
    // 分号结尾
    semi: ['error', 'always'],
    // 函数前空格
    'space-before-function-paren': 0,
    // 括号样式
    'brace-style': 0,
    // 未使用的变量
    'no-unused-vars': 0,
    // 空白的注释
    'spaced-comment': 0,
    // === 代替 ==
    'eqeqeq': 0,
    // var 只允许定义一个变量
    'one-var': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'linebreak-style': 0,
    'no-param-reassign': 0,
    // allow optionalDependencies
    //'import/no-extraneous-dependencies': [
    //  'error',
    //  {
    //    optionalDependencies: ['test/unit/index.js']
    //  }
    //],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
