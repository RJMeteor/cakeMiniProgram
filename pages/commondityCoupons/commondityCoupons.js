const app = getApp()
Page({
    data: {

    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            commodityUUID:options.commodityUUID,
            commodity:wx.getStorageSync('commodity').find((ele,index)=>{
                let flag  = ele.commodityUUID === options.commodityUUID
                if(flag){
                    this.setData({
                        commodityIndex: index
                    })
                }
                return flag 
            })
        })
    },
    onShow() {
        const regitstry = app.deepClone(wx.getStorageSync('regitstry'));
        this.setData({
            regitstryUUID:regitstry.UUID,
            regitstry : app.deepClone(wx.getStorageSync('regitstry'))
        })
    },
    doReceive(e){
       let commodityClone = app.deepClone(this.data.commodity)
       let couponsClone = commodityClone.coupon[e.currentTarget.dataset.couponsindex]
       couponsClone.couponRegitstryUUIDReceive.push(this.data.regitstryUUID)
       let commodity = app.deepClone(wx.getStorageSync('commodity'))
       commodity.splice(this.data.commodityIndex,1,commodityClone)
       wx.setStorageSync('commodity', commodity)
       this.data.regitstry.coupon.push(couponsClone)
       wx.setStorageSync('regitstry', app.deepClone( this.data.regitstry))
        wx.showToast({
          title: '领取成功',
          mask:true,
          duration:2000
        })
        this.initData()
    },
    initData(){
        this.setData({
            commodity:wx.getStorageSync('commodity').find((ele,index)=>{
                let flag  = ele.commodityUUID === this.data.commodityUUID
                if(flag){
                    this.setData({
                        commodityIndex: index
                    })
                }
                return flag 
            })
        })
    }
})