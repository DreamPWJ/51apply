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
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            }
            ,
            this.getHeadExamType
        )
        //章节练习
        util.https(app.globalData.api + "/GetExamTestList", "POST", {
                inputJson: {
                    ExamTypeId: 1, //考试类别ID，该值必须传入，无类型就传入0
                    SubjectId: 1, //考试科目ID，该值必须传入
                    TestTypeId: 3,  //题目类别 1是历年真题，2是模拟试题，3是章节练习，4是每日一练
                    CurrentPage: 1,
                    PageSize: 5
                },
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            },
            this.getExamTestList
        )
    },
    getHeadExamType: function (data) {
        console.log(data);
        this.setData({
            headExamType: data.Data
        });

    },
    getExamTestList: function (data) {
        console.log(data);
        this.setData({
            examTestList: data.Data
        });

    },
    //事件处理函数
    applysubject: function () {
        wx.navigateTo({
            url: '../apply/applysubject'
        })
    },
    //事件处理函数
    applyrecord: function () {
        wx.navigateTo({
            url: '../record/applyrecord'
        })
    }
})
