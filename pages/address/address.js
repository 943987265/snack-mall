// pages/address/address.js
Page({
  data: {
    address: wx.getStorageSync('address') || {}
  },

  textIn: function (e) {
    this.data.address[e.currentTarget.dataset.type] = e.detail.value
  },

  getLocation: function (e) {
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success: (result) => {
            this.data.address.location = result.address;
            wx.setStorageSync('address', this.data.address);
          }
        })
      }
    })
  },

  // 提交保存地址
  keepAddr: function (e) {
    // 从输入框获取信息，存入address属性
    this.setData({
      address: e.detail.value
    });
    // 本地存储提交的地址信息
    wx.setStorageSync('address', e.detail.value);
    // 跳转回原页面
    wx.navigateBack();
  },

  // 每次进入页面，重新获取与设置地址信息
  onShow: function () {
    this.setData({
      address: wx.getStorageSync('address') || {}
    });
  }
})