Page({

    data: {
        active:"member"
    },

    onLoad() {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            scrennWidth: wx.getStorageSync('scrennWidth'),
            commodity:wx.getStorageSync('commodity')
        })
    },
    onShow() {

    },
    navigationProductDetails(e){
        wx.navigateTo({
          url:   `../productDetails/productDetails?active=${this.data.active}&commodityUUID=${e.currentTarget.dataset.commodityuuid}`,
        })
       
    }

})