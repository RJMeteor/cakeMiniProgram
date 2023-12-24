Page({

    data: {

    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            orders: {
                ...wx.getStorageSync('core').orders
            }
        })
    },
    onShow() {

    }
})