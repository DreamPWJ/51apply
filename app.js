//app.js
App({
    onLaunch: function () {
        //启动时执行的初始化工作 全局只触发一次
        //存储当前经纬度地址到本地
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                wx.setStorageSync("longitude", res.longitude);//经度
                wx.setStorageSync("latitude", res.latitude);//纬度
            }
        })
    },
    globalData: { //全局常量参数配置
        api: "https://t.51enroll.com/Service.asmx",
        praviteKey:"oiox3tmqu1sn56x7occdd"
    }
})
