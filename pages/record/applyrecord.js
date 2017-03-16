// pages/record/applyrecord.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //报考记录
        // 所有有登录状态接口默认带上userId和token。没有登录状态的接口默认带上pkey.防止其他方非法使用web服务的访问
        util.https(app.globalData.api + "/GetExamReocrdList", "GET", {
                userId: wx.getStorageSync("StudentId"),//用户id
                tokenInfo: wx.getStorageSync("TokenInfo") //用户token
            },
            this.getExamReocrdList
        )
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
    //报考记录
    getExamReocrdList: function (data) {
        console.log(data);
        this.setData({
            examReocrdList: data.Data

        })
    }
})