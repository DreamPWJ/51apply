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
        util.http(app.globalData.api + "/GetHeadLines","GET", this.getHeadLines)
    },
    getHeadLines: function (data) {
        console.log(data);
        this.setData({
            headLinesData: data
        });

    },
    //事件处理函数
    applysubject: function () {
        wx.navigateTo({
            url: '../apply/applysubject'
        })
    }
})
