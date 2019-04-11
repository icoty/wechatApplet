//app.js
//var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
const app = getApp()

App({
  globalData: {
    userInfo: null,
    encryptedData: null,
    iv: null,
    token: null,
    usernumber: null,
    password: null,
    username: null,
    usergender: null,
    usermajor: null,
    userclass: null,
    useremail: null,
    userprivilege: null,
    passwordFlag: undefined,  // 标示二次输入密码是否一致，1为可用，0为不可用
    uflag: undefined, // 标示用户名是否可用，1为可用，0为不可用
    eflag: undefined, // 标示邮箱是否可用，1为可用，0为不可用
    login: false
  },

  onLaunch: function (options) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("app")
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSetting res: ", res)
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问        
            },
            fail: function (res) {
              wx.showToast({
                title: '你拒绝了授权，将不能进行其他操作！',
                icon: "none"
              })
            }
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