Page({

    data: {
        phone: "",
        captchaInput: "",
        captchaValue: "",
        captchaStatus: false,
        time:12
    },
    onLoad() {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {
        this.setData({
            phone: wx.getStorageSync('regitstry').phone,
        })
    },
    onSubmit() {
        if (this.data.captchaInput === this.data.captchaValue) {
            wx.navigateTo({
                url: '../anewBindPhone/anewBindPhone',
            })
        }else{
            wx.showToast({
              title: '验证码不正确',
            })
        }
    },
    captcha(e) {
        if (!this.data.captchaStatus) {
            this.setData({
                captchaStatus: true,
                captchaValue: Math.random().toFixed(6).toString().split(".")[1]
            })
            wx.showToast({
                title: this.data.captchaValue,
                icon: "success",
                duration: 5000
            })
            this.setData({
                timer: setInterval(() => {
                    this.setData({
                        time: this.data.time-1
                    })
                    if (this.data.time === 0) {
                        this.setData({
                            captchaStatus: false,
                            time: 12,
                        })
                        clearInterval(this.data.timer)
                    }
                }, 1000)
            })
        }

    }
})