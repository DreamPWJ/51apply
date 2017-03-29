// pages/record/applyrecord.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        isLogin: util.isLogin()
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数


    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        this.setData({
            isLogin: util.isLogin(),
            userData: wx.getStorageSync("userData") || ""//用户信息
        })
        if (!this.data.isLogin) { //没登录提示登录
            util.isLoginModal();
        } else {
            //报考记录
            // 所有有登录状态接口默认带上userId和token。没有登录状态的接口默认带上pkey.防止其他方非法使用web服务的访问
            util.https(app.globalData.api + "/GetExamReocrdList", "GET", {
                    userId: wx.getStorageSync("StudentId"),//用户id
                    tokenInfo: wx.getStorageSync("TokenInfo") //用户token
                },
                this.getExamReocrdList
            )
        }
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
        var examReocrdList = data.Data;
        for (var index in examReocrdList) {
            //考试时间差
            examReocrdList[index].differdays = Math.floor((new Date(examReocrdList[index].RealExamDate).getTime() - new Date().getTime()) / (24 * 3600 * 1000));
        }
        this.setData({
            examReocrdList: examReocrdList

        })
    }
})