
const updateAllMessage = function(index) {
  getApp().globalData.isUpdate = 1;
  var that = this;
  var app = getApp()
  wx.getStorage({
    key: 'userLocation',
    success: function(res) {
      wx.request({
        url: getApp().globalData.url + '/getMessage/getAllMessageDetail/'+res.data.userProvince+ "/" + res.data.userCity+ "/" + res.data.userDistrict+ "/" +  res.data.userCommunity+ "/" + res.data.userLongitude+ "/" + res.data.userLatitude+ "/" +  index,
        method: "POST",
        success: (res) => {
          getApp().globalData.messageDetail = res.data
        },
        complete: function(res) {
          wx.switchTab({
            url: '/pages/index/index',
          })
          wx.hideLoading();
        },
      })
    },
    fail: (e) => {
      // //TODO show dialog
      // that.chooseLocation()
    }
  })
}

const updateShop = function() {
  var that = this;
  var app = getApp()
  wx.getStorage({
    key: 'userLocation',
    success: function(res) {
      wx.request({
        url: getApp().globalData.url + '/getMessage/getAllShop',
        method: "post",
        success: function(e) {
          getApp().globalData.shopDetail = e.data
        },
        complete: function() {
          setTimeout(function() {
            wx.switchTab({
              url: '/pages/shop/shop',
            })
            wx.hideLoading();
          }, 300)
        }
      })
    },
    fail: (e) => {
      // //TODO show dialog
      // that.chooseLocation()
    }
  })
}

 module.exports = {
  updateAllMessage: updateAllMessage,
  updateShop:updateShop,
 }