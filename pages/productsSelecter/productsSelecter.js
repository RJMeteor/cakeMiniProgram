const app = getApp()
Page({
    data: {
        // 其他规格下标
        other: 0,
        // 规格下标
        specification: 0,
        // 商品数量
        count: 1,
        // 标识是否是购买或加入购物车,addCars:加入购物车，purchase:购买
        type: "addCars"
    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            commodityUUID: options.commodityUUID,
            regitstry: wx.getStorageSync('regitstry'),
            // 从那个页面跳转来的
            active: options.active,
            type: options.type
        })
    },
    onShow() {
        this.setData({
            regitstry: wx.getStorageSync('regitstry'),
            commodity: wx.getStorageSync('commodity').find(ele => ele.commodityUUID === this.data.commodityUUID),
            // 从那个页面跳转来的
        })
        const shoppingCartsclone = app.deepClone(this.data.regitstry.shoppingCarts)
        const commodityUUID = this.data.commodityUUID
        let commodityCountLast = 0;
        shoppingCartsclone.filter((ele) => {
            const flag = ele.commodity.commodityUUID === commodityUUID
            if (flag) {
                if (ele.type === "integral") {
                    exchange += ele.commodity.exchange
                }
                commodityCountLast += ele.count
            }
            return flag
        })
        this.setData({
            commodityCountLast
        })
    },
    selectSpecification(e) {
        let index = e.target.dataset.specification
        if (index >= 0) {
            this.setData({
                specification: index
            })
        }
    },
    selectOther(e) {
        let index = e.target.dataset.other
        if (index >= 0) {
            this.setData({
                other: index
            })
        }
    },
    deleteCount() {
        let count = this.data.count - 1
        if (count >= 1) {
            this.setData({
                count
            })
        }
    },
    addCount() {
        let count = this.data.count + 1
        if (this.data.active === "integral") {
            if (this.data.regitstry.integral - this.data.commodity.exchange * count < 0) {
                wx.showToast({
                    title: '积分不足',
                })
            } else {
                if (count <= this.data.commodity.commodityCount) {
                    this.setData({
                        count
                    })
                }
            }
        } else {
            if (count <= this.data.commodity.commodityCount) {
                this.setData({
                    count
                })
            }
        }

    },
    addCars() {
        const regitstryIntegral = this.data.regitstry.integral
        let exchange = this.data.commodity.exchange

        if (!(this.data.commodity.commodityCount - this.data.commodityCountLast <= 0)) {
            if (this.data.active === "integral") {

                if (regitstryIntegral - exchange < 0) {
                    wx.showToast({
                        title: '积分不足',
                        mask: true,
                        duration: 2000
                    })
                } else {
                    console.log("false")
                    this.addCarsFunc()
                }
            } else {
                this.addCarsFunc()
            }
        } else {
            wx.showToast({
                title: '库存不够',
            })
        }

    },
    addCarsFunc() {
        const shoppingCartsTemplateappClone = app.deepClone(wx.getStorageSync('shoppingCartsTemplate'))
        shoppingCartsTemplateappClone.commodity = this.data.commodity
        shoppingCartsTemplateappClone.selectSpecificationActive = this.data.commodity.selectSpecification[this.data.specification]
        shoppingCartsTemplateappClone.otherSelectSpecificationActive = this.data.commodity.otherSelectSpecification[this.data.other]
        shoppingCartsTemplateappClone.count = this.data.count
        shoppingCartsTemplateappClone.type = this.data.active
        const regitstryClone = app.deepClone(wx.getStorageSync('regitstry'))
        regitstryClone.shoppingCarts.unshift(shoppingCartsTemplateappClone)
        wx.setStorageSync('regitstry', regitstryClone)
        wx.showToast({
            title: '添加购物车成功',
            icon: "success",
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
    },
    purchase() {
        const regitstryClone = app.deepClone(wx.getStorageSync('regitstry'))
        if (!(this.data.commodity.commodityCount - this.data.commodityCountLast <= 0)) {
            if (this.data.active !== "integral") {
                if (regitstryClone.adderssIndex.length !== 0) {
                    this.purchaseFunc(regitstryClone)
                } else {
                    wx.showToast({
                        title: '未选择默认地址',
                        mask: true,
                        duration: 2000,
                        success() {
                            const timer = setTimeout(() => {
                                wx.navigateTo({
                                    url: '../insertAddress/insertAddress',
                                    success() {
                                        clearTimeout(timer)
                                    }
                                })
                            }, 2000)
                        }
                    })
                }
            } else {
                if (this.data.regitstry.integral - this.data.commodity.exchange < 0) {
                    wx.showToast({
                        title: '亲~你积分不足',
                        mask: true,
                        duration: 2000
                    })
                } else {
                    this.purchaseFunc(regitstryClone)
                }
            }
        } else {
            wx.showToast({
                title: '库存不够',
            })
        }
    },
    purchaseFunc(regitstryClone) {
        const shoppingCartsTemplateappClone = app.deepClone(wx.getStorageSync('shoppingCartsTemplate'))
        shoppingCartsTemplateappClone.commodity = this.data.commodity
        const integral = this.data.commodity.integral
        const commodityUUID = this.data.commodityUUID
        const active = this.data.active
        const exchange = this.data.commodity.exchange
        const count = this.data.count

        shoppingCartsTemplateappClone.selectSpecificationActive = this.data.commodity.selectSpecification[this.data.specification]
        shoppingCartsTemplateappClone.otherSelectSpecificationActive = this.data.commodity.otherSelectSpecification[this.data.other]
        shoppingCartsTemplateappClone.count = count
        shoppingCartsTemplateappClone.type = this.data.active
        const ordersClone = app.deepClone(wx.getStorageSync('orders'))
        ordersClone.ordersUUID = `${Math.random().toFixed(11).split(".")[1].toString()}`
        ordersClone.shoppingCarts.unshift(shoppingCartsTemplateappClone)
        ordersClone.distributionYMD = this.dateGenerated()
        ordersClone.distributionTime = this.timeGenerated()
        ordersClone.cost = this.computedPrice(this.data.active, count)
        wx.showModal({
            content: '亲~确定购买？',
            complete: (res) => {
                if (res.confirm) {
                    wx.showModal({
                        title: "支付",
                        content: `${ordersClone.cost}`,
                        complete: async (res) => {
                            if (res.cancel) {
                                wx.showToast({
                                    title: '请及时支付',
                                    icon: "error",
                                    mask: true,
                                    duration: 2000,
                                    success() {
                                        const ordersCloneApply = app.deepClone(ordersClone)
                                        ordersCloneApply.type = 0
                                        ordersCloneApply.adderssIndex = regitstryClone.adderssIndex + ""
                                        regitstryClone.ordersStorage.unshift(ordersCloneApply)
                                        wx.setStorageSync('regitstry', regitstryClone)
                                        const timer = setTimeout(() => {
                                            wx.navigateBack({
                                                delta: 1,
                                                success() {
                                                    clearTimeout(timer)
                                                }
                                            })
                                        }, 2000);
                                    }
                                })

                            }
                            if (res.confirm) {
                                wx.showToast({
                                    title: '正在支付...',
                                    icon: 'loading',
                                    mask: true,
                                    duration: 1500,
                                    success() {
                                        ordersClone.type = 2
                                        ordersClone.adderssIndex = regitstryClone.adderssIndex + ""
                                        const consumptionRecordsClone = app.deepClone(wx.getStorageSync('consumptionRecords'))
                                        const commodityClone = app.deepClone(wx.getStorageSync('commodity'))
                                        commodityClone.forEach((element, index) => {
                                            if (element.commodityUUID === commodityUUID) {
                                                element.commodityCount -= shoppingCartsTemplateappClone.count
                                                console.log(element.commodityCount)
                                                element.coupon.forEach((ele, index) => {
                                                    if (ele.couponRegitstryUUIDReceive.includes(regitstryClone.UUID)) {
                                                        ele.couponRegitstryUUIDActive.push(regitstryClone.UUID)
                                                        const coupon = regitstryClone.coupon.filter((ele) => {
                                                            return ele.commodityUUID === commodityUUID
                                                        })[index]
                                                        coupon?.couponRegitstryUUIDReceive.push(regitstryClone.UUID)
                                                        coupon?.couponRegitstryUUIDActive.push(regitstryClone.UUID)
                                                        return
                                                    }
                                                })
                                                return
                                            }
                                        });
                                        wx.setStorageSync('commodity', commodityClone)
                                        consumptionRecordsClone.consumptionTime = ordersClone.distributionYMD
                                        // consumptionRecordsClone.obtainIntegral = integral
                                        consumptionRecordsClone.obtainIntegral = integral*count
                                        consumptionRecordsClone.spendAmount = ordersClone.cost
                                        // regitstryClone.integral = regitstryClone.integral + integral
                                        regitstryClone.integral = regitstryClone.integral + integral*count
                                        if (active === "integral") {
                                            // regitstryClone.integral -= exchange
                                            regitstryClone.integral -= exchange*count
                                        }
                                        regitstryClone.consumptionRecords.unshift(consumptionRecordsClone)
                                        regitstryClone.ordersStorage.unshift(ordersClone)
                                        wx.setStorageSync('regitstry', regitstryClone)
                                        wx.showToast({
                                            title: '支付成功',
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
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    computedPrice(active, count) {
        if (active === "default") {
            return this.data.commodity.price * count + "元"
        } else if (active === "member") {
            // return this.data.commodity.preferentialPrice + "元"
            return this.data.commodity.preferentialPrice *count + "元"
        } else {
            // return this.data.commodity.exchange + "积分"
            return this.data.commodity.exchange*count + "积分"
        }
    },
    dateGenerated() {
        const date = new Date()
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    },
    timeGenerated() {
        const date = new Date()
        return `${date.getHours()}:00-${date.getHours()+2<=24?date.getHours()+2:"00"}:00`
    }
})