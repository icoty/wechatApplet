var config = require('../../config')
const app = getApp()

Page({

  inputNumber: function (e) {
    if (e.detail.value) {
      app.globalData.usernumber = e.detail.value
    
      let that = this
      wx.request({
        url: config.service.userAlreadyExistUrl,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: {
          usernumber: app.globalData.usernumber
        },
        success: function (res) {
          if (res.data.code == 0) {
            //用户名可用
            that.setData({
              flag: 1
            })
          } else {
            //用户名非法（已经在数据库中存在）
            wx.showToast({
              title: '该用户名已经被占用',
              icon: "none",
            })
            that.setData({
              flag: 0
            })
          }
          app.globalData.flag = that.data.flag
        },
        fail: function (res) {
          wx.showToast({
            title: 'request userAlreadyExistUrl fail!',
            icon: "none"
          })
        },
        complete: function (res) {
          console.log('complete');
        }
      })
    } else {
      app.globalData.usernumber = undefined
    }
  },
  inputName: function (e) {	// 用于获取输入的账号
    if (e.detail.value) {
      app.globalData.username = e.detail.value	//将获取到的账号赋值给username变
    }
  },
  bindPickerChangeGender(e) {
    if (e.detail.value) {
      this.setData({
        gindex: e.detail.value,
      })
      app.globalData.usergender = this.data.gindex
    }
  },
  inputGender: function (e) {
    console.log(e)
    /*this.setData({
      usergender: e.detail.value
    })*/
    //app.globalData.usergender = this.data.gindex
  },
  bindPickerChangeClass(e) {
    if (e.detail.value) {
      this.setData({
        cindex: e.detail.value,
      })
      app.globalData.userclass = this.data.carray[this.data.cindex]
    }
  },
  inputClass: function (e) {
    /*if (e.detail.value) {
      app.globalData.userclass = e.detail.value
    }*/
  },
  bindPickerChangeMajor(e) {
    if (e.detail.value) {
      this.setData({
        mindex: e.detail.value,
      })
      app.globalData.usermajor = this.data.marray[this.data.mindex]
    }
  },
  inputMajor: function (e) {
    /*if (e.detail.value) {
      app.globalData.usermajor = e.detail.value
    }*/
  },
  inputEmail: function (e) {
    if (e.detail.value) {
      app.globalData.useremail = e.detail.value
    }
  },
  inputPwd1: function (e) {
    if (e.detail.value) {
      this.data.password1 = e.detail.value
    }
  },
  inputPwd2: function (e) {
    if (e.detail.value) {
      this.data.password2 = e.detail.value

      if (this.data.password2 != this.data.password1) {
        wx.showToast({
          title: '两次输入的密码不一致',
          icon: "none"
        })
        this.setData({
          passwordFlag: 0
        })
      } else {
        this.setData({
          passwordFlag: 1
        })
        app.globalData.password = this.data.password1
      }
      app.globalData.passwordFlag = this.data.passwordFlag
    }
  },
  log: function (e) {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  reg: function () {
    wx.login({
      // 调用 login 获取 code
      success: function (res) {
        if (!res.code) {
          return
        }
        console.log(app.globalData)
        var code = res.code
        // 调用 getUserInfo 获取 encryptedData 和 iv
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo
            app.globalData.encryptedData = res.encryptedData
            app.globalData.iv = res.iv
            if (app.globalData.usernumber && app.globalData.username && app.globalData.usergender && app.globalData.usermajor && app.globalData.userclass && app.globalData.useremail && app.globalData.password) {
              if (!app.globalData.flag) {
                wx.showToast({
                  title: '用户名已经被占用，请修改',
                  icon: "none"
                })
              } else if (!app.globalData.passwordFlag) {
                wx.showToast({
                  title: '两次密码不一致',
                  icon: "none"
                })
              } else {
                wx.request({
                  url: config.service.registerUrl,
                  data: {
                    usernumber: app.globalData.usernumber,
                    username: app.globalData.username,
                    usergender: app.globalData.usergender,
                    usermajor: app.globalData.usermajor,
                    userclass: app.globalData.userclass,
                    useremail: app.globalData.useremail,
                    password: app.globalData.password,
                    encryptedData: app.globalData.encryptedData,
                    iv: app.globalData.iv,
                    code: code
                  },
                  //method: "POST",
                  header: {
                    "Content-Type": "application/json"
                  },
                  success: function (res) {
                    if (res.data.code == 0) {
                      app.globalData.login = true
                      wx.showToast({
                        title: '注册成功',
                        success: (res) => {

                        }
                      })
                      wx.switchTab({
                        url: '../userPage/userPage',
                      })
                    } else {
                      /*for (let key in app.globalData) {
                        app.globalData[key] = ''
                      }*/              
                      wx.showToast({
                        title: '注册失败,请重新注册！',
                        icon: "none",
                      })
                    }
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: '您的网络开小差啦~~~',
                      icon: "none"
                    })
                  },
                  complete: function (res) {
                    console.log('submit complete');
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
          fail: function (res) {
            wx.showToast({
              title: '获取用户信息失败!',
              icon: "none"
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: 'wx.login fail',
          icon: "none"
        })
      }
    })
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

  },
  /**
   * 页面的初始数据
   */
  data: {
    password1: undefined,
    password2: undefined,
    passwordFlag: undefined,
    //标示用户名是否可用，1为可用，0为不可用
    flag: undefined,
    garray: ['女', '男'],
    gArray: [
      {
        id: 0,
        name: '女'
      },
      {
        id: 1,
        name: '男'
      },
    ],
    gindex: 1,
    carray: ['未名一苑', '未名二苑', '博雅一苑', '博雅二苑', '朗润一苑', '朗润二苑'],
    cArray: [
      {
        id: 0,
        name: '未名一苑'
      },
      {
        id: 1,
        name: '未名二苑'
      },
      {
        id: 2,
        name: '博雅一苑'
      },
      {
        id: 3,
        name: '博雅二苑'
      },
      {
        id: 4,
        name: '朗润一苑'
      },
      {
        id: 5,
        name: '朗润二苑'
      },
    ],
    cindex: 0,
    marray: ['软件工程', '计算机技术', 'CAT', '云计算', '金融学', '金融与大数据'],
    mArray: [
      {
        id: 0,
        name: '软件工程'
      },
      {
        id: 1,
        name: '计算机技术'
      },
      {
        id: 2,
        name: 'CAT'
      },
      {
        id: 3,
        name: '云计算'
      },
      {
        id: 4,
        name: '金融学'
      },
      {
        id: 5,
        name: '金融与大数据'
      },
    ],
    mindex: 0,
  },
})