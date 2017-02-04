//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        headLinesData: "",//考试头条数据
        hiddenLoading: false
    },

    onLoad: function () {
        util.http(app.globalData.api + "/GetExamNotice", "GET", {
                inputJson: {
                    CurrPage: 1,
                    PageSize: 2
                },
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            }
            ,
            this.getHeadLines
        )
    },
    getHeadLines: function (data) {
        console.log(data);
        this.setData({
            headLinesData: data.Data
        });

    },
    //事件处理函数
    applysubject: function () {
        wx.navigateTo({
            url: '../apply/applysubject'
        })
    }
})
