// pages/apply/applysubject.js
//获取应用实例
var app = getApp()
Page({
    data: {
        array: ['美国', '中国', '巴西', '日本'],
        objectArray: [
            {
                id: 0,
                name: '美国'
            },
            {
                id: 1,
                name: '中国'
            },
            {
                id: 2,
                name: '巴西'
            },
            {
                id: 3,
                name: '日本'
            }
        ],
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