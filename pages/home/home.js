Page({

    data: {
        active: "default"
    },
    onLoad() {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            scrennWidth: wx.getStorageSync('scrennWidth'),
        })
    },
    onShow() {
        const commodity = wx.getStorageSync('commodity')
        this.setData({
            commodityType: wx.getStorageSync('commodityType'),
            commodity,
            commodityScreen: commodity[Math.floor(Math.random() * commodity.length)]
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
        wx.navigateTo({
            //   url: `../productDetails/productDetails?active=${this.data.active}&commodityUUID=${e.currentTarget.dataset.commodityuuid}&type=${e.currentTarget.dataset.type}`,
            url: `../productDetails/productDetails?active=${this.data.active}&commodityUUID=${e.currentTarget.dataset.commodityuuid}`
        })
    }
})