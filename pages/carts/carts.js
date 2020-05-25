// pages/carts/carts.js
Page({
  data: {
    ifLogin: wx.getStorageSync('ifLogin'),
    cartJson: wx.getStorageSync('cartJson') || [],
    allCost: 0,
    ifAll: false,
  },

  // 商品计算
  calcTotal: function () {
    let allCost = 0;
    let allCount = 0;
    this.data.ifAll = true;
    // 遍历购物车商品
    this.data.cartJson.forEach(ele => {
      // 若存在未选中的，将全选属性取假，否则计入总价
      if (!ele.checked) this.data.ifAll = false;
      else allCost += ele.quantity * ele.price;
      // 计算购物车中商品数量
      allCount += ele.quantity;
    });
    // 将改变的属性都在页面重新渲染
    this.setData({
      ifAll: this.data.ifAll,
      allCost: allCost.toFixed(2),
      cartJson: this.data.cartJson,
      ifLogin: this.data.ifLogin
    });
    // 本地存储购物车商品数量
    wx.setStorageSync('cartCount', allCount);
  },

  // 提示删除操作
  deleteItem: function (index) {
    // confirm弹出框
    wx.showModal({
      title: '提示',
      content: '确定删除该商品？',
      success: (answer) => {
        // 若确定则删除
        if (answer.confirm) {
          // 从商品列表JSON中删除该商品
          this.data.cartJson.splice(index, 1);
          // 由于弹出框属于异步操作，无法在操作后再执行下面两步，故在异步代码中调用
          // 本想用async/await，但由于未装babel，故暂不考虑
          // 本地存储商品列表
          wx.setStorageSync('cartJson', this.data.cartJson);
          // 重新计算
          this.calcTotal();
        }
      }
    })
  },

  // 操作后重计算
  recalc: function (e) {
    // 点击全选
    if (e.target.id === "c-all") {
      // 取反全选属性
      this.setData({
        ifAll: !this.data.ifAll
      })
      // 将商品列表的checked属性全设置为true
      this.data.cartJson.forEach(ele => {
        ele.checked = !!this.data.ifAll;
      });
    // 点击多选框
    } else if (e.detail.value) {
      // 将该商品的checked属性取反
      this.data.cartJson[+e.currentTarget.dataset.idx].checked = !this.data.cartJson[+e.currentTarget.dataset.idx].checked;
    // 点击-减少
    } else if (e.currentTarget.dataset.oprt === "reduce") {
      // 商品数量大于1
      if (this.data.cartJson[e.currentTarget.dataset.idx].quantity > 1) {
        // 商品数量属性减1
        this.data.cartJson[e.currentTarget.dataset.idx].quantity--;
      // 商品数量不大于1
      } else {
        // 调用提示删除操作
        this.deleteItem(e.currentTarget.dataset.idx);
      }
    // 点击+增加
    } else if (e.currentTarget.dataset.oprt === "plus") {
      // 商品数量属性加1
      this.data.cartJson[e.currentTarget.dataset.idx].quantity++;
    // 点击x删除
    } else if (e.currentTarget.dataset.oprt === "delete") {
      // 调用提示删除操作
      this.deleteItem(e.currentTarget.dataset.idx);
    }
    // 主要用于同步操作
    // 本地存储商品列表
    wx.setStorageSync('cartJson', this.data.cartJson);
    // 重新计算
    this.calcTotal();
  },

  // 支付页面跳转
  pay: function (e) {
    // 当计算后的总价大于0，即购物车不为空且有商品被勾选
    if (+this.data.allCost) {
      // 跳转到支付页面
      wx.navigateTo({
        url: '/pages/pay/pay'
      })
    }
  },

  // 每次进入页面，重新获取本地存储，并计算商品，重新渲染页面
  onShow: function (options) {
    this.data.ifLogin = wx.getStorageSync('ifLogin');
    this.data.cartJson = wx.getStorageSync('cartJson') || [];
    this.data.cartCount = +wx.getStorageSync('cartCount') || 0;
    this.calcTotal();
  }
})