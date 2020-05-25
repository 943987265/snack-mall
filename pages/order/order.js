// pages/order/order.js
Page({
  data: {
    order: {}
  },

  // 详情页跳转，通过search传参
  jumpToDetail: function (e) {
    wx.navigateTo({
      url: `/pages/details/details?page=${e.currentTarget.dataset.page}`,
    })
  },

  // 每次加载页面，获取当前订单数据，并渲染页面
  onLoad: function (options) {
    this.setData({
      order: wx.getStorageSync('orders') ? wx.getStorageSync('orders')[options.idx] : {}
    })
  }
})