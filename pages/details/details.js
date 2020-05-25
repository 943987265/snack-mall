// pages/details/details.js
const goods = require("../../data/details-data.js")

Page({
  data: {
    itemDetail: {},
    count: 1,
    tab: "detail",
    cartCount: (+wx.getStorageSync('cartCount') || 0),
    cartJson: (wx.getStorageSync('cartJson') || [])
  },

  // 跳转购物车
  jumpToCart: function (e) {
    wx.switchTab({
      url: '/pages/carts/carts',
    })
  },

  // 减操作
  reduce: function (e) {
    this.setData({
      count: --this.data.count
    })
  },

  // 加操作
  plus: function (e) {
    this.setData({
      count: ++this.data.count
    })
  },

  // 加入购物车
  addToCart: function (e) {
    let flag = true;
    // 遍历购物车商品列表
    this.data.cartJson.forEach(ele => {
      // 有当前商品
      if (ele.title === this.data.itemDetail.title) {
        flag = false;
        // 计算购物车商品数量
        ele.quantity += this.data.count;
      }
    });
    // 没有当前商品，在购物车列表新建商品
    if (flag) this.data.cartJson.push({
      ...this.data.itemDetail,
      quantity: this.data.count,
      checked: false
    });
    // 重新渲染
    this.setData({
      cartCount: this.data.cartCount + this.data.count
    });
    // 本地存储更新的购物车商品列表和商品数量
    wx.setStorageSync('cartJson', this.data.cartJson);
    wx.setStorageSync('cartCount', this.data.cartCount);
  },

  // 切换详情tab，重新渲染
  shiftTab: function (e) {
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
  },
  
  // 每次加载页面时，通过options接收传参，判断打开哪个商品的详情页
  onLoad: function (options) {
    this.setData({
      itemDetail: goods[options.page]
    })
  },

  // 每次打开页面时，重新渲染
  onShow: function () {
    this.setData({
      cartCount: +wx.getStorageSync('cartCount') || 0,
      cartJson: wx.getStorageSync('cartJson') || []
    })
  }
})