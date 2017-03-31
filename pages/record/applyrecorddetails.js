// pages/record/applyrecorddetails.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        viewmore: false
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        // 所有有登录状态接口默认带上userId和token。没有登录状态的接口默认带上pkey.防止其他方非法使用web服务的访问
        util.https(app.globalData.api + "/GetStudentExamDetail", "GET", {
                userId: wx.getStorageSync("StudentId"),//用户id
                tokenInfo: wx.getStorageSync("TokenInfo"),//用户token
                inputJson: {
                    MulStuId: options.MulStuId, //接口33的报名ID，该值必须传入
                    ExamTypeId: options.ExamTypeId, //接口33的ExamtypeId， 非计算机等级考试的时候必须传入
                }
            },
            this.getStudentExamDetail
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
    },
    getStudentExamDetail: function (data) { //报名记录详情
        console.log(data);
        this.setData({
            studentExamDetail: data.Data
        })
    },
    viewMore: function () { //查看更多信息
        this.setData({
            viewmore: true
        })
    }
})