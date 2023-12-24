const app = getApp()
Page({
    data: {
        active: "integral"
    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            scrennWidth: wx.getStorageSync('scrennWidth'),
            regitstry: wx.getStorageSync('regitstry'),
        })
    },
    onShow() {
        this.setData({
            commodityType: wx.getStorageSync('commodityType'),
            commodity: wx.getStorageSync('commodity'),
        })
    },
    classify(e) {
        const type = e.target.dataset.type
        if (type) {
            if(type!=="classify"){
                const commodity  = wx.getStorageSync('commodity').filter(ele => ele.type === type)
                this.setData({
                    commodity: commodity
                })
            }else{
                this.setData({
                    commodity: wx.getStorageSync('commodity'),
                })
            }
        }
    },
    navigationProductDetails(e) {
        const commodityUUID = e.currentTarget.dataset.commodityuuid
        wx.navigateTo({
            //   url: `../productDetails/productDetails?active=${this.data.active}&commodityUUID=${e.currentTarget.dataset.commodityuuid}&type=${e.currentTarget.dataset.type}`,
            url: `../productDetails/productDetails?active=${this.data.active}&commodityUUID=${commodityUUID}`
        })
    }
})