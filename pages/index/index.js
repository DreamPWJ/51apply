//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        hiddenLoading: false
    },

    onLoad: function () {
        //考试报名列表
        util.https(app.globalData.api + "/GetHeadExamType", "GET", {
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            }
            ,
            this.getHeadExamType
        )
        //章节练习
        util.https(app.globalData.api + "/GetNewestTestTitle", "GET", {
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            },
            this.getExamTestList
        )
    },
    //考试报名列表
    getHeadExamType: function (data) {
        console.log(data);
        this.setData({
            headExamType: data.Data
        });

    },
    //章节练习
    getExamTestList: function (data) {
        this.setData({
            examTestList: data.Data
        });

    },

})
