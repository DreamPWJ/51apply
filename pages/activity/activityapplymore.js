// pages/activity/activityapplymore.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //首页活动报名列表
        util.https(app.globalData.api + "/GetHeadActiveList", "GET", {
                inputJson: {
                    StudentID: wx.getStorageSync("StudentId") ? wx.getStorageSync("StudentId") : 0//传入用户的ID，如果是没登录状态就给0，如果是已经登录就返回userID.
                },
                praviteKey: app.globalData.praviteKey
            },
            this.getHeadActiveList
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
    },   //首页活动报名列表
    getHeadActiveList: function (data) {
        console.log(data);
        var headActiveList = data.Data;
        for (var index in headActiveList) {
            //考试时间差
            headActiveList[index].differdays = Math.floor((new Date(headActiveList[index].EndDate).getTime() - new Date().getTime()) / (24 * 3600 * 1000));
        }
        this.setData({
            headActiveList: headActiveList
        });

    },
})