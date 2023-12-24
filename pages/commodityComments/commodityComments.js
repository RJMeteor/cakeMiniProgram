Page({
    data: {
    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            commodity:wx.getStorageSync('commodity').find(ele=>ele.commodityUUID === options.commodityUUID),
            commodityUUID:options.commodityUUID
        })
    },
    previewImages(e){
        const {commentindex,imageindex} = e.target.dataset
        console.log(commentindex,imageindex)
        if(commentindex>=0&&imageindex>=0){
            const commentsImagesSingle = this.data.commodity.comments[commentindex].commentsImages
            wx.previewImage({
                current: commentsImagesSingle[imageindex],
                urls: commentsImagesSingle,
            })
        }

    },
    onShow() {
            
    },
})