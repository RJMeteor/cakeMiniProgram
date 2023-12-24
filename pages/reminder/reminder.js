const app = getApp()
Page({


    data: {

    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            ordersUUID:options.ordersUUID
        })
    },
    onShow() {
        this.setData({
            regitstry:wx.getStorageSync('regitstry'),
            orders:wx.getStorageSync('regitstry').ordersStorage.find((ele,index)=>{
                const flag = ele.ordersUUID === this.data.ordersUUID
                if (flag) {
                    this.setData({
                        ordersIndex: index
                    })
                }
                return flag
            })
        })
    },
    doSubmit(){
        const regitstryClone = app.deepClone(this.data.regitstry)
        const ordersIndex = this.data.ordersIndex
        wx.showModal({
          content: '确认催单吗',
          complete: (res) => {
            if (res.confirm) {
              regitstryClone.ordersStorage[ordersIndex].type = 1
              regitstryClone.ordersStorage[ordersIndex].adderssIndex = ""
              
              wx.setStorageSync('regitstry', regitstryClone)
              wx.showToast({
                title: '催单成功',
                mask:true,
                duration:1000,
                success(){
                    const timer = setTimeout(()=>{
                        wx.navigateBack({
                            delta: 1,
                            success() {
                                clearTimeout(timer)
                            }
                        })
                    },1000) 
                }
              })
            }
          }
        })
    }
})