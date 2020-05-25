// pages/themePage/themePage.js
Page({
  data: {
    theme: []
  },

  // 跳转到商品详情页
  jumpToDetail: function (e) {
    wx.navigateTo({
      url: `/pages/details/details?page=${e.currentTarget.dataset.page}`,
    })
  },

  // 每次加载页面，判断当前商品，并渲染
  onLoad: function (options) {
    this.setData({
      theme: require(`../../data/${options.page}.js`)
    });
  }
})