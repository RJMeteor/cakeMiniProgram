const app = getApp()
Page({
    data: {
        oldPassword: "",
        newPassword: "",
        surePassword: ""
    },

    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {
        this.setData({
            password: wx.getStorageSync('regitstry').password
        })
    },
    onSubmit() {
        if (this.data.oldPassword&&this.data.password&&(this.data.oldPassword === this.data.password)) {
            if (this.data.newPassword&&this.data.surePassword&&(this.data.newPassword === this.data.surePassword)) {
                wx.showModal({
                    content: '确定修改密码吗',
                    complete: (res) => {
                        if (res.confirm) {
                            const regitstry = app.deepClone(wx.getStorageSync('regitstry'))
                            regitstry.password = this.data.newPassword
                            wx.setStorageSync('regitstry', regitstry)
                            wx.showToast({
                                title: '修改成功',
                                mask: true,
                                duration: 2000,
                                success(){
                                    const timer = setTimeout(()=>{
                                        wx.navigateBack({
                                            delta:1,
                                            success(){
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
                wx.showToast({
                    title: '新密码有误',
                    mask: true,
                    duration: 2000
                })
            }
        } else {
            wx.showToast({
                title: '旧密码不正确',
                mask: true,
                duration: 2000
            })
        }
    }
})