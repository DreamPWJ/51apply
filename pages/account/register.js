// pages/account/register.js
var app = getApp();
var util = require('../../utils/util.js');
import WxValidate from '../../utils/validate';
var inputContent = {};//输入内容
Page({
    data: {},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //验证表单
        this.WxValidate = new WxValidate({
                username: {  //验证规则 input name值
                    required: true,
                    minlength: 2,
                    maxlength: 8
                },
                user: {  //验证规则 input name值
                    required: true,
                    idcard: true
                },
                school: {
                    required: true,
                    minlength: 3
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 18
                },
                qq: {
                    required: true,
                    digits: true,
                    minlength: 5
                },

            },
            {
                username: { //提示信息
                    required: "请填写用户姓名"
                },
                user: { //提示信息
                    required: "请填写身份证"
                },
                school: { //提示信息
                    required: "请填写学校名称",
                    minlength: "学校至少输入3个字符",
                },
                password: { //提示信息
                    required: "请填写密码",
                    minlength: "密码至少输入6个字符",
                    maxlength: "密码最多输入18个字符"
                },
                qq: {
                    required: "请填写QQ号 方便密码找回"
                }
            })
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
    //获取用户输入
    bindChange: function (e) {
        inputContent[e.currentTarget.id] = e.detail.value
        console.log(inputContent);
    },
    registerSubmit: function (e) {//登录
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
        //首页活动报名列表
        util.https(app.globalData.api + "/QuickRegister", "GET", {
                inputJson: {
                    Name: inputContent.username,	//姓名
                    QQNumber: inputContent.qq,	//个人qq号，方便密码找回
                    IDCard: inputContent.user,	//身份证号
                    TelNum: "",	//手机号码
                    University: inputContent.school,//学校
                    SearchPwd: inputContent.password,		//密码
                    StuLatitude: wx.getStorageSync("latitude"), //用户的纬度
                    StuLongitude: wx.getStorageSync("longitude"), //用户的经度
                    TypeId: "1",	//注册类型  1 表示身份证号，2表示手机号
                },
                praviteKey: app.globalData.praviteKey
            },
            this.userRegister
        )
    },
    userRegister: function (data) { //用户注册回调
        console.log(data);
        if (data.StatusCode == 0) {
            this.loginSubmit();//注册成功后自动登录
            wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 1000
            })
            wx.switchTab({
                url: '/pages/index/index'
            })

        }
    },
    loginSubmit: function () {//登录
        //首页活动报名列表
        util.https(app.globalData.api + "/UserLogin", "GET", {
                inputJson: {
                    IDCard: inputContent.user,	//身份证号
                    TelNum: "",		//手机号码
                    SearchPwd: inputContent.password,		//密码
                    StuLatitude: wx.getStorageSync("latitude"), //用户的纬度
                    StuLongitude: wx.getStorageSync("longitude"), //用户的经度
                    TypeId: "1",	//注册类型  1 表示身份证号，2表示手机号
                },
                praviteKey: app.globalData.praviteKey
            },
            this.userLogin
        )
    },
    userLogin: function (data) { //用户登录回调
        console.log(data);
        if (data.StatusCode == 0) {
            wx.setStorageSync("StudentId", data.Data.StudentID);//"用户ID"
            wx.setStorageSync("TokenInfo", data.Data.TokenInfo);//"用户Token"
            wx.setStorageSync("userData", data.Data);//用户信息

        }
    }

})