//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        hiddenLoading: false
    },

    onLoad: function () {
        //考试报名列表
        util.https(app.globalData.api + "/GetHeadExamType", "GET", {
                praviteKey: app.globalData.praviteKey
            }
            ,
            this.getHeadExamType
        )
        //考试头条
        util.https(app.globalData.api + "/GetHeadLines", "GET", {
                praviteKey: app.globalData.praviteKey
            },
            this.getHeadLines
        )

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
    //考试报名列表
    getHeadExamType: function (data) {

        var headExamType = data.Data;
        for (var index in headExamType) {
            //考试时间差
            headExamType[index].differdays = Math.floor((new Date(headExamType[index].EndDate).getTime() - new Date().getTime()) / (24 * 3600 * 1000));
        }
        console.log(headExamType);
        this.setData({
            headExamType: headExamType
        });


    },
    //考试头条
    getHeadLines: function (data) {
        this.setData({
            headLine: data.Data
        });

    },
    //首页活动报名列表
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
