Page({
    data: {

    },
    onLoad() {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {
        this.setData({
            bindPhoneStatus: wx.getStorageSync("bindPhoneStatus"),
            regitstry: wx.getStorageSync('regitstry')
        })
    },
    navigationCoupons() {
        wx.navigateTo({
            url: '../coupons/coupons',
        })
    },
    navigationIntegral(){
        wx.navigateTo({
          url: '../integral/integral',
        })
    },
    navigetonPhonePage() {
        if (this.data.bindPhoneStatus) wx.navigateTo({
            url: "../relieveBindPhone/relieveBindPhone"
        })
        else wx.navigateTo({
            url: "../bindPhone/bindPhone"
        })
    },
    navigationDetailinformation() {
        wx.navigateTo({
            url: '../detailedInformation/detailedInformation',
        })
    },
    navigationSelfcarsPage() {
        wx.navigateTo({
            url: '../selfCars/selfCars',
        })
    },
    navigationIntegralcentre() {
        wx.navigateTo({
            url: '../integralCentre/integralCentre',
        })
    },
    navigatoionCommonissue() {
        wx.navigateTo({
            url: '../commonIssue/commonIssue',
        })
    },
    navigationInsertAddress() {
        wx.navigateTo({
            url: '../insertAddress/insertAddress',
        })
    },
    navigationSelfMember() {
        wx.navigateTo({
            url: '../selfMember/selfMember',
        })
    }
})