const app = getApp()
Page({
    data: {

    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {
        const regitstry = app.deepClone(wx.getStorageSync('regitstry'));
        this.setData({
            coupon:app.deepClone(wx.getStorageSync('regitstry').coupon),
            regitstryUUID:regitstry.UUID,
        })
    },
    doActive(e){
        console.log(e.currentTarget.dataset.status)
    }
})