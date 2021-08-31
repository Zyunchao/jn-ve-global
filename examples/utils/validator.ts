/*是否合法IP地址*/
export const validateIP = (rule, value,callback) => {
    if(value === '' ||value === undefined||value === null){
        callback()
    }else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        if ((!reg.test( value )) && value !== '') {
            callback(new Error('请输入正确的IP地址'))
        } else {
            callback()
        }
    }
}
  
/* 是否手机号码或者固话*/
export const validatePhoneTwo = (rule, value, callback) => {
    const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
    if (value === '' || value === undefined || value === null) {
        callback()
    } else {
        if ((!reg.test(value)) && value !== '') {
            callback(new Error('请输入正确的电话号码或者固话号码'))
        } else {
            callback()
        }
    }
}
/* 是否固话*/
export const validateTelphone = (rule, value,callback) => {
    const reg =/0\d{2}-\d{7,8}/
    if(value === ''||value === undefined||value === null){
        callback()
    }else if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'))
    } else {
        callback()
    }
}
/* 是否手机号码*/
export const validatePhone = (rule, value,callback) => {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if(value === ''|| value === undefined||value === null){
        callback()
    }else if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入正确的电话号码'))
    } else {
        callback()
    }
}
/* 是否身份证号码*/
export const validateIdNo = (rule, value,callback) => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if(value === '' || value === undefined||value === null){
        callback()
    }else if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入正确的身份证号码'))
    } else {
        callback()
    }
}
/* 是否邮箱*/
export const validateEMail = (rule, value,callback) => {
    const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
    if(value === '' || value === undefined||value === null){
        callback()
    }else if (!reg.test(value)){
        callback(new Error('请输入正确的邮箱地址'))
    } else {
        callback()
    }
}
/* 合法uri*/
export const validateURL = (textval) => {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}
  
/*验证内容是否英文数字以及下划线*/
export const isPassword = (rule, value, callback) => {
    const reg =/^[_a-zA-Z0-9]+$/
    if(value === '' || value === undefined||value === null){
        callback()
    } else if (!reg.test(value)){
        callback(new Error('密码仅由英文字母，数字以及下划线组成'))
    } else {
        callback()
    }
}
  
/*自动检验数值的范围*/
export const checkMax = (rule, value, maxValue, callback) => {
    if(value === '' || value === undefined||value === null){
        callback()
    } else if (!Number(value)) {
        callback(new Error('请输入数字'))
    } else if (value < 1 || value > maxValue) {
        callback(new Error('请输入[1,'+maxValue+']之间的数字'))
    } else {
        callback()
    }
}
export const checkMin = (rule, value, minValue, callback) => {
    if(value === '' || value === undefined||value === null){
        callback()
    } else if (!Number(value)) {
        callback(new Error('请输入数字'))
    } else if ( value < minValue) {
        callback(new Error('请输入大于'+minValue+'的数字'))
    } else {
        callback()
    }
}
  
//验证是否1-99之间
export const isOneToNinetyNine = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('输入不可以为空'))
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数'))
        } else {
            const re = /^[1-9][0-9]{0,1}$/
            const rsCheck = re.test(value)
            if (!rsCheck) {
                callback(new Error('请输入正整数，值为【1,99】'))
            } else {
                callback()
            }
        }
    }, 0)
}
  
// 验证是否整数
export const isInteger = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('输入不可以为空'))
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数'))
        } else {
            const re = /^[0-9]*[1-9][0-9]*$/
            const rsCheck = re.test(value)
            if (!rsCheck) {
                callback(new Error('请输入正整数'))
            } else {
                callback()
            }
        }
    }, 0)
}

// 验证是否整数,非必填
export function isIntegerNotMust(rule, value, callback) {
    if (!value) {
        callback()
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数'))
        } else {
            const re = /^[0-9]*[1-9][0-9]*$/
            const rsCheck = re.test(value)
            if (!rsCheck) {
                callback(new Error('请输入正整数'))
            } else {
                callback()
            }
        }
    }, 1000)
}
  
// 验证是否是[0-1]的小数
export const isDecimal = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('输入不可以为空'))
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入[0,1]之间的数字'))
        } else {
            if (value < 0 || value > 1) {
                callback(new Error('请输入[0,1]之间的数字'))
            } else {
                callback()
            }
        }
    }, 100)
}
  
  
/* 小写字母*/
export const validateLowerCase = (str) => {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

  
/* 大写字母*/
export const validateUpperCase = (str) =>{
    const reg = /^[A-Z]+$/
    return reg.test(str)
}
  
/* 大小写字母*/
export const validatAlphabets = (str) => {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}