// pages/account/subscribe.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        isLogin: util.isLogin(),
        winWidth: 0,
        winHeight: 0,
        currentTab: 0    // tab切换
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;

        /**
         * 获取系统信息
         */
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }

        });
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
            //我的预约
            this.getMyAllOrderInfoHttps()
        }
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    getMyAllOrderInfoHttps: function () {  //获取用户的我的预约列表
        // 所有有登录状态接口默认带上userId和token。没有登录状态的接口默认带上pkey.防止其他方非法使用web服务的访问
        util.https(app.globalData.api + "/GetMyAllOrderInfo", "GET", {
                userId: wx.getStorageSync("StudentId"),//用户id
                tokenInfo: wx.getStorageSync("TokenInfo") //用户token
            },
            this.getMyAllOrderInfo
        )
    },
    getMyAllOrderInfo: function (data) {
        console.log(data);
        this.setData({
            myAllOrderInfo: data.Data

        })
    },
    /**
     * 滑动切换tab
     */
    bindChange: function (e) {

        var that = this;
        that.setData({currentTab: e.detail.current});

    },
    /**
     * 点击tab切换
     */
    swichNav: function (e) {

        var that = this;

        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }
})