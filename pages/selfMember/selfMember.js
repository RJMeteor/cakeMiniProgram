Page({

    data: {

    },

    
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {
        this.setData({
            regitstry:wx.getStorageSync('regitstry')
        })
    },
})