import test from 'ava'
import avaRuleTester from 'eslint-ava-rule-tester'
import rule from '../rules/no-mutating-assign'

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
})

const error = {
  ruleId: 'no-mutating-assign',
  message: 'Unallowed use of mutating `Object.assign` on constant'
}

ruleTester.run('no-mutating-assign', rule, {
  valid: [
    'foo.bar(a, b);',
    'foo.assign(a, b);',
    'Object.foo(a, b);',
    'Object.assign({});',
    'Object.assign({}, b);',
    'Object.assign(Object.create(null));',
    'Object.assign(Object.create(null), b);',
    'Object.assign({}, b, c, d, e);',
    'Object.assign({foo: 1, bar: 2}, b);',
    'Object.assign([1, 2], b);',
    'Object.assign(() => {}, a);',
    'Object.assign(function() {}, a);',
    'Object.assign(function foo() {}, a);',
    'let a = {}; Object.assign(a);',
    'let a = {}; Object.assign(a, b);',
    'let a = {}; Object.assign(a, b, c, d, e);',
    'let a = {}; Object.assign(a, b);',
    'let fn = () => {}; Object.assign(fn, b);',
    'let fn = function() {}; Object.assign(fn, b);'
  ],
  invalid: [
    {
      code: 'const a = {}; Object.assign(a);',
      errors: [error]
    },
    {
      code: 'const a = {}; Object.assign(a, b);',
      errors: [error]
    },
    {
      code: 'const a = {}; Object.assign(a, b, c, d, e);',
      errors: [error]
    },
    {
      code: 'const a = {}; Object.assign(a, b);',
      errors: [error]
    },
    {
      code: 'const fn = () => {}; Object.assign(fn, b);',
      errors: [error]
    },
    {
      code: 'const fn = function() {}; Object.assign(fn, b);',
      errors: [error]
    }
  ]
})
