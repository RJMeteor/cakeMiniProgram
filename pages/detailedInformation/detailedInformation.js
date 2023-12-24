const app = getApp()
Page({
    data: {
        sex: "",
        sheetShow: false,
        calendarShow: false,
        sheetActions: [{
                name: "男",
            },
            {
                name: "女"
            }
        ]
    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {
        this.setData({
            regitstry: wx.getStorageSync("regitstry"),
            sex: wx.getStorageSync('regitstry').sex
        })
    },
    chooseMedia() {
        const regitstry = this.data.regitstry
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            success:(res)=> {
                regitstry.avatarImage = res.tempFiles[0].tempFilePath
                wx.setStorageSync('regitstry', app.deepClone( regitstry))
                this.setData({
                    regitstry: wx.getStorageSync("regitstry"),
                })
            }
        })
    },
    doRename() {
        wx.navigateTo({
            url: '../rename/rename',
        })
    },
    doUpdatePassword() {
        wx.navigateTo({
            url: '../updatePassword/updatePassword',
        })
    },
    changeSex() {
        this.setData({
            sheetShow: true
        })
    },
    onCloseSheet() {
        this.setData({
            sheetShow: false
        });
    },
    onSelectSheet(event) {
        const regitstry = app.deepClone(wx.getStorageSync('regitstry'))
        if (regitstry.sex !== event.detail.name) {
            wx.showModal({
                content: '确定更改性别？',
                complete: (res) => {
                    if (res.confirm) {
                        regitstry.sex = event.detail.name
                        wx.setStorageSync('regitstry', regitstry)
                        this.initData()
                        wx.showToast({
                            title: '更改成功',
                            mask: true,
                            duration: 2000
                        })
                    }
                }
            })
        }
        this.setData({
            sheetShow: false
        })
    },
    changeBirthdayTime() {
        this.setData({
            calendarShow: true
        })
    },
    onCloseCalendar() {
        this.setData({
            calendarShow: false
        });
    },
    formatDateCalendar(date) {
        date = new Date(date);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirmCalendar(event) {
        const regitstry = app.deepClone(wx.getStorageSync('regitstry'))
        let birthdayTime = this.formatDateCalendar(event.detail)
        if (birthdayTime !== regitstry.birthdayTime) {
            wx.showModal({
                content: '确定修改日期吗',
                complete: (res) => {
                    if (res.confirm) {
                        regitstry.birthdayTime = this.formatDateCalendar(event.detail)
                        wx.setStorageSync('regitstry', regitstry)
                        this.initData()
                        wx.showToast({
                            title: '修改成功',
                            mask: true,
                            duration: 2000
                        })
                    }
                }
            })
        }
        this.setData({
            calendarShow: false
        });
    },
    initData() {
        this.setData({
            regitstry: wx.getStorageSync("regitstry"),
        })
    }
})