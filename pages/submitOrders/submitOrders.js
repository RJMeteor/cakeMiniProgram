const {
    orders
} = require("../../storage/storage")

const app = getApp()
Page({
    data: {
        // 留言内容
        message: ""
    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            ordersUUID: options.ordersUUID,
        })
    },
    onShow() {
        this.setData({
            regitstry: wx.getStorageSync('regitstry'),
            orders: wx.getStorageSync('regitstry').ordersStorage.find((ele, index) => {
                const flag = ele.ordersUUID === this.data.ordersUUID
                if (flag) {
                    this.setData({
                        ordersIndex: index,
                        message: ele.message
                    })
                }
                return flag
            })
        })
    },
    doSubmit() {
        const adderssIndex = this.data.orders.adderssIndex
        const total = this.data.orders.cost
        const message = this.data.message
        const regitstryClone = app.deepClone(this.data.regitstry)
        const commodityClone = app.deepClone(wx.getStorageSync('commodity'))
        console.log(this.data.orders.shoppingCarts[0].commodity.commodityCount)
        let count;
        wx.getStorageSync('commodity').find(ele=>{
            const flag = ele.commodityUUID === this.data.orders.shoppingCarts[0].commodity.commodityUUID
            if(flag){
                count = ele.commodityCount
            } 
            return flag
        })
        this.data.regitstry.shoppingCarts.forEach(ele=>{
            if(ele.commodity.commodityUUID === this.data.orders.shoppingCarts[0].commodity.commodityUUID){
                count -= ele.commodity.commodityCount
            }
        })
        console.log(count,"submit")
        if (count <= 0) {
            wx.showToast({
                title: '没有库存了！！',
            })
        } else {
            if(this.data.orders.shoppingCarts[0].type ==="integral"){
                const shoppingCartsSingle = this.data.orders.shoppingCarts[0]
                if(this.data.regitstry.integral<shoppingCartsSingle.commodity.exchange*shoppingCartsSingle.count){
                    wx.showToast({
                      title: '积分不足',
                    })
                    return
                }
            }
            if (adderssIndex.length !== 0) {
                wx.showModal({
                    title: '支付',
                    content: `${total}`,
                    complete: (res) => {
                        const ordersStorageSingle = regitstryClone.ordersStorage[this.data.ordersIndex]
                        ordersStorageSingle.message = message
                        const consumptionRecordsClone = app.deepClone(wx.getStorageSync('consumptionRecords'))
                        if (res.confirm) {
                            ordersStorageSingle.type = 2
                            if (ordersStorageSingle.shoppingCarts[0].type === "integral") {
                                // regitstryClone.integral -= ordersStorageSingle.shoppingCarts[0].commodity.exchange
                                regitstryClone.integral -= ordersStorageSingle.shoppingCarts[0].commodity.exchange*ordersStorageSingle.shoppingCarts[0].count
                            }
                            consumptionRecordsClone.consumptionTime = this.dateGenerated()
                            // consumptionRecordsClone.obtainIntegral = ordersStorageSingle.shoppingCarts[0].commodity.integral
                            consumptionRecordsClone.obtainIntegral = ordersStorageSingle.shoppingCarts[0].commodity.integral*ordersStorageSingle.shoppingCarts[0].count
                            consumptionRecordsClone.spendAmount = total
                            regitstryClone.consumptionRecords.unshift(consumptionRecordsClone)
                            // regitstryClone.integral += ordersStorageSingle.shoppingCarts[0].commodity.integral
                            regitstryClone.integral += ordersStorageSingle.shoppingCarts[0].commodity.integral*ordersStorageSingle.shoppingCarts[0].count
                            commodityClone.find(ele => {
                                const flag = ele.commodityUUID === ordersStorageSingle.shoppingCarts[0].commodity.commodityUUID
                                if (flag) {
                                    ele.commodityCount -= ordersStorageSingle.shoppingCarts[0].count
                                }
                                return flag
                            })
                            
                            wx.setStorageSync('commodity', commodityClone)
                            wx.setStorageSync('regitstry', regitstryClone)
                            wx.showToast({
                                title: '付款成功',
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
                        }
                        wx.setStorageSync('regitstry', regitstryClone)
                    }
                })
            } else {
                wx.showToast({
                    title: '收货地址未选',
                    mask: true,
                    duration: 2000
                })
            }
        }
    },
    navagationInsetAddress() {
        wx.navigateTo({
            url: `../insertAddress/insertAddress?ordersUUID=${this.data.ordersUUID}`,
        })
    },
    dateGenerated() {
        const date = new Date()
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    },
})