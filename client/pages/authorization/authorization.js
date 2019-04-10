// pages/authorization/authorization.js
var config = require('../../config')
//var util = require('../../utils/util.js')
//var qcloud = require('../../vendor/wafer2-client-sdk/index')

// 获取全局变量
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: undefined,
    userDenyAuth: undefined,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  updateUserInfo: function (e) {
    let that = this;
    if (e.detail.errMsg === "getUserInfo:fail auth deny") {
      that.data.userDenyAuth = true;
      that.setData({
        userDenyAuth: that.data.userDenyAuth
      })
      console.log('用户拒绝授权')
    } else {
      console.log('用户允许授权')
      wx.switchTab({
        url: '../index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    wx.login({
      // 调用 login 获取 code
      success: function (res) {
        console.log("1111")
        if (!res.code) {
          return
        }
        console.log("2222")

        that.setData({
          code: res.code
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

  }
})