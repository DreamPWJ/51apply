// pages/apply/applysubject.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var inputContent = {};//输入内容


Page({
    data: {
        headExamTypeIndex: 0,
        examSubjectIndex: 0,
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
            headExamTypeIndex: options.ExamTypeId - 1
        });
        //考试报名列表
        util.https(app.globalData.api + "/GetHeadExamType", "GET", {
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            },
            this.getHeadExamType
        )

    }
    ,
//考试报名列表
    getHeadExamType: function (data) {
        var headExamTypeArr = [];
        for (var index in data.Data) {
            var item = data.Data[index];
            if (item.IsActive == 1 || item.IsActive == 2) {//只显示IsActive 是1或者2的考试类型
                headExamTypeArr.push(item);
            }

        }
        this.setData({
            headExamType: headExamTypeArr
        });
        //考试科目获取
        this.getExamSubjectHttp(this.data.headExamTypeIndex + 1)
        inputContent["ExamType"] = this.data.headExamType[this.data.headExamTypeIndex].ExamTypeId;
    },

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
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            },
            this.getExamSubject
        )
    },
//考试科目获取
    getExamSubject: function (data) {
        this.setData({
            examSubject: data.Data
        });

    }
    ,
//考试科目选择
    bindexamSubjectPickerChange: function (e) {
        this.setData({
            examSubjectIndex: e.detail.value
        })
        inputContent[e.currentTarget.id] = this.data.examSubject[e.detail.value].SubjectID;
        //考试的省份获取
        util.https(app.globalData.api + "/GetExamProvinceList", "GET", {
                inputJson: {
                    ExamTypeId: this.data.examSubject[e.detail.value].ExamTypeId //考试类型ID  如果给空或者0，则返回全部省份
                },
                praviteKey: 'oiox3tmqu1sn56x7occdd'
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
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            },
            this.getExamPlace
        )
    },

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
    },
    //根据考试的科目和考点来获取对应的增值服务http请求
    getAddServicesHttp: function () {
        util.https(app.globalData.api + "/GetAddServices", "GET", {
                inputJson: {
                    SubjectID: this.data.examSubject[this.data.examSubjectIndex].SubjectID,//用户选中的考试科目ID
                    SchoolId: this.data.examPlace[this.data.examPlaceIndex].SchoolID  //用户选中的考点ID
                },
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            },
            this.getAddServices
        )
    },
    //根据考试的科目和考点来获取对应的增值服务
    getAddServices: function (data) {
        console.log(data);
        this.setData({
            addServices: data.Data
        });
    },

    //点击选择增值服务
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },

    //使用微信内置地图查看位置
    openLocation: function () {
        wx.openLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            scale: 28
        })
    },
    //下一步事件处理函数
    applyperson: function () {
        console.log(inputContent);
        wx.navigateTo({
            url: 'applyperson?inputContent=' + JSON.stringify(inputContent)
        })
    },
})