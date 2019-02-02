// The `getVariableByName` is taken from eslint/lib/ast-utils.js
function getVariableByName(initScope, name) {
  var scope = initScope

  while (scope) {
    var variable = scope.set.get(name)

    if (variable) {
      return variable
    }

    scope = scope.upper
  }

  return null
}

module.exports = getVariableByName
