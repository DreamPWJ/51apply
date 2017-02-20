// pages/apply/applyperson.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        date: new Date().Format("yyyy-MM-dd"),
        credentialsIndex: 0,
        credentials: ["身份证", "台湾居民往来大陆通行证", "港澳居民往来大陆通行证", "军人证件", "护照"],
        nationIndex: 0,
        nation: ["汉", "蒙古", "回", "藏", "维吾尔", "苗", "彝", "壮", "布依", "朝鲜", "侗", "瑶", "白", "土家", "哈尼", "哈萨克", "傣", "黎", "其他"],//民族
        professionIndex: 0,
        profession: [{id: "30", name: "学生"}, {id: "04", name: "事业单位负责人"}, {id: "05", name: "企业负责人"}, {
            id: "08",
            name: "军人"
        }, {id: "09", name: "不便分类的其他从业人员"}, {id: "10", name: "失业（含待业及无业人员）"}, {id: "29", name: "其他专业技术人员"}, {
            id: "31",
            name: "行政办公人员"
        }, {id: "46", name: "医疗卫生辅助服务人员"}, {id: "47", name: "社会服务和居民生活服务人员"}, {id: "49", name: "其他行业"}],
        cultureIndex: 0,
        culture: ["大专", "本科", "硕士", "其他"],
        degreeIndex: 0,
        degree: ["学士", "硕士", "博士", "无学位"],
        cultureTypeIndex: 0,
        cultureType: ["全日制", "非全日制"],
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数

        //考试报名列表
        util.https("https://restapi.amap.com/v3/geocode/regeo", "GET", {
                key: '972cafdc2472d8f779c5274db770ac22',
                location: Number(wx.getStorageSync("longitude")).toFixed(6) + "," + Number(wx.getStorageSync("latitude")).toFixed(6)
            },
            this.getCurrentCityInfo
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

    //获取地理位置信息 高德web api
    getCurrentCityInfo: function (data) {
        console.log(data);
        this.setData({
            currentCityAddress: data.status == 1 ? data.regeocode.formatted_address : ""

        })
    },

    //证件类型选择
    bindCredentialsPickerChange: function (e) {
        this.setData({
            credentialsIndex: e.detail.value
        })
    }
    ,

    //民族类型选择
    bindNationPickerChange: function (e) {
        this.setData({
            nationIndex: e.detail.value
        })
    }
    ,
    //时间类型选择
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    //职业类型选择
    bindProfessionPickerChange: function (e) {
        this.setData({
            professionIndex: e.detail.value
        })
    }
    ,
    //学历选择
    bindCulturePickerChange: function (e) {
        this.setData({
            cultureIndex: e.detail.value
        })
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
    }
    ,
})