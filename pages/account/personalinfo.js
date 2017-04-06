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
            //初始化数据
            //民族
            inputContent["Nation"] = this.data.userData.Nation || this.data.nation[0];
            if (this.data.userData.Nation) {
                this.setData({
                    nationIndex: this.data.nation.indexOf(this.data.userData.Nation)
                })
            }
            //职业
            inputContent["Job"] = this.data.userData.Job || this.data.profession[0];
            if (this.data.userData.Job) {
                this.setData({
                    professionIndex: this.data.profession.indexOf(this.data.userData.Job)
                })
            }
            //学历
            inputContent["Education"] = this.data.userData.Education || this.data.culture[0];
            if (this.data.userData.Education) {
                this.setData({
                    cultureIndex: this.data.culture.indexOf(this.data.userData.Education)
                })
            }
            //入学时间
            inputContent["Admssion"] = this.data.userData.Admssion || this.data.entranceDate[0];
            if (this.data.userData.Admssion) {
                this.setData({
                    entranceDate: this.data.userData.Admssion
                })
            }
            inputContent["Birthday"] = this.data.userData.Birthday || this.data.date.replace(/-/g, "");
            if (this.data.userData.Birthday) {
                this.setData({
                    date: this.data.userData.Birthday
                })
            }
            inputContent["Gender"] = this.data.userData.Gender || 1;
            if (this.data.userData.Gender) {
                this.setData({
                    sexIndex: this.data.userData.Gender - 1
                })
            }
            this.wxValidate();
        }

    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    wxValidate: function () {
        //验证表单
        this.WxValidate = new WxValidate({
                IDCard: { //验证规则 input name值
                    required: true,
                    idcard: true
                },
                Name: {
                    required: true,
                    minlength: 2
                },
                TelNum: {
                    required: true,
                    tel: true
                },
                QQNumber: {
                    required: true,
                    digits: true,
                    minlength: 5
                },
                University: {
                    required: true,
                    minlength: 4
                },
                Colledge: {
                    required: true
                },
                MajorCode: {
                    required: true
                },
                ClassCode: {
                    required: true
                },
            },
            {
                IDCard: { //提示信息
                    required: "请填写身份证号"
                },
                Name: { //提示信息
                    required: "请填写真实姓名",
                    minlength: "姓名至少输入两个字符"
                },
                TelNum: { //提示信息
                    required: "请填写真实手机号码"
                },
                QQNumber: { //提示信息
                    required: "请填写QQ号码"
                },

                University: { //提示信息
                    required: "请填写学校名称",
                    minlength: "学校名称至少输入四个字符"
                },
                Colledge: { //提示信息
                    required: "请填写学院信息"
                },
                MajorCode: { //提示信息
                    required: "请填写专业信息"
                },
                ClassCode: { //提示信息
                    required: "请填写班级信息"
                }
            })

    },
    //证件类型选择
    bindCredentialsPickerChange: function (e) {
        this.setData({
            credentialsIndex: e.detail.value
        })
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
        inputContent[e.currentTarget.id] = this.data.degree[e.detail.value]
    },
    //学历类型选择
    bindCultureTypePickerChange: function (e) {
        this.setData({
            cultureTypeIndex: e.detail.value
        })
        inputContent[e.currentTarget.id] = this.data.cultureType[e.detail.value]
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
        //调用验证表单方法
        const params = e.detail.value
        console.log(params);
        inputContent = util.mergeJsonObject(inputContent, params);
        console.log(inputContent);
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
        // 毕业年份，毕业年份不需要填，直接根据入学年份加上学历就算出毕业年份了
        var seniorYear = inputContent.Admssion
        if (this.data.cultureIndex == 0) {
            seniorYear = Number(seniorYear) + 3;
        } else if (this.data.cultureIndex == 1) {
            seniorYear = Number(seniorYear) + 4;
        } else if (this.data.cultureIndex == 2) {
            seniorYear = Number(seniorYear) + 6;
        }

        inputContent.GraduationTime = seniorYear;
        //个人信息修改
        // 所有有登录状态接口默认带上userId和token。没有登录状态的接口默认带上pkey.防止其他方非法使用web服务的访问
        util.https(app.globalData.api + "/UpdateUserProfile", "GET", {
                userId: wx.getStorageSync("StudentId"),//用户id
                tokenInfo: wx.getStorageSync("TokenInfo"), //用户token
                inputJson: inputContent /*{
                 //  Gender: 1,//1表示男，2表示女
                 //  Name: "报考名",  //姓名
                 //  Nation: "汉",  //民族
                 //  Job: "php工程师", //职位
                 //  TelNum: "13800138000", //手机号
                 //   QQNumber: "123456780", //qq号
                 //   University: "深圳大学",
                 //  Colledge: "文华学院",
                 //   Education: "本科", //学历
                 Admssion: "2010",   //入学年份
                 GraduationTime: "2014", //毕业年份，毕业年份不需要填，直接根据入学年份加上学历就算出毕业年份了
                 //   MajorCode: "计算机技术",  //专业
                 //   ClassCode: "1班",          //班级
                 //   StudentNum: "123456",  //考生学号
                 //  Birthday: "19900101",  //考生生日
                 //  Address: "武汉科技大学"  //考生当前报名地址
                 }*/
            },
            function (data) {
                console.log(data);
                util.showToast(data.Msg);
                if (data.StatusCode == 0) {
                    //获取用户信息
                    util.https(app.globalData.api + "/GetUserProfile", "GET", {
                            inputJson: {
                                StudentID: wx.getStorageSync("StudentId"),	//身份证号
                            },
                            userId: wx.getStorageSync("StudentId"),//用户id
                            tokenInfo: wx.getStorageSync("TokenInfo"), //用户token
                        },
                        function (data) {
                            if (data.StatusCode == 0) {
                                console.log(data);
                                wx.setStorageSync("userData", data.Data);//用户信息
                            }
                        }
                    )
                }
            }
        )
    }
})