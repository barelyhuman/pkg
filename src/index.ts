/**
 * @param rules
 * @type Rule
 * @returns validator
 * @description Takes rule set as parameter and returns validator function
 */
 export function createValidator(rules: Rule[]) {
  let ruleList = rules
  function checkCondition(testcase, token) {
    if (token.match(testcase) === null) {
      return false
    }
    return true
  }

  function refreshRules(isDone: boolean, rules: Rule) {
    ruleList = ruleList.map(rule =>
      rule.id === rules.id ? { ...rule, isDone: isDone } : rule
    )
  }

  /**
   * @param toValidate
   * @returns {ValidatedResponse}
   */
  const validator = (toValidate: string) => {
    let count = 0
    if (toValidate !== null && toValidate.length > 0) {
      ruleList.forEach((rule, key) => {
        if (typeof rule.regex !== 'function') {
          if (checkCondition(rule.regex, toValidate)) {
            refreshRules(true, rule)
            count += 1
          } else {
            refreshRules(false, rule)
            count = 0
          }
        } else {
          if (rule.regex(toValidate) >= 8) {
            refreshRules(true, rule)
            count += 1
          } else {
            refreshRules(false, rule)
            count = 0
          }
        }
      })
    }
    if (count === rules.length) {
      return { isRuleCheckPassed: true, ruleList, toValidate }
    } else {
      return { isRuleCheckPassed: false, ruleList, toValidate }
    }
  }
  return { validator }
}

const { validator } = createValidator([])
validator('')
