const app = getApp()
Page({
    data: {

    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            commodity: wx.getStorageSync('commodity'),
            regitstry: wx.getStorageSync('regitstry'),
            commodityUUID: options.commodityUUID,
            ordersUUID: options.ordersUUID,
            ...wx.getStorageSync('comments')
        })
    },
    onChange() {},
    onShow() {
        this.data.commodity.find((ele, index) => {
            const flag = ele.commodityUUID === this.data.commodityUUID
            if (flag) {
                this.setData({
                    commodityIndex: index,
                })
            }
            return flag
        })
        this.data.regitstry.ordersStorage.find((ele, index) => {
            const flag = ele.ordersUUID === this.data.ordersUUID
            if (flag) {
                this.setData({
                    ordersIndex: index,
                    orders: ele
                })
            }
            return flag
        })
    },
    chooseMedia(){
        wx.chooseMedia({
            success:(res)=>{
                res.tempFiles.forEach(ele=>{
                    this.data.commentsImages.push(ele.tempFilePath)
                    this.setData({
                        commentsImages:this.data.commentsImages
                    })
                })
            }
        })
    },
    doSubmit() {
        const commodityClone = app.deepClone(this.data.commodity)
        const commentsClone = app.deepClone(wx.getStorageSync('comments'))
        this.data.commentsTime = this.dateGenerated()
        const regitstryClone = app.deepClone(this.data.regitstry)
        if (this.data.commentsContent.length != 0) {
            commentsClone.commentsTime = this.data.commentsTime
            commentsClone.regitsory = this.data.regitstry
            commentsClone.commentsContent = this.data.commentsContent
            commentsClone.commentsImages = this.data.commentsImages
            commentsClone.businessContent = this.data.businessContent
            commodityClone[this.data.commodityIndex].comments.unshift(commentsClone)
            regitstryClone.ordersStorage[this.data.ordersIndex].type = 3
            wx.setStorageSync('regitstry', regitstryClone)
            wx.setStorageSync('commodity', commodityClone)
            wx.showToast({
                title: '评论成功',
                mask: true,
                duration: 2000,
                success() {
                    const timer = setTimeout(() => {
                        wx.navigateBack({
                            delta: 1,
                            success() {
                                clearTimeout(timer)
                            }
                        })
                    }, 1000)
                }
            })
        } else {
            wx.showToast({
                title: '评论不能为空',
                mask: true
            })
        }

    },

    dateGenerated() {
        const date = new Date()
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    },

})