var config = require('../../config')
const app = getApp()

Page({
  data: {		//此处定义本页面中的全局变量
    usernumber: '',
    password: ''
  },
  inputName: function (e) {	// 用于获取输入的账号
    if (e.detail.value) {
      app.globalData.usernumber = e.detail.value
    }
  },
  inputPwd: function (e) {		// 用于获取输入的密码
    if (e.detail.value) {
      app.globalData.password = e.detail.value
    }
  },
  reg: function (e) {
    wx.redirectTo({
      url: '../register/register',
    })
  },
  log: function (e) {




    wx.login({
      // 调用 login 获取 code
      success: function (res) {
        if (!res.code) {
          return
        }
        console.log(res)
        var code = res.code;

        // 调用 getUserInfo 获取 encryptedData 和 iv
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            app.globalData.userInfo = res.userInfo
            app.globalData.encryptedData = res.encryptedData
            app.globalData.iv = res.iv

            if (app.globalData.usernumber && app.globalData.password) {
              wx.request({
                url: config.service.loginUrl,
                header: {
                  "content-type": 'application/json'		//使用POST方法要带上这个header
                },
                //method: "POST",
                data: {
                  usernumber: app.globalData.usernumber,
                  password: app.globalData.password,
                  code: code,
                  encryptedData: app.globalData.encryptedData,
                  iv: app.globalData.iv
                },
                success: function (res) {    
                  console.log("login res:",res)         
                  if (res.data.code == -2) {
                    wx.showModal({
                      title: '温馨提示',
                      content: '用户名与微信号不匹配',
                      showCancel: false,
                      success: function (res) {
                      }
                    })
                  } else if (res.data.code == -1) {
                    wx.showModal({
                      title: '温馨提示',
                      content: '用户名或密码错误',
                      showCancel: false,
                      success: function (res) {
                      }
                    })                 
                  }else /*(res.data.code == 0)*/ {
                    app.globalData.login = true
                    //app.globalData.token = token
                    app.globalData.usernumber = res.data.usernumber
                    app.globalData.username = res.data.username
                    app.globalData.usergender = res.data.usergender
                    app.globalData.usermajor = res.data.usermajor
                    app.globalData.userclass = res.data.userclass
                    app.globalData.useremail = res.data.useremail
                    app.globalData.userprivilege = res.data.userprivilege

                    wx.showToast({
                      title: '登陆成功',
                      icon: "none",
                      success: (res) => {
                      }
                    })
                    wx.switchTab({
                      url: '../userPage/userPage',
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
            } else {
              wx.showToast({
                title: '请将信息填写完整后提交',
                icon: "none"
              })
            }

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            /*if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }*/
          },
          fail: function (res) {
            wx.showToast({
              title: '你未授权，获取用户信息失败!',
              icon: "none"
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: 'wx.login fail!',
          icon: "none"
        })
      },
    })
  },
    /*
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSetting res: ", res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/

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