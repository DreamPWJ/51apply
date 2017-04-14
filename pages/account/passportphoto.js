// pages/account/passportphoto.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {isLogin: util.isLogin()},
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
            //证件照

        }
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },

    shootCredentials: function () {//图片上传
        //选择上传文件
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: app.globalData.api + '/SetExamPicture', //开发者服务器 url
                    filePath: tempFilePaths[0],//要上传文件资源的路径
                    name: 'file',//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                    formData: { //HTTP 请求中其他额外的 form data
                        'inputJson': {
                            'PicType': 1,////照片类型,1表示计算机考试，2表示教师资格，3表示会计,4考霸或用户的icon,5 考霸证书的照片,6课程的图片,7 课程的附件
                        },
                        'userId': wx.getStorageSync("StudentId"),
                        'Token': wx.getStorageSync("TokenInfo"),

                    },
                    success: function (res) {
                        console.log(res);
                        var data = res.data;//开发者服务器返回的数据
                        //do something
                    }, fail: function (error) {
                        console.log(error);
                    }
                })
            }
        })
    }
})