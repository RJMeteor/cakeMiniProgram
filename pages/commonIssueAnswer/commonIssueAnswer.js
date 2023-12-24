// pages/commonIssueAnswer/commonIssueAnswer.js
Page({
    data: {

    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {

    },

})