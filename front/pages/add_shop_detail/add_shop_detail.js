//index.js
//获取应用实例
var util = require('../../utils/util.js');
var uploadImage = require('../../utils/uploadFile.js');
var update = require('../../utils/update.js');
var loc = require('../../utils/location.js');
const app = getApp()
const default_title = "点击输入商铺名称"
const default_phone = "点击输入商铺电话"
const default_opentime = "点击输入营业时间"
const default_community = "点击选择商铺所在小区"
Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '添加店铺', //导航栏 中间的标题
      height: 0
    },
    markers: [],
    shopMessage: {},
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    img_url:[],
    logoimage: "",
    logopath:"",
    input_title: default_title,
    input_phone: default_phone,
    userId: "",
    userCommunity: default_community,
    locationDetail:{},
    input_opentime: default_opentime,
    shopId:"",
    isLoading: false
  },
  onLoad(options) {
    let that = this
    this.setData({
      height: app.globalData.height
    })
    this.setData({
      userId: getApp().globalData.userId
    })
    this.setData({
      shopId: options.shopId
    })
    if (typeof(options.shopId) != "undefined"){
      wx.request({
        url: getApp().globalData.url + '/getMessage/getShopMessage/' + options.shopId,
        method: "post",
        success: function(e) {
          that.setData({
            shopMessage: e.data
          })
          that.setData({
            input_title: e.data.shopName
          })
          that.setData({
            input_phone: e.data.shopPhone
          })
          that.setData({
            input_opentime: e.data.shopOpentime
          })
          that.setData({
            input_community: e.data.shopCommunity
          })
          var returnlocationDetail = {
            "userProvince": e.data.shopProvince,
            "userCity": e.data.shopCity,
            "userDistrict": e.data.shopDistrict ,
            "userCommunity": e.data.shopCommunity,
            "userLongitude": e.data.shopLongitude,
            "userLatitude": e.data.shopLatitude,
          }
          that.setData({
            locationDetail: returnlocationDetail
          })
        },
        complete: function() {
          setTimeout(function() {
            that.setData({
              isLoading: true
            })
          }, 300)
        }
      })
    }
    wx.getStorage({
      key: 'userLocation',
      success: function(res) {
        that.setData({
          userCommunity: res.data.userCommunity
        })
        console.log("####p"+JSON.stringify(res.data))
      },
      fail: function() {
        //TODO show dialog
        that.chooseLocation()
      }
    })
    that.setData({
      isLoading: true
    })
  },
  input_title: function(e) {
    let value = e.detail.value;
    this.setData({
      input_title: value
    })
  },
  input_phone: function(e) {
    let value = e.detail.value;
    this.setData({
      input_phone: value
    })
  },
  input_opentime: function(e) {
    let value = e.detail.value;
    this.setData({
      input_opentime: value
    })
  },
  chooseLocation:function(obj){
    var that=this;
    wx.chooseLocation({
      success: function (res) {    
        that.setData({
          userCommunity: res.name
        })
        that.setData({
          locationDetail: loc.getLocation(res)
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
                                                    that.setData({
                                                      userCommunity: res.name
                                                    })
                                                    that.setData({
                                                      locationDetail: loc.getLocation(res)
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
  },
  to_index() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  chooselogo: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function(res) {
        if (res.tempFilePaths.length > 0) {
          that.setData({
            hideAdd: true
          })
          that.setData({
            logoimage: res.tempFilePaths[0]
          })
        }
      }
    })
  }, //图片上传
  chooseimage: function() {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.img_url.length, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function(res) {
        if (res.tempFilePaths.length > 0) {
          //图如果满了9张，不显示加图
          if (that.data.img_url.length == 9) {
            that.setData({
              hideBottoemAdd: true
            })
          } else {
            that.setData({
              hideBottoemAdd: false
            })
          }
          //把每次选择的图push进数组
          let img_url = that.data.img_url;

          for (let i = 0; i < res.tempFilePaths.length; i++) {
            if (i <= 8) {
              img_url.push(res.tempFilePaths[i])
            }

          }
          that.setData({
            img_url: img_url
          })
          /**
           * 如果选择多于九张,停止添加
           */

          if (that.data.img_url.length == 9) {
            that.setData({
              hideBottoemAdd: true
            })
          } else {
            that.setData({
              hideBottoemAdd: false
            })
          }
        }
      }
    })
  }, //图片上传

  img_upload: function(res) {
    let that = this;
    let img_url = that.data.img_url;
    let logoimage = that.data.logoimage;
    let images_url = [];
    //由于图片只能一张一张地上传，所以用循环

    //上传logo
    var nowTime = util.formatTime(new Date());
    var logopath = 'images/' + nowTime + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '_logo.png';
    uploadImage(logoimage, logopath,
      function(result) {
        console.log("======上传成功logo图片地址为：", result);
        wx.hideLoading();
      },
      function(result) {
        console.log("======上传logo失败======", result);
        wx.hideLoading()
      }
    )
    that.setData({
      logopath: logopath
    })


    for (let i = 0; i < img_url.length; i++) {
      //支持多图上传
      for (var i = 0; i < img_url.length; i++) {
        //显示消息提示框
        wx.showLoading({
          title: '上传中' + (i + 1) + '/' + img_url.length,
          mask: true
        })
        //上传图片
        //你的域名下的/images/文件下的/当前年月日文件下的/图片.png
        //图片路径可自行修改

        var path = 'images/' + nowTime + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
        uploadImage(img_url[i], path,
          function(result) {
            console.log("======上传成功图片地址为：", result);
            wx.hideLoading();
          },
          function(result) {
            console.log("======上传失败======", result);
            wx.hideLoading()
          }
        )
        images_url.push(path);
      }

      that.setData({
        result_image_url: images_url
      })
    }
  },
  //去左右空格;
  trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
  submit() {
    var that = this;
    if (that.trim(that.data.input_title) == "") {
      wx.showModal({
        title: '提示',
        content: '请点击最上方的输入框填写店铺名称',
        showCancel: false
      })
      return;
    }

    wx.showModal({
      title: '提示',
      content: '是否发布',
      success: function(e) {
        if (e.confirm) {
          wx.showLoading({
            title: '发布中~',
          })
          that.img_upload();
      //    var that=this
          wx.getStorage({
            key: 'userInfo',
            success: function(res) {
              getApp().globalData.userInfo=res.data
            },
            fail: function() {
              if (that.data.userId == -1) {
                that.setData({
                  showDialog1: true
                })
              }
            }
          })
         
          let list = {
            "shopId":that.data.shopId,
            "shopName": that.data.input_title,
            "shopPhone": that.data.input_phone,
            "shopOpentime": that.data.input_opentime,
            "shopAvatar": that.data.logopath,
            "userId": that.data.userId,
            "resultImage": that.data.result_image_url,
            "shopProvince": that.data.locationDetail.userProvince,
            "shopCity": that.data.locationDetail.userCity,
            "shopDistrict": that.data.locationDetail.userDistrict,
            "shopCommunity": that.data.locationDetail.userCommunity,
            "shopLongitude": that.data.locationDetail.userLongitude,
            "shopLatitude": that.data.locationDetail.userLatitude,
          }
          if (that.data.userId == -1) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '数据出现错误,请稍后重试',
            })
            return;
          }

          wx.request({
            url: getApp().globalData.url + '/addShop/' + that.data.userId,
            method: "post",
            data: list,
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
                  content: '发布成功',
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
            }
          })
        }
      }
    })
  },
})