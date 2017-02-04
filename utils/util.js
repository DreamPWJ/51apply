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

function http(url, type, data, callBack) {
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

        }
    })
}

module.exports = {
    formatTime: formatTime,
    http: http
}
