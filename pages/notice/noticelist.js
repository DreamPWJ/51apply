// pages/notice/noticelist.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        totalCount: 1,
        examNoticeArr: [],
        hasData:true
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //考试公告列表
        this.getExamNoticeHttps(this.data.totalCount);

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
    onPullDownRefresh: function (event) {    // 下拉刷新回调接口
        this.data.totalCount = 1;
        //考试公告列表
        wx.showNavigationBarLoading();
        this.getExamNoticeHttps(this.data.totalCount);

    },
    onReachBottom: function (event) {       // 上滑加载
        if(!this.data.hasData){
            return;
        }
        //考试公告列表
        wx.showNavigationBarLoading()
        this.getExamNoticeHttps(this.data.totalCount);

    },
    getExamNoticeHttps: function (CurrPage) { //考试公告列表
        util.https(app.globalData.api + "/GetExamNotice", "GET", {
                inputJson: {
                    NoticeType: 1, //公告类型，1表示考试，2表示活动，3表示培训， 如果不传该参数系统默认返回都是考试的公告
                    CurrPage: CurrPage,
                    PageSize: 10
                },
                praviteKey: app.globalData.praviteKey
            },
            this.getExamNotice
        )
    },
    getExamNotice: function (data) {
        console.log(data);
        if (data.Data.length == 0) { //没有数据
            this.setData({
                hasData: false
            });
            wx.showToast({
                title: "没有更多数据",
                icon: 'success',
                duration: 1500
            })
            wx.hideNavigationBarLoading();
            return;
        }
        if (this.data.totalCount == 1) {
            this.setData({
                examNoticeArr: []
            });
        }
        for (var index in data.Data) {
            this.data.examNoticeArr.push(data.Data[index]);
        }

        this.setData({
            examNotice: this.data.examNoticeArr
        });
        this.data.totalCount++;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()

    }
})