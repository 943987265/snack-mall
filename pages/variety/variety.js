const app = getApp();
// 获取分类data
const cateDetail = require("../../data/cate-detail.js");

Page({
  data: {
    cateDetail: [],
    tab: "guowei",
    iNow: 0
  },

  // 切换导航栏目、分类界面，渲染页面
  changeTab: function (e) {
    this.setData({
      iNow: e.currentTarget.dataset.idx,
      tab: e.currentTarget.dataset.tab
    });
  },

  // 跳转到商品详情页
  jumpToPages: function (e) {
    wx.navigateTo({
      url: "/pages/themePage/themePage?page=guowei"
    })
  },

  // 跳转到商品详情页
  jumpToDetail: function (e) {
    wx.navigateTo({
      url: `/pages/details/details?page=${e.currentTarget.dataset.page}`,
    })
  },

  // 每次加载页面，将获取到的分类data传入页面的data选项中
  onLoad: function () {
    this.setData({
      cateDetail: cateDetail
    })
  }
})