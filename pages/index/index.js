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
        //章节练习
        util.https(app.globalData.api + "/GetNewestTestTitle", "GET", {
                praviteKey: app.globalData.praviteKey
            },
            this.getExamTestList
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
    //章节练习
    getExamTestList: function (data) {
        this.setData({
            examTestList: data.Data
        });

    },

})
