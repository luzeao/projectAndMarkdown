
// 将mutations中的方法名提取出来,放到types中, mutations.js 引入当前文件,对应常量名定义方法
//                                actions.js 引入当前文件,对应常量名调用方法

// 好处:1. mutations中定义的方法和actions中引入的方法是同一个方法(消除魔术字符串)
//  2. 方法名称使用常量定义,一经声明,外部无法修改
//  3. 后期维护方便
export const UPDATE_AUTHORITY_INFO = 'UPDATE_AUTHORITY_INFO'


// 用户相关信息初始值,登陆之后需要存储的数据
export const AUTHORITY_INIT_VALUE = {
    adminname: '',
    token: '',
    role: null,
    checkedkeys: []
}