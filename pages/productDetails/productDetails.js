Page({
    data: {
        // 标识是否是积分或是会员，首页进来页面进行相应的购买
        // default:首页，member:会员，integral：积分
        // type:"default",
        active: "default"
    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            commodityUUID: options.commodityUUID,
            active: options.active,
            carsLength: wx.getStorageSync('regitstry').shoppingCarts.length,
            RegitstryUUID: wx.getStorageSync('regitstry').UUID,
            commodity: wx.getStorageSync('commodity').find(ele => ele.commodityUUID === options.commodityUUID)
        })
    },
    onShow() {
        this.setData({
            commodity: wx.getStorageSync('commodity').find(ele => ele.commodityUUID === this.data.commodityUUID),
            carsLength: wx.getStorageSync('regitstry').shoppingCarts.length,
        })
    },
    previewImageIndex(e) {
        const index = e.target.dataset.imageindex
        if (index>=0) {
            const commodityImagesSingle = this.data.commodity.commodityImages
            wx.previewImage({
                current: commodityImagesSingle[index],
                urls: commodityImagesSingle,
            })
        }
    },
    addCars(e) {
        wx.navigateTo({
            url: `../productsSelecter/productsSelecter?active=${this.data.active}&type=addCars&commodityUUID=${e.currentTarget.dataset.commodityuuid}`,
        })
    },
    purchase(e) {
        wx.navigateTo({
            url: `../productsSelecter/productsSelecter?active=${this.data.active}&type=purchase&commodityUUID=${e.currentTarget.dataset.commodityuuid}`,
        })
    },
    navigationCommondityComments(e) {
        wx.navigateTo({
            url: `../commodityComments/commodityComments?commodityUUID=${e.currentTarget.dataset.commodityuuid}`,
        })
    },
    navigationCommondityCoupons(e) {
        wx.navigateTo({
            url: `../commondityCoupons/commondityCoupons?commodityUUID=${e.currentTarget.dataset.commodityuuid}`,
        })
    },
    navigationProductsSelecter(e) {
        wx.navigateTo({
            url: `../productsSelecter/productsSelecter?active=${this.data.active}&commodityUUID=${e.currentTarget.dataset.commodityuuid}`,
        })
    },
    navigationSelfCars() {
        wx.navigateTo({
            url: '../selfCars/selfCars',
        })
    }
})