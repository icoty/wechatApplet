//app.js
//var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
const app = getApp()

App({
  onLoad: function() {

  },

  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var data = {
      code: undefined
    } 
    wx.login({
      success: res => {    
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (!res.code) {
          console.log("!res.code is true: ",res)
          return
        }
        //console.log(res)
        data['code'] = res.code
        wx.request({
          url: config.service.uploadCodeUrl,
          header: {
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          method: "POST",
          data: data,
          success: function (res) {
            if (res.data.code != 200) {
              console.log("res.data.code not 200:", res)
              return
            }
            
            //app.globalData.token = res.data.data.token

            wx.redirectTo({
              url: '/pages/authorization/authorization',
            })
          }
        });
      }
    })
  },
  globalData: {
      userInfo: null,
      token: null,
      task: {
          code: 0,
          scene: ''
      }
  },
  initGlobalTask: function() {
      this.globalData.task.code = 0
      this.globalData.task.scene = ''
  }
})