const app = getApp()
Page({
    data: {},
    onLoad() {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            ordersStorage: wx.getStorageSync('regitstry').ordersStorage
        })
    },

    onShow() {
        this.setData({
            active: 4,
            regitstry:wx.getStorageSync('regitstry'),
            ordersStorage: wx.getStorageSync('regitstry').ordersStorage
        })
    },
    orderAll() {
       this.setData({
           ordersStorage:wx.getStorageSync('regitstry').ordersStorage
       }) 
       this.changeActive(4)
    },
    doReminder() {
        this.setData({
            ordersStorage:wx.getStorageSync('regitstry').ordersStorage.filter(ele=>ele.type === 0)
        })
        this.changeActive(0)
    },
    doComment() {
        this.setData({
            ordersStorage:wx.getStorageSync('regitstry').ordersStorage.filter(ele=>ele.type === 1)
        }) 
        
        this.changeActive(1)
    },
    // 取消订单
    cancelOrder(e){
        const ordersUUID = e.currentTarget.dataset.ordersuuid
        const regitstryClone = app.deepClone(this.data.regitstry)
        let  cancelOrderIndex;
        regitstryClone.ordersStorage.find((ele,index)=>{
            const flag = ele.ordersUUID === ordersUUID
            if(flag){
                cancelOrderIndex =  index
            }
            return flag
        })
        if((cancelOrderIndex+"").length!==0){
            wx.showModal({
              content: '确定取消订单吗',
              complete: (res) => {
                if (res.confirm) {
                    regitstryClone.ordersStorage.splice(cancelOrderIndex,1)
                    wx.setStorageSync('regitstry', regitstryClone)
                    this.setData({
                        ordersStorage: wx.getStorageSync('regitstry').ordersStorage
                    })
                    wx.showToast({
                      title: '取消成功',
                      mask:true,
                      duration:2000
                    })
                }
              }
            })
        }
        
    },
    changeActive(active) {
        this.setData({
            active
        })
    },
    navigationComments(e) {
        wx.navigateTo({
            url: `../comments/comments?commodityUUID=${e.currentTarget.dataset.commodityuuid}&ordersUUID=${e.currentTarget.dataset.ordersuuid}`,
        })
    },
    navigationSubmitOrders(e) {
        wx.navigateTo({
            url: `../submitOrders/submitOrders?ordersUUID=${e.currentTarget.dataset.ordersuuid}`,
        })
    },
    navigationReminder(e) {
        wx.navigateTo({
            url:  `../reminder/reminder?ordersUUID=${e.currentTarget.dataset.ordersuuid}`,
        })
    },
    // navigationFinishOrders() {
    //     wx.navigateTo({
    //         url: '../finishOrders/finishOrders',
    //     })
    // },
    navigationCommondityComments(e){
        wx.navigateTo({
            url: `../commodityComments/commodityComments?commodityUUID=${e.currentTarget.dataset.commodityuuid}`,
          })
    }
})