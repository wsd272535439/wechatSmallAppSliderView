// pages/slider/slider.js
Page({

  //触摸事件
  handleTouchStart: function(e){
    console.log('e',e)
    let startX = e.changedTouches[0].pageX;
    this.setData({
      startX
    });
  },
  handleTouchEnd: function (e) {
    let endX = e.changedTouches[0].pageX;
    const { topIndex, data, startX } = this.data;
    console.log('thisData',this.data)
    if(endX){
      let direction;
      let animate;
      if (Math.abs(endX - startX) > 40) {
        let s_distance = endX - startX
        let next_index;
        if (s_distance < 0) {
          direction = 'right'
          next_index = topIndex + 1
          animate = true
          this.animation.left((-(next_index - 1) * 130 - 130 / 3 - 20 * next_index)).step();
        } else {
          direction = 'left'
          next_index = topIndex - 1
          animate = true
          this.animation.left((-(next_index - 1) * 130 - 130 / 3 - 20 * next_index)).step();
        }

        console.log('nowIndex',next_index)
        
        this.setData({
          topIndex: next_index,
          direction,
          animate,
          animationData: this.animation.export()
        },()=>{
          const { topIndex, direction ,colors } = this.data;
          console.log('this.data',this.data)
          if(topIndex == 1 && direction == 'left'){
            console.log('intoLast')
            this.timer = setTimeout(()=>{
              this.noanimation.left((-(colors.length - 3 - 1) * 130 - 130 / 3 - 20 * (colors.length - 3))).step();
              this.setData({
                topIndex: colors.length - 3,
                animationData: this.noanimation.export()
              })
            },1000)
          } else if (topIndex == colors.length - 2 && direction == 'right'){
            this.timer = setTimeout(() => {
              this.noanimation.left((-(2 - 1) * 130 - 130 / 3 - 20 * 2)).step();
              this.setData({
                topIndex: 2,
                animationData: this.noanimation.export()
              })
            }, 1000)
          }
        });
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    colors:['red','blue','green'],
    topIndex: 3,
    startX: 0,
    animationData:[],
    left: (-(3 - 1) * 130 - 130 / 3 - 20 * 3)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    let data = this.data.colors;
    let colors = data.slice(0);
    colors.unshift(data[data.length - 1]);
    colors.push(data[0]);
    colors.unshift(data[data.length - 2]);
    colors.push(data[1]);
    this.setData({
      colors
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })
    this.noanimation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease",
      delay: 0
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})