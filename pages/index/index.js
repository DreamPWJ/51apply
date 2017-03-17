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
    },
    //考试报名列表
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
    //考试头条
    getHeadLines: function (data) {
        console.log(data);
        this.setData({
            headLine: data.Data
        });

    },

})
