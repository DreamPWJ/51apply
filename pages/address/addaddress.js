// pages/address/addaddress.js
var app = getApp();
var util = require('../../utils/util.js');
import WxValidate from '../../utils/validate';
var inputContent = {};//输入内容
Page({
    data: {},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数

    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        //验证表单
        this.WxValidate = new WxValidate({
                ReceiveName: {  //验证规则 input name值
                    required: true,
                    minlength: 2,
                    maxlength: 6
                },
                ReceiveTel: {
                    required: true,
                    tel: true
                },
                ReceiveAdd: {
                    required: true,
                    minlength: 5
                },

            },
            {
                ReceiveName: { //提示信息
                    required: "请填写收件人",
                },
                ReceiveTel: { //提示信息
                    required: "请填写手机号码"
                },
                ReceiveAdd: { //提示信息
                    required: "请填写收货地址",
                    minlength: "收货地址至少输入五个字符"
                }
            })
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    //获取用户输入
    bindChange: function (e) {
        inputContent[e.currentTarget.id] = e.detail.value
        console.log(inputContent);
    },
    addAddressSubmit: function (e) { //增加地址
        //调用验证表单方法
        const params = e.detail.value
        console.log(params);
        if (!this.WxValidate.checkForm(e)) {
            const error = this.WxValidate.errorList
            wx.showModal({
                title: '友情提示',
                content: error[0].msg,
                showCancel: false,
                confirmColor: "#f26604",
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    }
                }
            })
            console.log(error)

            return false
        }
        util.https(app.globalData.api + "/SetMyAddress", "GET", {
                inputJson: {
                    ReceiveName: inputContent.ReceiveName,	//表示收件人
                    ReceiveTel: inputContent.ReceiveTel,	// 表示收件人电话
                    ReceiveAdd: inputContent.ReceiveAdd,	//表示收件人地址
                },
                userId: wx.getStorageSync("StudentId"),//用户id
                tokenInfo: wx.getStorageSync("TokenInfo"), //用户token
            },
            function (data) {
                console.log(data);
                //返回上一页
                wx.navigateBack({
                    delta: 1
                })
            }
        )
    }
})