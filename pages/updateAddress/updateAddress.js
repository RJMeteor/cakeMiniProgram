const app = getApp()
Page({
    data: {

    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            regitstry: app.deepClone(wx.getStorageSync('regitstry')),
            // 是否是添加或更新地址
            type: options.type,
            index: options.index,
            ...(options.type === "update" ? app.deepClone(wx.getStorageSync('regitstry').address[options.index]) : app.deepClone(wx.getStorageSync('address'))),
            address: app.deepClone(wx.getStorageSync('regitstry').address)
        })
    },
    onShow() {},
    update() {
        if (this.data.username && this.data.phone && this.data.addressText && this.data.houseNumber) {
            this.data.regitstry.address[this.data.index] = app.deepClone({
                username: this.data.username,
                phone: this.data.phone,
                addressText: this.data.addressText,
                houseNumber: this.data.houseNumber
            })
            wx.setStorageSync('regitstry', this.data.regitstry)
            wx.showToast({
                title: '更新成功',
                icon: "success",
                duration: 1000,
                mask: true,
                success(){
                    const timer = setTimeout(()=>{
                       wx.navigateBack({
                           delta:1,
                           success(){
                               clearTimeout(timer)
                           }
                       })
                     },1000)
                 }
            })
            // wx.navigateBack({
            //     delta: "1"
            // })
        } else {
            wx.showToast({
                title: '输入框不能为空',
                icon: "error",
                duration: 2000,
                mask: true
            })
        }
    },
    insert() {
        if (this.data.username && this.data.phone && this.data.addressText && this.data.houseNumber) {
            this.data.regitstry.address.push({
                username: this.data.username,
                phone: this.data.phone,
                addressText: this.data.addressText,
                houseNumber: this.data.houseNumber
            })
            wx.setStorageSync('regitstry', app.deepClone(this.data.regitstry))
            wx.showToast({
                title: '添加成功',
                icon: "success",
                duration: 1000,
                mask: true,
                success(){
                    const timer = setTimeout(()=>{
                       wx.navigateBack({
                           delta:1,
                           success(){
                               clearTimeout(timer)
                           }
                       })
                     },1000)
                 }
            })
            // wx.navigateBack({
            //     delta: "1"
            // })
        } else {
            wx.showToast({
                title: '输入框不能为空',
                icon: "error",
                duration: 2000,
                mask: true
            })
        }
    },
})