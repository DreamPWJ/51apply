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
    mergeJsonObject: mergeJsonObject,
    hexMD5: hexMD5
}
/*
 * A Javascript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 1.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Code also contributed by Greg Holt
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
    return (num << cnt) | (num >>> (32 - cnt))
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function cmn(q, a, b, x, s, t)
{
    return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
}
function ff(a, b, c, d, x, s, t)
{
    return cmn((b & c) | ((~b) & d), a, b, x, s, t)
}
function gg(a, b, c, d, x, s, t)
{
    return cmn((b & d) | (c & (~d)), a, b, x, s, t)
}
function hh(a, b, c, d, x, s, t)
{
    return cmn(b ^ c ^ d, a, b, x, s, t)
}
function ii(a, b, c, d, x, s, t)
{
    return cmn(c ^ (b | (~d)), a, b, x, s, t)
}

/*
 * Calculate the MD5 of an array of little-endian words, producing an array
 * of little-endian words.
 */
function coreMD5(x)
{
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for(var i = 0; i < x.length; i += 16)
    {
        var olda = a
        var oldb = b
        var oldc = c
        var oldd = d

        a = ff(a, b, c, d, x[i+ 0], 7 , -680876936)
        d = ff(d, a, b, c, x[i+ 1], 12, -389564586)
        c = ff(c, d, a, b, x[i+ 2], 17, 606105819)
        b = ff(b, c, d, a, x[i+ 3], 22, -1044525330)
        a = ff(a, b, c, d, x[i+ 4], 7 , -176418897)
        d = ff(d, a, b, c, x[i+ 5], 12, 1200080426)
        c = ff(c, d, a, b, x[i+ 6], 17, -1473231341)
        b = ff(b, c, d, a, x[i+ 7], 22, -45705983)
        a = ff(a, b, c, d, x[i+ 8], 7 , 1770035416)
        d = ff(d, a, b, c, x[i+ 9], 12, -1958414417)
        c = ff(c, d, a, b, x[i+10], 17, -42063)
        b = ff(b, c, d, a, x[i+11], 22, -1990404162)
        a = ff(a, b, c, d, x[i+12], 7 , 1804603682)
        d = ff(d, a, b, c, x[i+13], 12, -40341101)
        c = ff(c, d, a, b, x[i+14], 17, -1502002290)
        b = ff(b, c, d, a, x[i+15], 22, 1236535329)

        a = gg(a, b, c, d, x[i+ 1], 5 , -165796510)
        d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632)
        c = gg(c, d, a, b, x[i+11], 14, 643717713)
        b = gg(b, c, d, a, x[i+ 0], 20, -373897302)
        a = gg(a, b, c, d, x[i+ 5], 5 , -701558691)
        d = gg(d, a, b, c, x[i+10], 9 , 38016083)
        c = gg(c, d, a, b, x[i+15], 14, -660478335)
        b = gg(b, c, d, a, x[i+ 4], 20, -405537848)
        a = gg(a, b, c, d, x[i+ 9], 5 , 568446438)
        d = gg(d, a, b, c, x[i+14], 9 , -1019803690)
        c = gg(c, d, a, b, x[i+ 3], 14, -187363961)
        b = gg(b, c, d, a, x[i+ 8], 20, 1163531501)
        a = gg(a, b, c, d, x[i+13], 5 , -1444681467)
        d = gg(d, a, b, c, x[i+ 2], 9 , -51403784)
        c = gg(c, d, a, b, x[i+ 7], 14, 1735328473)
        b = gg(b, c, d, a, x[i+12], 20, -1926607734)

        a = hh(a, b, c, d, x[i+ 5], 4 , -378558)
        d = hh(d, a, b, c, x[i+ 8], 11, -2022574463)
        c = hh(c, d, a, b, x[i+11], 16, 1839030562)
        b = hh(b, c, d, a, x[i+14], 23, -35309556)
        a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060)
        d = hh(d, a, b, c, x[i+ 4], 11, 1272893353)
        c = hh(c, d, a, b, x[i+ 7], 16, -155497632)
        b = hh(b, c, d, a, x[i+10], 23, -1094730640)
        a = hh(a, b, c, d, x[i+13], 4 , 681279174)
        d = hh(d, a, b, c, x[i+ 0], 11, -358537222)
        c = hh(c, d, a, b, x[i+ 3], 16, -722521979)
        b = hh(b, c, d, a, x[i+ 6], 23, 76029189)
        a = hh(a, b, c, d, x[i+ 9], 4 , -640364487)
        d = hh(d, a, b, c, x[i+12], 11, -421815835)
        c = hh(c, d, a, b, x[i+15], 16, 530742520)
        b = hh(b, c, d, a, x[i+ 2], 23, -995338651)

        a = ii(a, b, c, d, x[i+ 0], 6 , -198630844)
        d = ii(d, a, b, c, x[i+ 7], 10, 1126891415)
        c = ii(c, d, a, b, x[i+14], 15, -1416354905)
        b = ii(b, c, d, a, x[i+ 5], 21, -57434055)
        a = ii(a, b, c, d, x[i+12], 6 , 1700485571)
        d = ii(d, a, b, c, x[i+ 3], 10, -1894986606)
        c = ii(c, d, a, b, x[i+10], 15, -1051523)
        b = ii(b, c, d, a, x[i+ 1], 21, -2054922799)
        a = ii(a, b, c, d, x[i+ 8], 6 , 1873313359)
        d = ii(d, a, b, c, x[i+15], 10, -30611744)
        c = ii(c, d, a, b, x[i+ 6], 15, -1560198380)
        b = ii(b, c, d, a, x[i+13], 21, 1309151649)
        a = ii(a, b, c, d, x[i+ 4], 6 , -145523070)
        d = ii(d, a, b, c, x[i+11], 10, -1120210379)
        c = ii(c, d, a, b, x[i+ 2], 15, 718787259)
        b = ii(b, c, d, a, x[i+ 9], 21, -343485551)

        a = safe_add(a, olda)
        b = safe_add(b, oldb)
        c = safe_add(c, oldc)
        d = safe_add(d, oldd)
    }
    return [a, b, c, d]
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
    var hex_tab = "0123456789abcdef"
    var str = ""
    for(var i = 0; i < binarray.length * 4; i++)
    {
        str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((i%4)*8)) & 0xF)
    }
    return str
}

/*
 * Convert an array of little-endian words to a base64 encoded string.
 */
function binl2b64(binarray)
{
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    var str = ""
    for(var i = 0; i < binarray.length * 32; i += 6)
    {
        str += tab.charAt(((binarray[i>>5] << (i%32)) & 0x3F) |
            ((binarray[i>>5+1] >> (32-i%32)) & 0x3F))
    }
    return str
}

/*
 * Convert an 8-bit character string to a sequence of 16-word blocks, stored
 * as an array, and append appropriate padding for MD4/5 calculation.
 * If any of the characters are >255, the high byte is silently ignored.
 */
function str2binl(str)
{
    var nblk = ((str.length + 8) >> 6) + 1 // number of 16-word blocks
    var blks = new Array(nblk * 16)
    for(var i = 0; i < nblk * 16; i++) blks[i] = 0
    for(var i = 0; i < str.length; i++)
        blks[i>>2] |= (str.charCodeAt(i) & 0xFF) << ((i%4) * 8)
    blks[i>>2] |= 0x80 << ((i%4) * 8)
    blks[nblk*16-2] = str.length * 8
    return blks
}

/*
 * Convert a wide-character string to a sequence of 16-word blocks, stored as
 * an array, and append appropriate padding for MD4/5 calculation.
 */
function strw2binl(str)
{
    var nblk = ((str.length + 4) >> 5) + 1 // number of 16-word blocks
    var blks = new Array(nblk * 16)
    for(var i = 0; i < nblk * 16; i++) blks[i] = 0
    for(var i = 0; i < str.length; i++)
        blks[i>>1] |= str.charCodeAt(i) << ((i%2) * 16)
    blks[i>>1] |= 0x80 << ((i%2) * 16)
    blks[nblk*16-2] = str.length * 16
    return blks
}

/*
 * External interface
 */
function hexMD5 (str) { return binl2hex(coreMD5( str2binl(str))) }
function hexMD5w(str) { return binl2hex(coreMD5(strw2binl(str))) }
function b64MD5 (str) { return binl2b64(coreMD5( str2binl(str))) }
function b64MD5w(str) { return binl2b64(coreMD5(strw2binl(str))) }
/* Backward compatibility */
function calcMD5(str) { return binl2hex(coreMD5( str2binl(str))) }