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
    userInfo: {},
    task_course: [],
    joint_course: [],
    created_course: [],
    count_down_list: []
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

  onShareAppMessage(e) {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)

  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var that = this

    if (app.globalData.userInfo) {
      that.getCourseList()
    }
  }

})