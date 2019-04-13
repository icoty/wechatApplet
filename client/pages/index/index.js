// pages/index/index.js 
// 主页
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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    task_course: [],
    joint_course: [],
    created_course: [],
    count_down_list: [],
    sign_activity:"待参加活动(即将进行)",
    attend_activity:"已参加活动",
    absence_activity:"缺席的活动"
  },
  jump_sign:function(){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  jump_attend: function () {
    wx.navigateTo({
      url: '../attend/attend',
    })
  },
  jump_absence: function () {
    wx.navigateTo({
      url: '../absence/absence',
    })
  },

  onLoad() {
  /*  // 查看是否授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问         
              console.log("success")
            }
          })
        }
      }
    })*/
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
    * 生命周期函数--监听页面隐藏
    */
  onHide: function (e) {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {

  },
})