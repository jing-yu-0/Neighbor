//index.js
//获取应用实例
var update = require('../../utils/update.js');
const app = getApp()

Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '店面详情', //导航栏 中间的标题
      height: 0
    },
    markers: [],
    shopMessage: {},
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    imageUrl:"",
    showButton:false,
    isLoading: false
  },
  onLoad(options) {
    let that = this
    this.setData({
      height: app.globalData.height,
      imageUrl:getApp().globalData.imageUrl
    })
    wx.request({
      url: getApp().globalData.url + '/getMessage/getShopMessage/' + options.shopId,
      method: "post",
      success: function(e) {
        that.setData({
          shopMessage: e.data
        })
        if (e.data.userId == getApp().globalData.userId){
          that.setData({
            showButton: true
          })
        }
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
  editShop(e){
    wx.navigateTo({
      url: '/pages/add_shop_detail/add_shop_detail?shopId=' + e.currentTarget.id,
    })
  },
  deleteShop(e){
    var that=this
    wx.request({
      url: getApp().globalData.url + '/deleteShopById/' +getApp().globalData.userId+"/"+ e.currentTarget.id,
      method: "post",
      success: function(e) {
        wx.hideLoading()
        if (e.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '服务器出现问题啦，请稍后再试~',
          })
          return;
        }

        if (e.data.code == 200) {
          wx.showModal({
            title: '提示',
            content: '删除成功',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.showLoading({
                  title: '更新商铺信息中~',
                })
                update.updateShop()
              }
            }
          })
        }
        if (e.data.code == 301) {
          wx.showModal({
            title: '提示',
            content: '你已被管理员禁止发布，详情请联系管理员',
            showCancel: false
          })
        }
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

  },
  to_index() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onShareAppMessage() {
    return {
      title: "看看这家店，还不错~"
    }
  },
  look_image(e) {
    wx.previewImage({
      urls: [e.target.id]
    })
  },
  call(e) {
    wx.showModal({
      title: '提示',
      content: '是否联系（' + e.target.id + "）",
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: (result) => {
        if (result.confirm) {
          wx.makePhoneCall({
            phoneNumber: e.target.id,
          });
        }
      },
    });
  }
})