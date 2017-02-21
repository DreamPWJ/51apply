// pages/pay/applypay.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        paydata: {}
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid）
        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    console.log(res);
                    //微信小程序考试报名数据提交
                    util.https(app.globalData.api + "/SetWXOrderExamInfo", "GET", {
                            inputJson: inputJson,
                            praviteKey: 'oiox3tmqu1sn56x7occdd'
                        },
                        function (data) {

                        })

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
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
    /**
     * 立即支付
     */
    pay: function () {
        var inputJson = {};
        var data = this.data.paydata;
        console.log(data);
        wx.requestPayment({
            'timeStamp': data.TimeStamp,
            'nonceStr': data.NonceStr,
            'package': data.PackAge,
            'signType': 'MD5',
            'paySign': data.PaySign,
            'success': function (res) {
                console.log(res);
            },
            'fail': function (res) {
                console.log(res);
            }
        })


    }
})