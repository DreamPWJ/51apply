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

        }
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
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