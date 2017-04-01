/**
 *   格式化时间
 *  对Date的扩展，将 Date 转化为指定格式的String
 *  月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *  年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *  例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *  (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Format = function (fmt) { //
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * JavaScript合并两个Json对象
 */
function mergeJsonObject(jsonbject1, jsonbject2) {
    var resultJsonObject = {};
    for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr];
    }
    return resultJsonObject;
};
/**
 * 公共微信https请求封装
 * @param url
 * @param type
 * @param data
 * @param callBack
 */
function https(url, type, data, callBack) {
    wx.showToast({
        title: '51报名管家',
        icon: 'loading',
        duration: 1000
    })
    wx.request({
        url: url,
        method: type,
        data: data,
        header: {
            "Content-Type": "json"
        },
        success: function (res) {
            if (res.data.StatusCode != 0) {
                wx.showToast({
                    title: res.data.Msg,
                    icon: 'success',
                    duration: 2000
                })
            }
            callBack(res.data);
        },
        fail: function (error) {
            wx.showToast({
                title: "请求失败:" + JSON.stringify(error),
                icon: 'success',
                duration: 2000
            })
            console.log(error)
        },
        complete: function () {
            /*  wx.hideToast();*/
        }
    })
}
/**
 * 是否登录
 */
function isLogin() {
    return wx.getStorageSync("TokenInfo") ? true : false;
}

/**
 * 是否登录提示
 */
function isLoginModal() {
    wx.showModal({
        title: '友情提示',
        content: "登录51报名管家,体验更完善功能",
        showCancel: true,
        confirmColor: "#f26604",
        confirmText: "登录",
        success: function (res) {
            if (res.confirm) {
                wx.navigateTo({
                    url: '/pages/account/login'
                })
                console.log('用户点击确定');
            } else if (res.cancel) {
                //返回上一页
                wx.navigateBack({
                    delta: 1
                })
            }
        }
    })
}
/**
 * Toast提示框
 */
function showToast(title, icon, duration) {
    wx.showToast({
        title: title || "",
        icon: icon || 'success',
        duration: duration || 1500
    })
}
module.exports = {
    https: https,
    isLogin: isLogin,
    isLoginModal: isLoginModal,
    showToast: showToast,
    mergeJsonObject: mergeJsonObject
}
