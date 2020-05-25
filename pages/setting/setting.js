// pages/setting/setting.js
Page({
  data: {
  },

  // 退出登录操作
  exitLogin: function (e) {
    // 清除本地存储用户消息，并解除登录状态
    wx.setStorageSync('ifLogin', false);
    wx.setStorageSync('user-info', {});
    // 跳转到首页
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})