// pages/apply/applyperson.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var inputContent = {};//输入内容
Page({
    data: {
        date: new Date().Format("yyyy-MM-dd"),
        entranceDate: new Date().Format("yyyy"),
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
        sexIndex: 0,
        sex: ["男", "女"]
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数

        //考试的动态填写字段获取 不同的考试，有些自己特有的字段
        util.https(app.globalData.api + "/GetExamTypeFieldList", "GET", {
                inputJson: {
                    ExamTypeId: 1 //考试类型ID
                },
                praviteKey: 'oiox3tmqu1sn56x7occdd'
            },
            this.getExamTypeFieldList
        )
        //获取地理位置信息 高德web api
        util.https("https://restapi.amap.com/v3/geocode/regeo", "GET", {
                key: '972cafdc2472d8f779c5274db770ac22',
                location: Number(wx.getStorageSync("longitude")).toFixed(6) + "," + Number(wx.getStorageSync("latitude")).toFixed(6)
            },
            this.getCurrentCityInfo
        )
        //初始化数据
        inputContent["IDType"] = this.data.credentials[0];
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

    //考试的动态填写字段获取 不同的考试，有些自己特有的字段
    getExamTypeFieldList: function (data) {
        console.log(data);
        this.setData({
            examTypeFieldList: data.Data

        })
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
        inputContent[e.currentTarget.id] = this.data.credentials[e.detail.value]

    },

    //民族类型选择
    bindNationPickerChange: function (e) {
        this.setData({
            nationIndex: e.detail.value
        })
    },

    //时间类型选择
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    //入学时间类型选择
    bindEntranceDateChange: function (e) {
        this.setData({
            entranceDate: e.detail.value
        })
    },
    //职业类型选择
    bindProfessionPickerChange: function (e) {
        this.setData({
            professionIndex: e.detail.value
        })
    },
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
    },
    //性别类型选择
    bindSexPickerChange: function (e) {
        this.setData({
            sexIndex: e.detail.value
        })
    },
    //获取用户输入
    bindChange: function (e) {
        inputContent[e.currentTarget.id] = e.detail.value
        console.log(inputContent);
    },
    /**
     * 考试报名最终提交数据
     */
    applySubmit: function () {
        var inputJson = {
            OperatorType: 1,// 如果用户没登陆过，就给0，登录过给1 "提交类别" 1表示没有注册过，第一次报名提交，2表示已经快速注册,3 表示立即支付进入
            //  Name: "",  //姓名
            //   SearchPwd: "", //登录密码，如果是已经注册过的用户不需要再次传入密码，直接设置为空
            //  IDType: "", //1表示身份证号
            //   IDCard: "", //证件号,该值必须传入
            Birthday: 19960101, // 自动获取身份证号中的8位
            Nation: "",  //民族
            Job: "学生", //职位
            TelNum: "13800138000", //手机号
            QQNumber: "", //qq号
            University: "深圳大学",//学校
            Colledge: "计算机学院",//学院
            Education: "本科", //学历
            Admssion: "2010",   //入学年份字符串
            GraduationTime: "2014", //毕业年份，毕业年份不需要填，直接根据入学年份加上学历就算出毕业年份了
            MajorCode: "计算机技术",  //专业
            ClassCode: "1班",          //班级
            Address: "武汉市金融港", //用户当前地址

            SchoolID: "1",       //考点ID号，该值必须传入
            SubjectId: "4",    //科目ID号，该值必须传入
            ExamType: "1",  //包括类型，1表示计算机考试，2表示会计，3表示教师资格…，该值必须传入
            ProvinceName: "湖北省",//省份名称
            ExamDate: "2016年3月", //考试的预约日期
            BookID: "0", //需要的教材ID，如果有多本就用,号分割，没有预定就是0
            IsJoin: "0"  //模拟考试ID，0表示没参加。最多传入一个考试科目ID 勾选了模拟考试就给1，没勾就给0
        };
        console.log(inputJson);
        //预约考试报名数据提交
        /*    util.https(app.globalData.api + "/SetOrderExamInfo", "GET", {
         inputJson: inputJson,
         praviteKey: 'oiox3tmqu1sn56x7occdd'
         },
         function (data) {
         console.log(data);
         }
         )*/
    }
})