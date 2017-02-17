// pages/apply/applyperson.js
Page({
    data: {
        date: new Date().Format("yyyy-MM-dd"),
        credentialsIndex: 0,
        credentials: ["身份证", "台湾居民往来大陆通行证", "港澳居民往来大陆通行证", "军人证件", "护照"],
        nationIndex: 0,
        nation: ["汉", "蒙古", "回", "藏", "维吾尔", "苗", "彝", "壮", "布依", "朝鲜", "侗", "瑶", "白", "土家", "哈尼", "哈萨克", "傣", "黎", "其他"],//民族
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },

    //证件类型选择
    bindCredentialsPickerChange: function (e) {
        this.setData({
            credentialsIndex: e.detail.value
        })
    }
    ,

    //民族类型选择
    bindNationPickerChange: function (e) {
        this.setData({
            nationIndex: e.detail.value
        })
    }
    ,
    //时间类型选择
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
})