// pages/account/personalinfo.js
var app = getApp();
var util = require('../../utils/util.js');
import WxValidate from '../../utils/validate';
var inputContent = {};//输入内容
Page({
    data: {
        isLogin: util.isLogin(),
        date: new Date().Format("yyyy-MM-dd"),
        entranceDate: new Date().Format("yyyy"),
        credentialsIndex: 0,
        credentials: ["身份证", "台湾居民往来大陆通行证", "港澳居民往来大陆通行证", "军人证件", "护照"],
        nationIndex: 0,
        nation: ["汉", "蒙古", "回", "藏", "维吾尔", "苗", "彝", "壮", "布依", "朝鲜", "侗", "瑶", "白", "土家", "哈尼", "哈萨克", "傣", "黎", "其他"],//民族
        professionIndex: 0,
        profession: ["学生", "事业单位负责人", "企业负责人", "军人", "不便分类的其他从业人员", "失业（含待业及无业人员）", "其他专业技术人员", "行政办公人员", "医疗卫生辅助服务人员", "社会服务和居民生活服务人员", "其他行业"],
        cultureIndex: 0,
        culture: ["大专", "本科", "硕士"],
        degreeIndex: 0,
        degree: ["学士", "硕士", "博士", "无学位"],
        cultureTypeIndex: 0,
        cultureType: ["全日制", "非全日制"],
        sexIndex: 0,
        sex: ["男", "女"]
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //初始化数据
        inputContent["IDType"] = 1;
        inputContent["Nation"] = this.data.nation[0];
        inputContent["Job"] = this.data.profession[0];
        inputContent["Admssion"] = this.data.entranceDate[0];
        inputContent["Education"] = this.data.culture[0];
        if (this.data.credentialsIndex != 0) {
            inputContent["Birthday"] = this.data.date.replace(/-/g, "");
            inputContent["Gender"] = 1;
        }
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
            //个人信息

        }
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },  //证件类型选择
    bindCredentialsPickerChange: function (e) {
        this.setData({
            credentialsIndex: e.detail.value
        })
        inputContent[e.currentTarget.id] = Number(e.detail.value) + 1;

    },

    //民族类型选择
    bindNationPickerChange: function (e) {
        this.setData({
            nationIndex: e.detail.value
        })
        inputContent[e.currentTarget.id] = this.data.nation[e.detail.value]
    },

    //时间类型选择
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
        inputContent[e.currentTarget.id] = this.data.date.replace(/-/g, "");
    },
    //入学时间类型选择
    bindEntranceDateChange: function (e) {
        this.setData({
            entranceDate: e.detail.value
        })
        inputContent[e.currentTarget.id] = e.detail.value
    },
    //职业类型选择
    bindProfessionPickerChange: function (e) {
        this.setData({
            professionIndex: e.detail.value
        })

        inputContent[e.currentTarget.id] = this.data.profession[e.detail.value]
    },
    //学历选择
    bindCulturePickerChange: function (e) {
        this.setData({
            cultureIndex: e.detail.value
        })
        inputContent[e.currentTarget.id] = this.data.culture[e.detail.value]
    },
    //学士选择
    bindDegreePickerChange: function (e) {
        this.setData({
            degreeIndex: e.detail.value
        })
    },
    //学历类型选择
    bindCultureTypePickerChange: function (e) {
        this.setData({
            cultureTypeIndex: e.detail.value
        })
    },
    //性别类型选择
    bindSexPickerChange: function (e) {
        this.setData({
            sexIndex: e.detail.value
        })
        inputContent[e.currentTarget.id] = Number(e.detail.value) + 1;
    },
    //获取用户输入
    bindChange: function (e) {
        inputContent[e.currentTarget.id] = e.detail.value
        console.log(inputContent);
    },
    /**
     * 个人信息提交数据
     */
    personalInfoSubmit: function (e) {

    }
})