const Constant = {}

Constant.install = function (Vue, options) {
  /**
   * 根据枚举值获取描述
   * @param {*} constantName   枚举名
   * @param {*} value          枚举值
   * @returns
   */
  const constantInfo = options || {}

  const Enum = {}
  Enum.getLabelByValue = function (constantName, value) {
    if (!constantInfo.hasOwnProperty(constantName)) {
      return ''
    }
    let item = constantInfo[constantName].find(item => item.value == value)
    return item.label
  }
  /**
   * 根据枚举名获取对应的描述键值对 [{value:label},{value2:label2}]
   * @param {*} constantName 枚举名
   * @returns
   */
  Enum.getValueLabelList = function (constantName) {
    if (!constantInfo.hasOwnProperty(constantName)) {
      return []
    }
    return constantInfo[constantName]
  }

  /**
   * 根据枚举名获取对应的 value 描述键值对 {value:label}
   * @param {*} constantName 枚举名
   * @returns
   */
  Enum.getValueLabel = function (constantName) {
    if (!constantInfo.hasOwnProperty(constantName)) {
      return {}
    }
    let result = {}
    let constantItem = constantInfo[constantName]
    constantItem.forEach(item => {
      result[item.value] = item.label
    })
    return result
  }
  Vue.prototype.$constant = Enum
}

export default Constant