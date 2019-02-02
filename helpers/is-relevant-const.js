const getVariableByName = require('./get-variable-by-name')

function isRelevantConst(scope, variable) {
  while (variable.type === 'MemberExpression') {
    variable = variable.object
  }

  const variableInScope = getVariableByName(scope, variable.name)

  return (
    variableInScope &&
    variableInScope.defs.filter(def => def.kind === 'const').length > 0
  )
}

module.exports = isRelevantConst
