// pages/apply/applysubject.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var inputContent = {};//输入内容


Page({
    data: {
        headExamTypeIndex: 0,
        examSubjectIndex: 0,
        isSelectExamSubject: false,
        provinceListIndex: 0,
        examPlaceIndex: 0,
        longitude: wx.getStorageSync("longitude"),
        latitude: wx.getStorageSync("latitude"),
        markers: [{
            iconPath: "/images/map/localization.png",
            id: 0,
            latitude: 0,
            longitude: 0,
            width: 20,
            height: 20
        }]

    },

    onLoad: function (options) {

        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            ExamTypeId: options.ExamTypeId
        });
        //考试报名列表
        util.https(app.globalData.api + "/GetHeadExamType", "GET", {
                praviteKey: app.globalData.praviteKey
            },
            this.getHeadExamType
        )
        //误操作提示
        /*        if (!wx.getStorageSync("isManyPeoplePrompt")) {*/
        wx.showModal({
            title: '友情提示',
            content: "请勿使用同一个小程序或App给多人报名，造成信息错误后果自行承担!",
            showCancel: false,
            confirmColor: "#f26604",
            success: function (res) {
                if (res.confirm) {
                    wx.setStorageSync("isManyPeoplePrompt", true);
                    console.log('用户点击确定');
                }
            }
        })
        /*   }*/
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
        //初始化数据
        inputContent.ReceiveName = "";// 表示收件人
        inputContent.ReceiveTel = "";// 表示收件人电话
        inputContent.ReceiveAdd = "";// 表示收件人地址
        //验证表单
        /*        this.wxValidate();*/
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
//考试报名列表
    getHeadExamType: function (data) {
        var headExamTypeArr = [];
        for (var index in data.Data) {
            var item = data.Data[index];
            if (item.IsActive == 1 || item.IsActive == 2) {//只显示IsActive 是1或者2的考试类型
                headExamTypeArr.push(item);
                if (item.ExamTypeId == this.data.ExamTypeId) {
                    this.setData({
                        headExamTypeIndex: index
                    })
                }
            }

        }

        this.setData({
            headExamType: headExamTypeArr
        });
        //考试科目获取
        this.getExamSubjectHttp(this.data.ExamTypeId)
        inputContent["ExamType"] = this.data.headExamType[this.data.headExamTypeIndex].ExamTypeId;
    }
    ,

//考试名称选择
    bindNamePickerChange: function (e) {
        this.setData({
            headExamTypeIndex: e.detail.value
        })
        inputContent[e.currentTarget.id] = this.data.headExamType[e.detail.value].ExamTypeId;
        //考试科目获取
        this.getExamSubjectHttp(this.data.headExamType[e.detail.value].ExamTypeId)
    }
    ,

//获取考试科目请求
    getExamSubjectHttp: function (ExamTypeId) {
        util.https(app.globalData.api + "/GetExamSubject", "GET", {
                inputJson: {
                    ExamTypeId: ExamTypeId//考试类型ID， 如果是培训默认给6.
                },
                praviteKey: app.globalData.praviteKey
            },
            this.getExamSubject
        )
    }
    ,
//考试科目获取
    getExamSubject: function (data) {
        this.setData({
            examSubject: data.Data
        });
        this.getExamProvinceListHttps(this.data.examSubject[0].SubjectID)
    }
    ,
//考试科目选择
    bindexamSubjectPickerChange: function (e) {
        this.setData({
            examSubjectIndex: e.detail.value,
            isSelectExamSubject: true
        })
        inputContent[e.currentTarget.id] = this.data.examSubject[e.detail.value].SubjectID;
        //考试的省份获取
        this.getExamProvinceListHttps(this.data.examSubject[e.detail.value].SubjectID)

    }
    ,
//考试的省份获取
    getExamProvinceListHttps: function (SubjectID) {
        util.https(app.globalData.api + "/GetExamProvinceList", "GET", {
                inputJson: {
                    ExamTypeId: SubjectID //考试类型ID  如果给空或者0，则返回全部省份
                },
                praviteKey: app.globalData.praviteKey
            },
            this.getExamProvinceList
        )
    }
    ,
//考试的省份获取
    getExamProvinceList: function (data) {
        this.setData({
            examProvinceList: data.Data
        });
        inputContent["ProvinceName"] = this.data.examProvinceList[0].ProvinceName;
        //考点获取
        this.getExamPlaceHttp();
    }
    ,
//考试的省份选择
    bindProvincePickerChange: function (e) {
        this.setData({
            provinceListIndex: e.detail.value
        })
        inputContent[e.currentTarget.id] = this.data.examProvinceList[e.detail.value].ProvinceName;
        //考点获取
        this.getExamPlaceHttp(e);
    }
    ,
//考点获取http请求
    getExamPlaceHttp: function (e) {
        util.https(app.globalData.api + "/GetExamPlace", "GET", {
                inputJson: {
                    SubjectID: this.data.examSubject[this.data.examSubjectIndex].SubjectID,//用户选中的考试科目ID,如果有多个，一定要加,号分割，如果只有一个科目一定不要加,号.
                    Latitude: wx.getStorageSync("latitude"), //纬度
                    Longitude: wx.getStorageSync("longitude"), //经度
                    ProvinceName: this.data.examProvinceList[e ? e.detail.value : 0].ProvinceName //省份名称,可以为空
                },
                praviteKey: app.globalData.praviteKey
            },
            this.getExamPlace
        )
    }
    ,

//考点获取
    getExamPlace: function (data) {
        console.log(data);
        this.setData({
            examPlace: data.Data,
            examPlaceItem: data.Data[0],
            longitude: data.Data[0].Longitude,
            latitude: data.Data[0].Latitude,
            'markers[0].latitude': data.Data[0].Latitude,
            'markers[0].longitude': data.Data[0].Longitude
        });
        inputContent["SchoolID"] = this.data.examPlace[0].SchoolID;
        //根据考试的科目和考点来获取对应的增值服务
        this.getAddServicesHttp();
    }
    ,
//考点获取选择
    bindExamPlacePickerChange: function (e) {
        this.setData({
            examPlaceIndex: e.detail.value,
            examPlaceItem: this.data.examPlace[e.detail.value],
            longitude: this.data.examPlace[e.detail.value].Longitude,
            latitude: this.data.examPlace[e.detail.value].Latitude,
            'markers[0].latitude': this.data.examPlace[e.detail.value].Latitude,
            'markers[0].longitude': this.data.examPlace[e.detail.value].Longitude
        })
        inputContent[e.currentTarget.id] = this.data.examPlace[e.detail.value].SchoolID;
        //根据考试的科目和考点来获取对应的增值服务
        this.getAddServicesHttp();
    }
    ,
//根据考试的科目和考点来获取对应的增值服务http请求
    getAddServicesHttp: function () {
        util.https(app.globalData.api + "/GetAddServices", "GET", {
                inputJson: {
                    SubjectID: this.data.examSubject[this.data.examSubjectIndex].SubjectID,//用户选中的考试科目ID
                    SchoolId: this.data.examPlace[this.data.examPlaceIndex].SchoolID  //用户选中的考点ID
                },
                praviteKey: app.globalData.praviteKey
            },
            this.getAddServices
        )
    }
    ,
//根据考试的科目和考点来获取对应的增值服务
    getAddServices: function (data) {
        console.log(data);
        this.setData({
            addServices: data.Data
        });
    }
    ,

//点击选择增值服务
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
        var serveArr = e.detail.value;
        if (this.data.addServices.BookList.length != 0) { //没有教材， 也不显示那个快递费
            serveArr = e.detail.value.slice(1);//去掉默认快递费数组
        }
        //模拟考试ID，0表示没参加。最多传入一个考试科目ID 勾选了模拟考试就给1，没勾就给0
        inputContent["IsJoin"] = serveArr.length == 0 ? 0 : 1;
        //需要的教材ID，如果有多本就用,号分割，没有预定就是0
        inputContent["BookID"] = serveArr.length <= 1 ? 0 : e.detail.value.slice(1).join(",");
    }
    ,

//使用微信内置地图查看位置
    openLocation: function () {
        wx.openLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            scale: 18
        })
    }
    ,
//获取用户输入
    bindChange: function (e) {
        inputContent[e.currentTarget.id] = e.detail.value
        console.log(inputContent);
    }
    ,
//下一步事件处理函数
    applyperson: function () {
        console.log(inputContent);
        wx.navigateTo({
            url: 'applyperson?inputContent=' + JSON.stringify(inputContent)
        })
    }
    ,
})