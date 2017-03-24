// pages/apply/applysubjectmore.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //考试报名列表
        util.https(app.globalData.api + "/GetHeadExamType", "GET", {
                praviteKey: app.globalData.praviteKey
            }
            ,
            this.getHeadExamType
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
    },   //考试报名列表
    getHeadExamType: function (data) {

        var headExamType = data.Data;
        for (var index in headExamType) {
            //考试时间差
            headExamType[index].differdays = Math.floor((new Date(headExamType[index].RealExamDate).getTime() - new Date().getTime()) / (24 * 3600 * 1000));
        }
        console.log(headExamType);
        this.setData({
            headExamType: headExamType
        });


    },
})