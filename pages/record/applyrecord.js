// pages/record/applyrecord.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        isLogin: util.isLogin()
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数


    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        this.setData({
            isLogin: util.isLogin(),
            userData: wx.getStorageSync("userData") || ""//用户信息
        })
        if (!this.data.isLogin) { //没登录提示登录
            util.isLoginModal();
        } else {
            //报考记录
            this.getExamReocrdListHttps();
        }
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    getExamReocrdListHttps: function () {  //报考记录
        // 所有有登录状态接口默认带上userId和token。没有登录状态的接口默认带上pkey.防止其他方非法使用web服务的访问
        util.https(app.globalData.api + "/GetExamReocrdList", "GET", {
                userId: wx.getStorageSync("StudentId"),//用户id
                tokenInfo: wx.getStorageSync("TokenInfo") //用户token
            },
            this.getExamReocrdList
        )
    },

    //报考记录
    getExamReocrdList: function (data) {
        console.log(data);
        var examReocrdList = data.Data;
        for (var index in examReocrdList) {
            //考试时间差
            examReocrdList[index].differdays = Math.floor((new Date(examReocrdList[index].RealExamDate).getTime() - new Date().getTime()) / (24 * 3600 * 1000));
        }
        this.setData({
            examReocrdList: examReocrdList

        })
    },
    //报考记录详情
    getExamReocrdListDetails: function (e) {
        var dataset = e.currentTarget.dataset;
        wx.navigateTo({
            url: 'applyrecorddetails?MulStuId=' + dataset.id + '&ExamTypeId=' + dataset.examtypeid
        })
    },
    //删除未支付
    deleteExamReocrdList: function (e) {
        console.log(e.currentTarget.dataset);

        wx.showModal({
            title: '删除记录',
            content: "确定删除这条报考记录?",
            showCancel: true,
            confirmText: "删除",
            confirmColor: "#f26604",
            success: function (res) {
                if (res.confirm) {
                    // 考生删除未缴费的订单信息
                    util.https(app.globalData.api + "/DeleteOrderInfo", "GET", {
                            userId: wx.getStorageSync("StudentId"),//用户id
                            tokenInfo: wx.getStorageSync("TokenInfo"), //用户token
                            inputJson: {
                                PayType: "1",//删除类型，1表示计算机考试报名，2表示模拟考试，3表示教材，4表示考霸课程,5表示会计报名,6 表示报名的技能高考模拟练习,7 表示删除快递证书,8表示删除培训订单,9 表示删除考试提醒
                                SubjectID: e.currentTarget.dataset.subjectid, //表示科目ID
                                BookId: 0, //表示书本ID
                                CourseId: 0, //表示课程ID,接口33有返回
                                ExamTypeId: e.currentTarget.dataset.id, //表示考试类型
                            }

                        },
                        function (data) {
                            util.showToast(data.Msg);
                            if (data.StatusCode == 0) {
                                this.getExamReocrdListHttps();
                            }

                        }
                    )
                }
            }
        })
    }
})