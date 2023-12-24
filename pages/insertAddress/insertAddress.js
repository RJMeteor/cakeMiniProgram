const app = getApp()
Page({
    data: {

    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            regitstry: wx.getStorageSync('regitstry'),
            address: wx.getStorageSync('regitstry').address,
            ordersUUID: options.ordersUUID
        })
    },
    onShow() {
        this.addressStatus()
    },
    navigationUpdateAddress(e) {
        wx.navigateTo({
            url: `../updateAddress/updateAddress?type=update&index=${e.currentTarget.dataset.update}`,
        })
    },
    setAddress(e) {
        if (!this.data.ordersUUID) {
            wx.showModal({
                content: '设为默认地址',
                complete: (res) => {
                    if (res.confirm) {
                        const regitstryClone = app.deepClone(this.data.regitstry)
                        regitstryClone.adderssIndex = "" + e.currentTarget.dataset.arrayindex
                        wx.setStorageSync('regitstry', regitstryClone)
                        wx.showToast({
                            title: '设置成功',
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
                                },2000)
                            }
                        })
                    }
                }
            })
        } else {
            this.data.regitstry.ordersStorage.forEach(ele => {
                if (ele.ordersUUID === this.data.ordersUUID) {
                    ele.adderssIndex = "" + e.currentTarget.dataset.arrayindex
                }
                return;
            })
            wx.setStorageSync('regitstry', app.deepClone(this.data.regitstry))
            wx.showToast({
                title: '设置成功',
                mask: true,
                duration: 2000
            })
        }
    },

    doSubmit() {
        wx.navigateTo({
            url: '../updateAddress/updateAddress?type=insert',
        })
    },
    doDelete(e) {
        const regitstry = app.deepClone(wx.getStorageSync('regitstry'))
        const deleteIndex = e.currentTarget.dataset.delete
        const flag = regitstry.ordersStorage.find(ele => parseInt(ele.adderssIndex) === deleteIndex)
        if (!flag) {
            if (regitstry.adderssIndex + "" === "" + deleteIndex) {
                wx.showModal({
                    content: '该地址是默认地址是否确定删除',
                    complete: (res) => {
                        if (res.confirm) {
                            regitstry.address.splice(deleteIndex, 1)
                            regitstry.adderssIndex = ""
                            wx.setStorageSync('regitstry', regitstry)
                            this.addressStatus()
                            wx.showToast({
                                title: '删除成功！',
                                icon: "success",
                                mask: true,
                                duration: 2000
                            })
                        }
                    }
                })
            } else {
                wx.showModal({
                    content: '是否要删除该地址！',
                    complete: (res) => {
                        if (res.confirm) {
                            regitstry.address.splice(deleteIndex, 1)
                            wx.setStorageSync('regitstry', regitstry)
                            this.addressStatus()
                            wx.showToast({
                                title: '删除成功！',
                                icon: "success",
                                mask: true,
                                duration: 2000
                            })
                        }
                    }
                })
            }
        } else {
            wx.showToast({
                title: '该地址在使用',
                icon: "success",
                mask: true,
                duration: 2000
            })
        }
    },
    addressStatus() {
        this.setData({
            address: wx.getStorageSync('regitstry').address,
            regitstry: wx.getStorageSync('regitstry'),
        })
    }
})