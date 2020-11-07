//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '店铺', //导航栏 中间的标题
      height: 0,
    },
    shopMessage: [],
    imageUrl:"",
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    isLoading: false
  },
  onLoad() {
    var that = this;
    this.setData({
      height: app.globalData.height,
      imageUrl:getApp().globalData.imageUrl
    })
    wx.request({
      url: getApp().globalData.url + '/getMessage/getAllShop',
      method: "post",
      success: function(e) {
        that.setData({
          shopMessage: e.data
        })
        console.log("####shop"+e.data)
      },
      complete: function() {
        setTimeout(function() {
          that.setData({
            isLoading: true
          })
        }, 300)
      }
    })
  },
  onShow() {
    let that = this
    this.setData({
      shopMessage: getApp().globalData.shopDetail
    })
  },
  onReady() {
    let that = this
    setTimeout(function() {
      that.setData({
        isLoading: true
      })
    }, 500)
  },
  call(e) {
    wx.showModal({
      title: '提示',
      content: '是否联系（' + e.target.id + "）",
      cancelText: '取消',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.makePhoneCall({
            phoneNumber: e.target.id,
          })
        }
      },

    });
  },
  todetail(e){
    wx.navigateTo({
      url: '/pages/shop_detail/shop_detail?shopId=' + e.currentTarget.id,
    })
  },
  addshop(){
    wx.navigateTo({
      url: '/pages/add_shop_detail/add_shop_detail',
    })
  }
})