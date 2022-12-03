type Rule = {
    id: string
    text: string
    isDone: boolean
    regex: RegExp | ((input: string) => number)
  }
  type ValidatedResponse = {
    isRuleCheckPassed: boolean
    ruleList: Rule[]
    toValidate: string
  }
  