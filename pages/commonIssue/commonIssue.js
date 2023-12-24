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
    navigationCommonIssueAnswer(){
        wx.navigateTo({
          url: '../commonIssueAnswer/commonIssueAnswer',
        })
    }
})