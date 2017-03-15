// pages/pay/applypay.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        paydata: {}
    },
    onLoad: function (options) {
        console.log(JSON.parse(options.inputJson));
        options.inputJson = JSON.parse(options.inputJson);
        // 页面初始化 options为页面跳转所带来的参数
        //调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid）
        if (!wx.getStorageSync("openId")) { //初次授权登录 获取openid
            wx.login({
                success: function (res) {
                    if (res.code) {
                        //发起网络请求
                        console.log(res);
                        //根据微信Code获取对应的openId
                        util.https(app.globalData.api + "/GetOpenidFromJsCode", "GET", {
                                inputJson: {JsCode: res.code},
                                praviteKey: app.globalData.praviteKey
                            },
                            function (data) {
                                console.log(data);
                                if (data.StatusCode == 0) {
                                    wx.setStorageSync("openId", data.Data.OpenId);//微信openid
                                    options.inputJson.OpenId = data.Data.OpenId;
                                    //微信小程序考试报名数据提交
                                    this.setWXOrderExamInfo(options.inputJson);
                                }

                            })

                    } else {
                        console.log('获取用户登录状态失败！' + res.errMsg);
                    }
                }
            });
        } else {
            options.inputJson.OpenId = wx.getStorageSync("openId");
            this.setWXOrderExamInfo(options.inputJson)
        }

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
     * 微信小程序考试报名数据提交
     */
    setWXOrderExamInfo: function (inputJson) {
        console.log(inputJson);
        util.https(app.globalData.api + "/SetWXOrderExamInfo", "GET", {
                inputJson: inputJson,
                praviteKey: app.globalData.praviteKey
            },
            this.setWXOrderExamInfoCallBack)
    },
    setWXOrderExamInfoCallBack: function (data) {
        console.log(data);
        if (data.StatusCode == 0) {
            wx.setStorageSync("StudentId", data.Data.StudentId);//"用户ID"
            wx.setStorageSync("TokenInfo", data.Data.TokenInfo);//"用户Token"

            this.setData({
                paydata: data.Data
            })
        }
    },
    /**
     * 立即支付
     */
    pay: function () {
        var data = this.data.paydata;
        console.log(this.data.paydata);
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