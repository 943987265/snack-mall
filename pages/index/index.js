//index.js
//获取应用实例
const app = getApp();
// 获取数据
const newestList = require("../../data/newest.js");
const guowei = require("../../data/guowei.js");
const dianxin = require("../../data/dianxin.js");
const chaohuo = require("../../data/chaohuo.js");

Page({
  data: {
    bannerImg: [{
      src: "/image/b1.jpg"
    }, {
      src: "/image/b2.jpg"
    }, {
      src: "/image/b3.jpg"
    }],
    newest: [],
    guowei: [],
    dianxin: [],
    chaohuo: [],
    sendDetail: []
  },

  // 主题页跳转，通过search传参
  jumpToPages: function (e) {
    wx.navigateTo({
      url: `/pages/themePage/themePage?page=${e.currentTarget.dataset.pageurl}`
    })
  },

  // 详情页跳转，通过search传参
  jumpToDetail: function (e) {
    wx.navigateTo({
      url: `/pages/details/details?page=${e.currentTarget.dataset.page}`,
    })
  },

  // 每次加载页面，将获取的数据赋值到data中
  onLoad: function () {
    this.setData({
      newest: newestList.newest,
      guowei: guowei,
      dianxin: dianxin,
      chaohuo: chaohuo,
    })
  }
})
