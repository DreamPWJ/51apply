// pages/apply/applysubject.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        markers: [{
            iconPath: "/images/map/localization.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 20,
            height: 20
        }],
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.21229
            }],
            color: "#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        controls: [{
            id: 1,
            iconPath: '/images/map/localization.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 20,
                height: 20
            },
            clickable: true
        }]
    },


    onLoad: function () {
        //考试报名列表
        util.https(app.globalData.api + "/GetHeadExamType", "GET", {
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            }
            ,
            this.getHeadExamType
        )

    },
    //考试报名列表
    getHeadExamType: function (data) {
        console.log(data);
        this.setData({
            headExamType: data.Data
        });

    },
    //事件处理函数
    applyperson: function () {
        wx.navigateTo({
            url: 'applyperson'
        })
    },
    //地区选择
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    }
})