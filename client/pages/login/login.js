var config = require('../../config')
const app = getApp()

Page({
  data: {		//此处定义本页面中的全局变量
    username: '',
    password: ''
  },
  inputName: function (e) {	// 用于获取输入的账号
    this.setData({
      username: e.detail.value	//将获取到的账号赋值给username变量
    })
  },
  inputPwd: function (e) {		// 用于获取输入的密码
    this.setData({
      passwd: e.detail.value	//将获取到的账号赋值给passwd变量
    })
  },
  reg: function (e) {
    wx.redirectTo({
      url: '../register/register',
    })
  },
  log: function (e) {
    if (this.data.username && this.data.password) {
      wx.setStorageSync("username", this.data.username)
      wx.request({
        url: config.service.loginUrl,	//获取服务器地址，此处为本地地址
        header: {
          "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
        },
        method: "POST",
        data: {		//向服务器发送的信息
          username: this.data.username,
          password: this.data.password
        },
        success: function (res) {
          var result = res.data.resultObj;
          console.log(res.data);
          //result=1表示登录成功
          if (result == 1) {
            //存储用户名
            wx.redirectTo({
              url: '/pages/index/index',
            })
            wx.set
          } else {
            wx.showModal({
              title: '温馨提示',
              content: '用户名或密码错误',
              showCancel: false,
              success: function (res) {
              }
            })
          }
          console.log('submit success');
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