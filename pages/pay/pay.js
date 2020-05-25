// pages/pay/pay.js
Page({
  data: {
    cartJson: (wx.getStorageSync('cartJson') || []).filter(ele => ele.checked),
    stillCart: (wx.getStorageSync('cartJson') || []).filter(ele => !ele.checked),
    address: wx.getStorageSync('address') || {},
    orders: wx.getStorageSync('orders') || [],
    cost: 0
  },

  // 生成随机整数
  rdNum: function (m, n) {
    return Number.parseInt(Math.random() * (n - m + 1)) + m;
  },

  // 生成随机订单编号，大写字母+五位数字
  randomCode: function () {
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return char[this.rdNum(0, char.length - 1)] + this.rdNum(10000, 99999);
  },

  // 计算商品总价
  calcTotal: function () {
    let allCost = 0;
    // 遍历购物车已选商品列表，计算商品总价
    this.data.cartJson.forEach(ele => {
      allCost += ele.quantity * ele.price;
    });
    // 重新渲染
    this.setData({
      cost: allCost.toFixed(2)
    });
  },

  // 跳转到地址填写页
  jumpToAddr: function (e) {
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },

  // 生成订单操作
  createOrder: function (e) {
    // 收货信息已填写
    if (this.data.address.name) {
      // 弹出confirm，询问是否支付
      wx.showModal({
        title: '提示',
        content: '确定支付？',
        success: (answer) => {
          // 确定支付
          if (answer.confirm) {
            // 假动作，已付款
            console.log("已付款");
            // 生成订单数据
            this.data.orders.push({
              ifPay: true,
              code: this.randomCode(),
              cost: this.data.cost,
              address: this.data.address,
              details: this.data.cartJson
            });
          // 取消支付
          } else {
            console.log("用户取消付款");
            // 生成订单数据
            this.data.orders.push({
              ifPay: false,
              code: this.randomCode(),
              cost: this.data.cost,
              address: this.data.address,
              details: this.data.cartJson
            });
          }
          // 本地存储订单数据、购物车未选商品列表
          wx.setStorageSync('orders', this.data.orders);
          wx.setStorageSync('cartJson', this.data.stillCart);
          wx.setStorageSync('cartCount', this.data.stillCart.length);
          // 跳转到我的页
          wx.switchTab({
            url: '/pages/mine/mine'
          })
        }
      })
    // 收货信息未填写
    } else {
      // 弹出提示框，警告未填写
      wx.showToast({
        title: '未填写配送信息',
        icon: "none"
      })
    }
  },

  // 每次打开页面，获取本地存储数据，并重新渲染
  onShow: function () {
    this.setData({
      cartJson: (wx.getStorageSync('cartJson') || []).filter(ele => ele.checked),
      stillCart: (wx.getStorageSync('cartJson') || []).filter(ele => !ele.checked),
      address: wx.getStorageSync('address') || {},
      orders: wx.getStorageSync('orders') || []
    });
    this.calcTotal();
  }
})