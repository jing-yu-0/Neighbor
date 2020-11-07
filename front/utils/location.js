
const getLocation = function(res) {

 var str=String(res.address)

var proindex = str.indexOf("省"); 
  var cityindex =str.indexOf("市"); 
 var  disindex =str.indexOf("区");
  var xindex =str.indexOf("县");
  var dis
  if (proindex<xindex){
    dis = str.substring(cityindex+1,xindex+1)
  }
  if(proindex <disindex){
   dis = str.substring(cityindex+1,disindex+1)
  }

  var locationDetail = {
    "userProvince": str.substring(0,proindex+1),
    "userCity": str.substring(proindex+1,cityindex+1),
    "userDistrict": dis,
    "userCommunity": res.name,
    "userLongitude": res.longitude,
    "userLatitude": res.latitude,
  }
  return locationDetail;
}
const chooseLocation =function(){
 // var that=this;
  wx.chooseLocation({
    success: function (res) {    
      var locationDetail = getLocation(res)
      getApp().globalData.userLocation= locationDetail
      wx.setStorage({
        key: 'userLocation',
        data: locationDetail,
      })
    },
    fail:function(){
        wx.getSetting({
            success: function (res) {
                var statu = res.authSetting;
                if (!statu['scope.userLocation']) {
                    wx.showModal({
                        title: '是否授权当前位置',
                        content: '需要获取您的地理位置，请确认授权，否则无法获取您的当前小区',
                        success: function (tip) {
                            if (tip.confirm) {
                                wx.openSetting({
                                    success: function (data) {
                                        if (data.authSetting["scope.userLocation"] === true) {
                                            wx.showToast({
                                                title: '授权成功',
                                                icon: 'success',
                                                duration: 1000
                                            })
                                            //授权成功之后，再调用chooseLocation选择地方
                                            wx.chooseLocation({
                                                success: function(res) {
                                                  var locationDetail = getLocation(res)
                                                  getApp().globalData.userLocation= locationDetail
                                                  wx.setStorage({
                                                    key: 'userLocation',
                                                    data: locationDetail,
                                                  })
                                                },
                                            })
                                        } else {
                                            wx.showToast({
                                                title: '授权失败',
                                                icon: 'success',
                                                duration: 1000
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: '调用授权窗口失败',
                    icon: 'success',
                    duration: 1000
                })
            }
        })
    }
})        
}

module.exports = {
  getLocation: getLocation,
  chooseLocation: chooseLocation
}