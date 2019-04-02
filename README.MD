## Why work on this is paused

After exploring this idea for a while I now believe that the benefits of immutability-by-default do not outweigh the challanges introduced by modifying a lowlevel aspect of JavaScript.

For example, it is currently not possible to tell apart the native, mutating `Array.prototype.push()` method from custom, non-mutating methods using the same name. (Such as [Ramda](https://ramdajs.com/)'s `R.push()`.)

Disabling all mutation also poses issues for common & relatively safe patterns. Let's take a peek at React's prop-types:

```jsx
const ReactComponent = ({ someText }) => <p>{someText}</p>

// A mutation 👇 ╰(　´◔　ω　◔ `)╯
ReactComponent.propTypes = {
  someText: PropTypes.string.isRequired
}
```

If you're looking for a static-analysis based solution to enforce immutability I recommend you instead take a look at TypeScript. It's `readonly` property allows you to build a powerful `DeepReadonly` interface: https://stackoverflow.com/a/49670389.

---

# ⚠️ Unstable, unfinished

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

|                                                                                                                   | Code editor annotations |      No runtime .      | Supports nested properties |
| ----------------------------------------------------------------------------------------------------------------- | :---------------------: | :--------------------: | :------------------------: |
| eslint-plugin-readonly                                                                                            |           ✅            |           ✅           |             ✅             |
| [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) |           ❌            |           ✅           |    ❌ (requires helper)    |
| [Immutable.js](https://facebook.github.io/immutable-js/)                                                          |           ❌            | ❌ (~17kb bundle size) |             ✅             |

Note that Immutable.js offers the benefit of [structural sharing](https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2) that can offer performance benefits for objects.

## When not to use eslint-plugin-readonly

### You require a strong degree of safety.

A linting rule should not be used to gurantee full safety. It merely provides hints for what's considered a best practice in the codebase. For critical cases consider using [Immutable.js](https://facebook.github.io/immutable-js/) or [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

### You're already using TypeScript.

You can build a simple `DeepReadonly` interface that will work with nested objects and arrays. See: https://stackoverflow.com/a/49670389.
