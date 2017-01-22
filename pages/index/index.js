//index.js
//获取应用实例
var app = getApp()
Page({
    data: {},

    onLoad: function () {
    },
    //事件处理函数
    applysubject: function () {
        wx.navigateTo({
            url: '../apply/applysubject'
        })
    }
})
