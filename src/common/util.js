/* eslint-disable */
import _ from 'lodash'

export default {
  install(Vue, options) {
    Vue.prototype.copyProperties = (target, properties) => {
      const src = {}
      if (properties) {
        for (const p of properties) {
          src[p] = target[p]
        }
      } else {
        for (const prop in target) {
          if (target.hasOwnProperty(prop)) {
            src[prop] = target[prop]
          }
        }
      }
      return src
    }
    Vue.prototype.copyWithIngorePro = (src, target, ignoreProperties = []) => {
      for (const p in target) {
        if (target.hasOwnProperty(p) && ignoreProperties.indexOf(p) < 0 && src[p]) {
          target[p] = src[p]
        }
      }
      return target
    }
    Vue.prototype.clearProperties = (target) => {
      if (typeof target !== 'object') {
        return
      }
      for (const prop in target) {
        if (target.hasOwnProperty(prop)) {
          if (target[prop] instanceof Array) {
            target[prop] = []
          } else if (target[prop] instanceof Object) {
            target[prop] = {}
          } else {
            target[prop] = ''
          }
        }
      }
    }
  },
  /**
   * 从源对象向目标对象不覆盖地赋值，两个对象应具有大多相同的属性
   * @author shenwenxiao
   * @param {Object} leftObject - 目标对象
   * @param {Object} rightObject - 源对象
   * @param {Boolean} isDeepClone - 是否深拷贝，默认为浅拷贝
   * @return {Object} - 目标对象的引用
   */
  assignment: (leftObject, rightObject, isDeepClone = false) => {
    const tinyVlBlk = targetParam => targetParam === '' || targetParam === null || targetParam === undefined
    for (let rkey in rightObject) {
      // 当源的某个属性在目标中存在时，当且仅当源中的此值非空，则向目标赋值；不存在于目标的属性则直接插入源
      if (Object.hasOwnProperty.call(leftObject, rkey)) {
        if (!tinyVlBlk(rightObject[rkey])) {
          if (isDeepClone) {
            leftObject[rkey] = _.cloneDeep(rightObject[rkey])
          } else {
            leftObject[rkey] = rightObject[rkey]
          }
        }
      } else {
        if (isDeepClone) {
          leftObject[rkey] = _.cloneDeep(rightObject[rkey])
        } else {
          leftObject[rkey] = rightObject[rkey]
        }
      }
    }
    return leftObject
  },
  isIE: /msie/i.test(navigator.userAgent) || (navigator.userAgent.toLowerCase().indexOf('trident') !== -1 && navigator.userAgent.indexOf('rv') !== -1),
  /**
   * 返回一个比较某个属性的比较函数，通常用于作为Array.sort()的参数，如对数组A的b属性排序：A.sort(compareProperties('b'))
   * @author shenwenxiao
   * @param {String} properties - 对象中待比较的属性名
   * @param {Function} cFx - 符合javascript标准的比较函数，默认为减法，必须对每两个参数返回一个数字
   * @param {Boolean} ascend - 升降序，默认为升序
   * @returns {Function} - 需要返回的结果比较函数
   */
  compareProperties: (properties, cFx = (a, b) => a - b, ascend = true) => (a, b) => cFx(a[properties], b[properties]) * (ascend ? 1 : -1),
  // ie 只接受形如 'YYYY/MM/DD hh:mm:ss' 的Date构造参数
  CmbIE: timeStr => timeStr.replace(/-/gm, '/'),
  compareTime: (a, b) => this.a.isIE ? new Date(this.a.CmbIE(a)).getTime() - new Date(this.a.CmbIE(b)).getTime() : new Date(a).getTime() - new Date(b).getTime(),
  guid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  /**
   * 返回指定位数的16进制随机字符串
   * @param {Number} bits - 字符串的长度
   */
  randomStr: bits => {
    let ret = ''
    for (let index = 0; index < bits; index++) {
      ret += ((Math.random() * 16 | 0) & 0x3 | 0x8).toString(16)
    }
    return ret
  },
  /**
   * Date对象转时间字符串：YYYY-MM-DDT00:00:00.000Z
   * @author shenwenxiao
   * @param {Date} DateObj - 时间对象
   * @returns {Boolean|String} 传入非Date实例返回false，否则输出转换后的字符串
   */
  DateToStandardString: DateObj => {
    if (typeof (DateObj) !== 'object') {
      console.warn('DateToStandardString')
      return false
    }
    const year = DateObj.getFullYear()
    const month = DateObj.getMonth() < 9 ? '0' + (DateObj.getMonth() + 1) : (DateObj.getMonth() + 1)
    const day = DateObj.getDate() < 10 ? '0' + DateObj.getDate() : DateObj.getDate()
    return year + '-' + month + '-' + day + 'T00:00:00.000Z'
  },
  /**
   * vcn需要形如'20180101120000'的格式化时间字符串
   */
  DateTimeToIvsString: DateObj => {
    if (typeof (DateObj) !== 'object') {
      console.warn('DateToString')
      return ''
    }
    if (!DateObj) {
      console.warn('DateToString')
      return ''
    }
    const year = DateObj.getUTCFullYear()
    const month = DateObj.getUTCMonth() < 9 ? '0' + (DateObj.getUTCMonth() + 1) : (DateObj.getUTCMonth() + 1)
    const day = DateObj.getUTCDate() < 10 ? '0' + DateObj.getUTCDate() : DateObj.getUTCDate()
    const hour = DateObj.getUTCHours() < 10 ? '0' + DateObj.getUTCHours() : DateObj.getUTCHours()
    const minute = DateObj.getUTCMinutes() < 10 ? '0' + DateObj.getUTCMinutes() : DateObj.getUTCMinutes()
    const second = DateObj.getUTCSeconds() < 10 ? '0' + DateObj.getUTCSeconds() : DateObj.getUTCSeconds()
    return year + month + day + hour + minute + second
  },
  /**
   * Date对象转时间字符串：YYYY-MM-DD HH:MM[:SS]
   * @author shenwenxiao
   * @param {Date} DateObj - 时间对象
   * @param {Boolean} [showSEC] - 是否显示秒
   * @returns {Boolean|String} 传入非Date实例返回false，否则输出转换后的字符串
   */
  DateTimeToString: (DateObj, showSEC) => {
    if (typeof (DateObj) !== 'object') {
      console.warn('DateToString')
      return false
    }
    const year = DateObj.getFullYear()
    const month = DateObj.getMonth() < 9 ? '0' + (DateObj.getMonth() + 1) : (DateObj.getMonth() + 1)
    const day = DateObj.getDate() < 10 ? '0' + DateObj.getDate() : DateObj.getDate()
    const hour = DateObj.getHours() < 10 ? '0' + DateObj.getHours() : DateObj.getHours()
    const minute = DateObj.getMinutes() < 10 ? '0' + DateObj.getMinutes() : DateObj.getMinutes()
    const second = showSEC ? DateObj.getSeconds() < 10 ? ':0' + DateObj.getSeconds() : ':' + DateObj.getSeconds() : ''
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + second
  },
  /**
   * Date对象转日期字符串：YYYY-MM-DD
   * @author shenwenxiao
   * @param {Date} DateObj - 时间对象
   * @returns {Boolean|String} 传入非Date实例返回false，否则输出转换后的字符串
   */
  DateToString: DateObj => {
    if (typeof (DateObj) !== 'object') {
      console.warn('DateToString')
      return false
    }
    const year = DateObj.getFullYear()
    const month = DateObj.getMonth() < 9 ? '0' + (DateObj.getMonth() + 1) : (DateObj.getMonth() + 1)
    const day = DateObj.getDate() < 10 ? '0' + DateObj.getDate() : DateObj.getDate()
    return year + '-' + month + '-' + day
  },
  /**
   * 暂时放这儿
   * 
   */
  DateToMyString: DateObj => {
    if (typeof (DateObj) !== 'object') {
      console.warn('DateToString')
      return false
    }
    const year = DateObj.getFullYear()
    const month = DateObj.getMonth() < 9 ? '0' + (DateObj.getMonth() + 1) : (DateObj.getMonth() + 1)
    const day = DateObj.getDate() < 10 ? '0' + DateObj.getDate() : DateObj.getDate()
    return year + '/' + month + '/' + day
  },
  /**
   * 验证是否是数字
   * @author shenwenxiao
   * @param {any} targetParam - 验证目标
   * @param {String} warnMessage - 出错时的弹出警告内容
   * @param {Object} VueInst - 传入的VUE实例
   * @param {String} [successMessage] - 出错时的弹出警告内容
   * @returns {Boolean}
   */
  validateNAN: function (targetParam, warnMessage, VueInst, successMessage) {
    // 对于整数，浮点数返回true，对于NaN或可转成NaN的值返回false
    if (targetParam !== +targetParam) {
      VueInst.$message({
        message: warnMessage,
        type: 'error'
      })
      return false
    } else {
      if (successMessage) {
        VueInst.$message({
          message: successMessage,
          type: 'success'
        })
      }
      return true
    }
  },
  /**
   * 验证类型是否匹配
   * @author shenwenxiao
   * @param {any} targetParam - 验证目标
   * @param {String} promiseType - 目标类型
   * @param {String} warnMessage - 出错时的弹出警告内容
   * @param {Object} VueInst - 传入的VUE实例
   * @param {String} [successMessage] - 出错时的弹出警告内容
   * @returns {Boolean}
   */
  validateType: function (targetParam, promiseType, warnMessage, VueInst, successMessage) {
    if (typeof (targetParam) !== promiseType) {
      VueInst.$message({
        message: warnMessage,
        type: 'error'
      })
      return false
    } else {
      if (successMessage) {
        VueInst.$message({
          message: successMessage,
          type: 'success'
        })
      }
      return true
    }
  },
  /**
   * 验证是否是空字符串 /null /undefined
   * @author shenwenxiao
   * @param {any} targetParam - 验证目标
   * @param {String} [warnMessage] - 出错时的弹出警告内容
   * @param {Object} [VueInst] - 传入的VUE实例
   * @param {String} [successMessage] - 出错时的弹出警告内容
   * @returns {Boolean}
   */
  validateBlank: function (targetParam, warnMessage, VueInst, successMessage) {
    if (!warnMessage) {
      return !(targetParam === '' || targetParam === null || targetParam === undefined)
    } else {
      if (targetParam === '' || targetParam === null || targetParam === undefined) {
        VueInst.$message({
          message: warnMessage,
          type: 'error'
        })
        return false
      } else {
        if (successMessage) {
          VueInst.$message({
            message: successMessage,
            type: 'success'
          })
        }
        return true
      }
    }
  },
  validateEmptyArray: function (targetParam, warnMessage, VueInst, successMessage) {
    if (!warnMessage) {
      return !(targetParam === null || targetParam === undefined || !targetParam instanceof Array || targetParam.length == 0)
    } else {
      if (targetParam === null || targetParam === undefined || !targetParam instanceof Array || targetParam.length == 0) {
        VueInst.$message({
          message: warnMessage,
          type: 'error'
        })
        return false
      } else {
        if (successMessage) {
          VueInst.$message({
            message: successMessage,
            type: 'success'
          })
        }
        return true
      }
    }
  },
  /**
   * 验证IP地址正确性
   * @author shenwenxiao
   * @param {String} ip - 验证目标IP
   * @param {String} [warnMessage] - 出错时的弹出警告内容
   * @param {Object} [VueInst] - 传入的VUE实例
   * @param {String} [successMessage] - 出错时的弹出警告内容
   * @returns {Boolean}
   */
  validateIP(ip, warnMessage, VueInst, successMessage) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    if (!warnMessage) {
      return reg.test(ip)
    } else {
      if (!reg.test(ip)) {
        VueInst.$message({
          message: warnMessage,
          type: 'error'
        })
        return false
      } else {
        if (successMessage) {
          VueInst.$message({
            message: successMessage,
            type: 'success'
          })
        }
        return true
      }
    }
  },
  // 验证编号是否为空
  validateMyNumber(ce, warnMessage, VueInst, successMessage) {
    if (ce === '' || ce === null || ce === undefined) {
      return true
    }
    var reg = /^(\-|\+)?\d+(\.\d+)?$/;
    if (!warnMessage) {
      return reg.test(ce)
    } else {
      if (!reg.test(ce)) {
        VueInst.$message({
          message: warnMessage,
          type: 'error'
        })
        return false
      } else {
        if (successMessage) {
          VueInst.$message({
            message: successMessage,
            type: 'success'
          })
        }
        return true
      }
    }
  },
  // 验证数字编号是否以0开头
  validateNumBeginZero(num, warnMessage, VueInst, successMessage) {
    if (num === '' || num === null || num === undefined) {
      return true
    }
    var reg = /^[1-9]\d*$/;
    if (!warnMessage) {
      return reg.test(num)
    } else {
      if (!reg.test(num)) {
        VueInst.$message({
          message: warnMessage,
          type: 'error'
        })
        return false
      } else {
        if (successMessage) {
          VueInst.$message({
            message: successMessage,
            type: 'success'
          })
        }
        return true
      }
    }
  },
  //验证输入是否以yyyy-mm-dd形式
  validateCe(ce, warnMessage, VueInst, successMessage) {
    if (ce === '' || ce === null || ce === undefined) {
      return true
    }
    var reg = /^\d{4}\-\d{2}\-\d{2}$/;
    if (!warnMessage) {
      return reg.test(ce)
    } else {
      if (!reg.test(ce)) {
        VueInst.$message({
          message: warnMessage,
          type: 'error'
        })
        return false
      } else {
        if (successMessage) {
          VueInst.$message({
            message: successMessage,
            type: 'success'
          })
        }
        return true
      }
    }
  },
  /**
   * 验证端口正确性
   * @author shenwenxiao
   * @param {String} port - 验证目标端口
   * @param {String} warnMessage - 出错时的弹出警告内容
   * @param {Object} VueInst - 传入的VUE实例
   * @param {String} [successMessage] - 出错时的弹出警告内容
   * @returns {Boolean}
   */
  validatePort(port, warnMessage, VueInst, successMessage) {
    const result = _.isInteger(port) && port > 0 && port < 65536
    if (!result) {
      VueInst.$message({
        message: warnMessage,
        type: 'error'
      })
      return false
    } else {
      if (successMessage) {
        VueInst.$message({
          message: successMessage,
          type: 'success'
        })
      }
      return true
    }
  },
  repeat(func, n, ...args) {
    for (let i = 0; i < n; i++)
      func(i, ...args)
  },
  /**
   * 验证电话输入正确性
   * @author shenwenxiao
   * @param {String} telNumber - 验证目标电话号
   * @param {String} [warnMessage] - 出错时的弹出警告内容
   * @param {Object} [VueInst] - 传入的VUE实例
   * @param {String} [successMessage] - 出错时的弹出警告内容
   * @returns {Boolean}
   */
  validateTelNumber(telNumber, warnMessage, VueInst, successMessage) {
    var reg = /^(1[35789][0-9]{9})$/
    if (!warnMessage) {
      return reg.test(telNumber)
    } else {
      if (!reg.test(telNumber)) {
        VueInst.$message({
          message: warnMessage,
          type: 'error'
        })
        return false
      } else {
        if (successMessage) {
          VueInst.$message({
            message: successMessage,
            type: 'success'
          })
        }
        return true
      }
    }
  },
     /**
   * 验证身份证号输入正确性
   * @author hax
   * @param {String} cardNumber - 验证目标身份证号
   * @param {String} [warnMessage] - 出错时的弹出警告内容
   * @param {Object} [VueInst] - 传入的VUE实例
   * @param {String} [successMessage] - 出错时的弹出警告内容
   * @returns {Boolean}
   */
  validateCardNumber(cardNumber, warnMessage, VueInst, successMessage) {
    var reg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!warnMessage) {
      return reg.test(cardNumber)
    } else {
      if (!reg.test(cardNumber)) {
        VueInst.$message({
          message: warnMessage,
          type: 'error'
        })
        return false
      } else {
        if (successMessage) {
          VueInst.$message({
            message: successMessage,
            type: 'success'
          })
        }
        return true
      }
    }
  },
   /**
   *当一个对象的属性为空字符串的时候 遍历删除该属性
   * @author  hax
   * @param {Object} [param] - 传入的VUE实例
   */
   deleteNullParam(param){
    for(var key in param) {
      if(param[key] === '') {
        delete param[key]
      }
    }
    return param
  },
 /**
   * @hintInfo 操作提示信息
   * @param hint  成功提示
   * @param info 警告信息
   */
  hintInfo: function(VueInst,hint, info) {
    if(hint === "success") {
      VueInst.$message({
        message: info,
        type: 'success'
      });
    } else if(hint === "warning") {
      VueInst.$message({
        message: info,
        type: 'warning'
      });
    } else {
      VueInst.$message.error('出错了！');
    }
  },
}
