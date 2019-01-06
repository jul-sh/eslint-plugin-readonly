# ⚠️ Work in progress

```js
const fooObj = { bar: 3 }
const fooArray = ['bar']

/* Not allowed: */
fooObj['bar'] = 4
fooObj.bar = 4
fooObj.bar++
delete fooObj.bar
fooObj.baz = 2
Object.assign(fooObj, { baz: 2 })
Object.defineProperty(fooObj, 'baz', 2)
Object.defineProperties(fooObj, { baz: 2, qux: 5 })
Object.setPrototypeOf(fooObj, null)
fooArray.copyWithin(a)
fooArray.pop()
fooArray.push('baz')
fooArray.reverse()
fooArray.shift()
fooArray.sort()
fooArray.splice(0, 1, 'baz')
fooArray.unshift('baz')
```

## Comparison

|                                                                                                                   | Code editor annotations |    No runtime cost     | Supports nested properties |
| ----------------------------------------------------------------------------------------------------------------- | :---------------------: | :--------------------: | :------------------------: |
| eslint-readonly                                                                                                   |           ✅            |           ✅           |             ✅             |
| [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) |           ❌            |           ✅           |      🔶 (with helper)      |
| [Immutable.js](https://facebook.github.io/immutable-js/)                                                          |           ❌            | ❌ (~17kb bundle size) |             ✅             |

## When not to use eslint-plugin-readonly

### You require a strong degree of safety.

A linting can should not be used to gurantee full safety. It merely provides hints for what's considered a best practice in the codebase. For critical cases consider using [Immutable.js](https://facebook.github.io/immutable-js/) or [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

### You're already using TypeScript.

You can build a simple `DeepReadonly` interface that will work with nested objects and arrays. See: https://stackoverflow.com/a/49670389.
