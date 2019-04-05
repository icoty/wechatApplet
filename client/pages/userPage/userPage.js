// pages/userPage/userPage.js
// 主页
var config = require('../../config')
var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')

// 获取全局变量
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    token: null,
    usernumber: null,
    password: null,
    username: null,
    usergender: null,
    usermajor: null,
    userclass: null,
    useremail: null,
    userprivilege: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.login){
      wx.redirectTo({
        url: '../login/login',
      })
    }else{
      this.setData({
        userInfo: app.globalData.userInfo,
        token : app.globalData.token,
        usernumber : app.globalData.usernumber,
        username : app.globalData.username,
        password: app.globalData.password,
        usergender: app.globalData.usergender,
        usermajor: app.globalData.usermajor,
        userclass: app.globalData.userclass,
        useremail: app.globalData.useremail,
        userprivilege: app.globalData.userprivilege
      })
      console.log(this.data)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})
