// pages/apply/applyperson.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var inputContent = {};//输入内容
import WxValidate from '../../utils/validate'
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
        console.log(options);
        // 页面初始化 options为页面跳转所带来的参数
        inputContent = JSON.parse(options.inputContent);//接受上一步操作参数
        //考试的动态填写字段获取 不同的考试，有些自己特有的字段
        util.https(app.globalData.api + "/GetExamTypeFieldList", "GET", {
                inputJson: {
                    ExamTypeId: inputContent.ExamType //考试类型ID
                },
                praviteKey: app.globalData.praviteKey
            },
            this.getExamTypeFieldList
        )
        //获取地理位置信息 高德web api
        /*        util.https("https://restapi.amap.com/v3/geocode/regeo", "GET", {
         key: '972cafdc2472d8f779c5274db770ac22',
         location: Number(wx.getStorageSync("longitude")).toFixed(6) + "," + Number(wx.getStorageSync("latitude")).toFixed(6)
         },
         this.getCurrentCityInfo
         )*/
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
        inputContent.AutoData = [];
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
        console.log(wx.getStorageSync("userData"));
        //验证表单
        this.wxValidate();
        if (this.data.isLogin) { //已登录
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
                SearchPwd: {
                    required: !this.data.isLogin,
                    minlength: 6,
                    maxlength: 18
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
                SearchPwd: { //提示信息
                    required: "请填写密码",
                    minlength: "密码至少输入6个字符",
                    maxlength: "密码最多输入18个字符"
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
    //考试的动态填写字段获取 不同的考试，有些自己特有的字段
    getExamTypeFieldList: function (data) {
        console.log(data);
        this.setData({
            examTypeFieldList: data.Data

        })
    },

    //获取地理位置信息 高德web api
    /*    getCurrentCityInfo: function (data) {
     console.log(data);
     this.setData({
     currentCityAddress: data.status == 1 ? data.regeocode.formatted_address : ""

     })
     },*/

    //证件类型选择
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
        if (this.data.professionIndex == 0) {
            //验证表单
            this.wxValidate();
        } else {
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
                    SearchPwd: {
                        required: !this.data.isLogin,
                        minlength: 6,
                        maxlength: 18
                    },
                    Address: {
                        required: true,
                        minlength: 5
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
                    SearchPwd: { //提示信息
                        required: "请填写密码",
                        minlength: "密码至少输入6个字符",
                        maxlength: "密码最多输入18个字符"
                    },
                    Address: { //提示信息
                        required: "请填写联系地址",
                        minlength: "联系地址至少输入五个字符"
                    },

                })
        }


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
    //获取用户输入的动态字段
    bindChangeAuto: function (e) {
        inputContent.AutoData.push({
            TypeFieldId: e.currentTarget.id,//自动字段ID，来源于接口99的返回
            AutoValue: e.detail.value //自动字段用户填写输入的信息
        })
        console.log(inputContent);
    },
    /**
     * 考试报名最终提交数据
     */
    applySubmit: function (e) {
        //调用验证表单方法
        const params = e.detail.value
        console.log(params);
        if (this.data.isLogin) { //已登录自动获取数据
            inputContent.SearchPwd = "";
            inputContent = util.mergeJsonObject(inputContent, params)
        }
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

        var inputJson = {
            OperatorType: !wx.getStorageSync("TokenInfo") ? 1 : 2,// 如果用户没登陆过，就给0，登录过给1 "提交类别" 1表示没有注册过，第一次报名提交，2表示已经快速注册,3 表示立即支付进入
            //  Name: "",  //姓名
            //   SearchPwd: "", //登录密码，如果是已经注册过的用户不需要再次传入密码，直接设置为空
            //  IDType: "", //1表示身份证号
            //   IDCard: "", //证件号,该值必须传入
            // Birthday: 19960101, // 自动获取身份证号中的8位
            // Gender:1,//1表示男，2表示女
            //  Nation: "",  //民族
            // Job: "学生", //职位
            // TelNum: "13800138000", //手机号
            // QQNumber: "", //qq号
            // University: "深圳大学",//学校
            // Colledge: "计算机学院",//学院
            // Education: "本科", //学历
            //  Admssion: "2010",   //入学年份字符串
            //  GraduationTime: "2014", //毕业年份，毕业年份不需要填，直接根据入学年份加上学历就算出毕业年份了
            // MajorCode: "计算机技术",  //专业
            // ClassCode: "1班",          //班级
            // Address: "武汉市金融港", //用户当前地址

            //    SchoolID: "1",       //考点ID号，该值必须传入
            //  SubjectId: "4",    //科目ID号，该值必须传入
            //   ExamType: "1",  //包括类型，1表示计算机考试，2表示会计，3表示教师资格…，该值必须传入
            //  ProvinceName: "湖北省",//省份名称
            // IsJoin: "0",  //模拟考试ID，0表示没参加。最多传入一个考试科目ID 勾选了模拟考试就给1，没勾就给0
            // BookID: "0", //需要的教材ID，如果有多本就用,号分割，没有预定就是0
            // ReceiveName: "",// 表示收件人
            // ReceiveTel: "", // 表示收件人电话
            // ReceiveAdd: "",// 表示收件人地址
            //  OpenId: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",// 微信用户标示
            /*AutoData: [
             {
             TypeFieldId: "",//自动字段ID，来源于接口99的返回
             AutoValue: "" //自动字段用户填写输入的信息
             }]*/

        }


//根据身份证 自动获取生日和性别
        if (this.data.credentialsIndex == 0) {
            var iIdNo = inputContent.IDCard;
            var sex = "";
            var tmpStr = "";
            if (iIdNo.length == 15) {
                tmpStr = iIdNo.substring(6, 12);
                tmpStr = "19" + tmpStr;
                sex = (iIdNo.substring(14, 15)) % 2 == 0 ? 2 : 1
            }
            else {
                tmpStr = iIdNo.substring(6, 14);
                sex = (iIdNo.substring(16, 17)) % 2 == 0 ? 2 : 1
            }

            inputJson.Birthday = tmpStr;
            inputJson.Gender = sex;
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


        inputJson.GraduationTime = seniorYear;
        console.log(util.mergeJsonObject(inputJson, inputContent));

//支付页面
        wx.navigateTo({
            url: '../pay/applypay?inputJson=' + JSON.stringify(util.mergeJsonObject(inputJson, inputContent))
        })
    }
})