function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

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
        icon: 'loading'
    })
    wx.request({
        url: url,
        method: type,
        data: data,
        header: {
            "Content-Type": "json"
        },
        success: function (res) {
            callBack(res.data);
            if (res.data.StatusCode != 0) {
                wx.showToast({
                    title: res.data.Msg,
                    icon: 'success',
                    duration: 2000
                })
            }

        },
        fail: function (error) {
            wx.showToast({
                title: "请求失败:" + error,
                icon: 'success',
                duration: 2000
            })
            console.log(error)
        },
        complete: function () {
            wx.hideToast();
        }
    })
}

module.exports = {
    formatTime: formatTime,
    https: https
}
