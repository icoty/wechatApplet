var config = require('../../config')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    usernumber: undefined,
    username: undefined,
    usergender: undefined,
    usermajor: undefined,
    userclass: undefined,
    username: undefined,
    useremail: undefined,
    password1: undefined,
    password2: undefined,
    passwordFlag: undefined,
    //标示用户名是否可用，1为可用，0为不可用
    flag: undefined,
    array: ['男', '女'],
    genderArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      },
    ],
    index: 0
  },
  inputNumber: function (e) {	// 用于获取输入的账号
    if (e.detail.value) {
      this.setData({
        usernumber: e.detail.value	//将获取到的账号赋值给username变量
      })
    
      var currentFlag = 1;
      var that = this;
      wx.request({
        url: config.service.userAlreadyExistUrl,
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        data: {		//向服务器发送的信息
          usernumber: this.data.usernumber,
        },      
        success: function (res) {
          if (res.data.resultObj == 1) {
            //用户名可用
            currentFlag = 1
            that.setData({
              flag: currentFlag
            })
          } else {
            //用户名非法（已经在数据库中存在）
            currentFlag = 0
            wx.showToast({
              title: '该用户名已经被占用',
              icon: "none",
            })
            that.setData({
              flag: currentFlag
            })
          }
        }
      })
    } else {
      this.setData({
        usernumber: undefined
      })
    }
  },
  inputName: function (e) {	// 用于获取输入的账号
    if (e.detail.value) {
      this.setData({
        username: e.detail.value	//将获取到的账号赋值给username变量
      })
    }
  },
  bindPickerChange(e) {
    if (e.detail.value) {
      this.setData({
        index: e.detail.value,
        usergender : this.data.array[this.data.index]
      })
    }
  },
  inputGender: function (e) {		// 用于获取输入的密码
    /*console.log(e)
    this.setData({
      usergender: e.detail.value,	//将获取到的账号赋值给passwd变量
    })*/
  },
  inputMajor: function (e) {	// 用于获取输入的账号
    if (e.detail.value) {
      this.setData({
        usermajor: e.detail.value	//将获取到的账号赋值给username变量
      })
    }
  },
  inputClass: function (e) {	// 用于获取输入的账号
    if (e.detail.value) {
      this.setData({
        userclass: e.detail.value	//将获取到的账号赋值给username变量
      })
    }
  },
  inputEmail: function (e) {	// 用于获取输入的账号
    if (e.detail.value) {
      this.setData({
        useremail: e.detail.value	//将获取到的账号赋值给username变量
      })
    }
  },
  inputPwd1: function (e) {		// 用于获取输入的密码
    if (e.detail.value) {
      this.setData({
        password1: e.detail.value	//将获取到的账号赋值给passwd变量
      })
    }
  },
  inputPwd2: function (e) {		// 用于获取输入的密码
    if (e.detail.value) {
      this.setData({
        password2: e.detail.value
      })
      var currentFlag = 1
      var that = this;
      if (this.data.password2 != this.data.password1) {
        wx.showToast({
          title: '两次密码不一致',
          icon: "none"
        })
        currentFlag = 0
        that.setData({
          passwordFlag: 0
        })
      } else {
        that.setData({
          passwordFlag: 1
        })
      }
    }
  },
  log: function (e) {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  reg: function () {
    if (this.data.usernumber && this.data.username && this.data.usergender && this.data.usermajor && this.data.userclass && this.data.usermajor && this.data.useremail && this.data.password1 && this.data.password2) {
      if (!this.data.flag) {
        wx.showToast({
          title: '用户名已经被占用，请修改',
          icon: "none"
        })
      } else if (!this.data.passwordFlag) {
        wx.showToast({
          title: '两次密码不一致',
          icon: "none"
        })
      }
      else {
        wx.showToast({
          title: '注册成功',
          success: (res) => {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
        })
        wx.request({
          url: registerUrl,
          data: {
            usernumber: this.data.usernumber,
            username: this.data.username,
            usergender: this.data.usergender,
            usermajor: this.data.usermajor,
            userclass: this.data.userclass,
            useremail: this.data.useremail,
            password1: this.data.password1,
            password2: this.data.password2,
          },
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            console.log(res)
            wx.redirectTo({
              url: '../index/index',
            })
          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整后提交',
        showCancel: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})