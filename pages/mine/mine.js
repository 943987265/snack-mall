// pages/mine/mine.js
Page({
  data: {
    orders: wx.getStorageSync('orders') || [],
    address: wx.getStorageSync('address') || {},
    ifLogin: wx.getStorageSync('ifLogin') || false,
    userInfo: wx.getStorageSync('user-info') || {}
  },

  // 登录操作
  login: function (e) {
    // 获取用户信息，并重新渲染页面
    this.setData({
      ifLogin: true,
      userInfo: e.detail.userInfo
    });
    // 本地存储用户信息和登录状态
    wx.setStorageSync('user-info', e.detail.userInfo);
    wx.setStorageSync('ifLogin', this.data.ifLogin);
  },

  // 设置页跳转
  jumpToSet: function (e) {
    wx.navigateTo({
      url: '/pages/setting/setting'
    })
  },

  // 地址填写页跳转
  jumpToAddr: function (e) {
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },

  // 提示删除订单操作
  deleteOrder: function (e) {
    // 订单未付款
    if (e.currentTarget.dataset.if) {
      wx.showModal({
        title: '提示',
        content: '确定删除该订单？',
        success: (answer) => {
          // 若确定则删除
          if (answer.confirm) {
            // 从订单列表JSON中删除该商品
            this.data.orders.splice(e.currentTarget.dataset.idx, 1);
            // 本地存储商品列表，并重渲染
            wx.setStorageSync('orders', this.data.orders);
            this.setData({
              orders: this.data.orders
            })
          }
        }
      })
    }
  },

  // 订单操作
  orderOprt: function (e) {
    // 订单详情页跳转，传参=>当前订单索引
    if (e.currentTarget.dataset.goto) {
      wx.navigateTo({
        url: `/pages/order/order?idx=${e.currentTarget.dataset.idx}`,
      })
      // 付款申请，由于没有后台接口，用console.log假动作一下
    } else {
      console.log("发起付款申请");
    }
  },

  // 每次打开页面，重新获取本地存储数据，并渲染
  onShow: function () {
    this.setData({
      ifLogin: wx.getStorageSync('ifLogin') || false,
      userInfo: wx.getStorageSync('user-info') || {},
      address: wx.getStorageSync('address') || {},
      orders: wx.getStorageSync('orders') || []
    });
  }
})