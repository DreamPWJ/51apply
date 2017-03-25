// pages/activity/activityapply.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        shapeIndex: 0,
        shape: ["线上", "线下"]
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //活动详情信息
        this.getActivityDetails();
        //误操作提示
        /*        if (!wx.getStorageSync("isManyPeoplePrompt")) {*/
            wx.showModal({
                title: '友情提示',
                content: "请勿使用同一个小程序或App给多人报名，造成信息错误后果自行承担!",
                showCancel: false,
                confirmColor: "#f26604",
                success: function (res) {
                    if (res.confirm) {
                        wx.setStorageSync("isManyPeoplePrompt", true);
                        console.log('用户点击确定');

                    }
                }
            })
/*        }*/

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
    //报名形式选择
    bindShapePickerChange: function (e) {
        this.setData({
            shapeIndex: e.detail.value
        })
    },
    //活动详情信息
    getActivityDetails: function () {
        util.https(app.globalData.api + "/GetActiveDetail", "GET", {
                inputJson: {
                    ActiveId: "1", //传入选择活动的ID
                    Latitude: wx.getStorageSync("latitude"), //纬度
                    Longitude: wx.getStorageSync("longitude"), //经度
                },
                praviteKey: app.globalData.praviteKey
            },
            this.getActivityDetailsData
        )

    },
    //活动详情信息数据处理
    getActivityDetailsData: function (data) {
        console.log(data);
        this.setData({
            activityDetails: data.Data
        })
    }
})