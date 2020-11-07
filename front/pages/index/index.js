//index.js
//获取应用实例
const app = getApp()
var bmap = require('../../utils/bmap-wx.min.js');
var loc = require('../../utils/location.js');
Page({
  data: {
    imageUrl:"",
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height,
    currentIndex: 0,
    swiper_images: [],
    allCategoryMessage: [],
    weatherData: null,
    floorstatus: "none",
    category_first: [],
    category_second: [],
    notice: [],
    lost_new: {},
    takeout: [],
    ad_bottom: ["../../images/other/ad_bottom.jpg"],
    user_message: [],
    activeIndex: 1,
    isLastPage: false, //是否最后一页
    isUpdate: -1,
    isLoading: false, //页面是否渲染完毕
    userCommunity: "请选择小区"
  },
  onReady() {
    let that = this
    setTimeout(function() {
      that.setData({
        isLoading: true
      })
    }, 1000)
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        })
      },
      fail: function() {
        if (that.data.userId == -1) {
          that.setData({
            showDialog1: true
          })
        }
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data
        })
      },
      fail: function() {
        if (that.data.userId == -1) {
          that.setData({
            showDialog1: true
          })
        }
      }
    })

    that.setData({
      userInfo: getApp().globalData.userInfo,
      userId: getApp().globalData.userId
    })
    this.loadMessage(1,false)
  },

  /**
   * 联系我
   */
  me_call() {
    wx.showModal({
      title: '提示',
      content: '如有需要请联系我',
      confirmText: "联系我",
      success: function(e) {
        if (e.confirm) {
          wx.makePhoneCall({
            phoneNumber: '18996379281',
          })
        }
      }
    })
  },
  //点击查看图片
  look_image(e) {
    wx.previewImage({
      urls: [e.target.id],
    });
  },
  //查看公告
  checkNotice(e) {
    wx.showModal({
      title: '公告',
      content: e.target.id,
      showCancel: false,
      confirmText: '已查阅'
    })
  },

  onPageScroll: function(e) { //判断滚轮位置
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: "block"
      });
    } else {
      this.setData({
        floorstatus: "none"
      });
    }
  },
  goTop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  //跳转到搜索页
  search: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //跳转到详情页
  to_message_detail: function(e) {
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?messageId=' + e.currentTarget.id,
    })
  },

  onLoad: function(options) {

    let that = this
    /**
     * 商家服务
     */
    this.setData({
      takeout: getApp().globalData.shopMessage,
      imageUrl:getApp().globalData.imageUrl,
    })

    /**
     * 轮播图
     */
    this.setData({
      swiper_images: getApp().globalData.swiperImages
    })
    /**
     * 分类信息
     */
    this.setData({
      allCategoryMessage: getApp().globalData.categoryMessage
    })
    var get_first = getApp().globalData.categoryMessage.slice(0, 10);
    var tem = [{}, {}, {}, {}, {}]
    var get_second = getApp().globalData.categoryMessage.slice(10, 13).concat(tem)
    this.setData({
      category_first: get_first,
      category_second: get_second,
      category_second: get_second
    })
    /**
     * 公告信息
     */
    this.setData({
      notice: getApp().globalData.noticeMessage
    })
    /**
     *第一页最新信息
     */
    this.setData({
      user_message: getApp().globalData.messageDetail
    })

  },
  handleImgChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },

  chooseLocation:function(obj){
    var that=this;
    wx.chooseLocation({
      success: function (res) {    
        var locationDetail = loc.getLocation(res)
        getApp().globalData.userLocation= locationDetail
        that.setData({
          userCommunity: res.name
        })
        wx.setStorage({
          key: 'userLocation',
          data: locationDetail,
        })
        that.loadMessage(1)
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
                                                    var locationDetail = loc.getLocation(res)
                                                    
                                                    getApp().globalData.userLocation= locationDetail
                                                    that.setData({
                                                      userCommunity: res.name
                                                    })
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
  },

  /**
   * 下拉
   */
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 最后一页了，取消下拉功能
    if (this.data.isLastPage) {
      return
    }
    this.loadMessage(++this.data.activeIndex,true)
  },
  onPullDownRefresh:function()
  {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    //模拟加载
    setTimeout(function()
    {
      that.loadMessage(1,false)
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
  },
  loadMessage(index, contact) {
    wx.showLoading({
      title: '加载中~',
    })
    var that = this;
    var app = getApp()
    wx.getStorage({
      key: 'userLocation',
      success: function(res) {
        wx.request({
          url: getApp().globalData.url + '/getMessage/getAllMessageDetail/'+res.data.userProvince+ "/" + res.data.userCity+ "/" + res.data.userDistrict+ "/" +  res.data.userCommunity+ "/" + res.data.userLongitude+ "/" + res.data.userLatitude+ "/" +  index,
          method: "POST",
          success: (res) => {
            if (res.data == 200) {
              that.setData({
                isLastPage: true
              })
              return;
            }
            if (contact == true){
              that.setData({
                user_message: that.data.user_message.concat(res.data)
              })
            }else {
              that.setData({
                user_message: res.data
              })
            }
          },
          complete: function(res) {
            wx.hideLoading();
          },
        })
      },
      fail: (e) => {
        // //TODO show dialog
        // that.chooseLocation()
      }
    })


  },
  onShow() {
    let that = this
    wx.getStorage({
      key: 'userLocation',
      success: function(res) {
        that.setData({
          userCommunity: res.data.userCommunity
        })
      },
      fail: (e) => {
        //TODO show dialog
        that.chooseLocation()
      }
    })
    wx.request({
      url: getApp().globalData.url + '/getMessage/getLastNewMessage/' + getApp().globalData.userId,
      method: 'post',
      complete: function(e) {
        if (e.statusCode != 200) {
          return
        }
        wx.getStorage({
          key: 'lastNewMessage',
          success: function(res) {
            if (res.data != e.data.newMessageId) {
              wx.playBackgroundAudio({
                dataUrl: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201609/7824.wav',
                title: '提示',
              })
              wx.showModal({
                title: '新消息',
                content: '内容：' + e.data.newMessageDetail,
                confirmText: "去查看",
                cancelText: "稍后去看",
                success: function(e) {
                  if (e.confirm) {
                    wx.navigateTo({
                      url: '/pages/me_xiaoxi/me_xiaoxi',
                    })
                  }
                }
              })
            }
          },
        })

        wx.setStorage({
          key: 'lastNewMessage',
          data: e.data.newMessageId,
        })
      }

    })
    /**
     * 判断是否更新
     */
    if (getApp().globalData.isUpdate == 1) {
      this.onLoad(),
        this.setData({
          activeIndex: 1,
          isLastPage: false, //是否最后一页
        })
      getApp().globalData.isUpdate = -1
    }

  }

})