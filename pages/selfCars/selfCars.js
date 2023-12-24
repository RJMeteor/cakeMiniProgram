const app = getApp()
Page({
    data: {
        selectCarsIndex: [],
        // 是否全选
        allSelect: false,
        // 积分
        integral: 0,
        // 总价，money
        total: 0,
        activeCoupon: {}
    },
    onLoad() {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
            regitstry: wx.getStorageSync('regitstry'),
            showEdit: true,
            editText: "编辑",
        })
    },
    onShow() {
        this.setData({
            cars: wx.getStorageSync('regitstry').shoppingCarts,
        })
    },
    deleteCars(e) {
        wx.showModal({
            content: '你确定要删除这件商品吗',
            complete: (res) => {
                if (res.confirm) {
                    const index = e.currentTarget.dataset.deleteindex
                    const carsClone = app.deepClone(this.data.cars)
                    const count = carsClone[index].count
                    if (carsClone[index].type === "default") {
                        if (this.data.selectCarsIndex.includes(parseInt(index))) {
                            this.setData({
                                total: this.data.total - carsClone[index].commodity.price * count
                            })
                        }
                    } else if (carsClone[index].type === "member") {
                        if (this.data.selectCarsIndex.includes(parseInt(index))) {
                            this.setData({
                                total: this.data.total - carsClone[index].commodity.preferentialPrice * count
                            })
                        }
                    } else {
                        if (this.data.selectCarsIndex.includes(parseInt(index))) {
                            this.setData({
                                integral: this.data.integral - carsClone[index].commodity.exchange * count
                            })
                        }
                    }
                    // const commodityClone = app.deepClone(wx.getStorageSync('commodity'))
                    // commodityClone.find((ele)=>{
                    //     const flag = ele.commodityUUID
                    //     if(flag){
                    //         ele.commodityCount += count
                    //         console.log(ele.commodityCount)
                    //     }
                    //     return flag
                    // })
                    // wx.setStorageSync('commodity', app.deepClone(commodityClone))
                    const regitstryClone = app.deepClone(wx.getStorageSync('regitstry'))
                    carsClone.splice(index, 1)
                    const selectCarsIndexSingle = this.data.selectCarsIndex
                    regitstryClone.shoppingCarts = app.deepClone(carsClone)
                    wx.setStorageSync('regitstry', regitstryClone)
                    this.setData({
                        cars: app.deepClone(carsClone),
                        selectCarsIndex:app.deepClone(selectCarsIndexSingle.splice(selectCarsIndexSingle.indexOf(index),1))
                    })
                    this.onLoad()
                }
            }
        })


    },
    doSubmit() {
        const regitstryClone = app.deepClone(wx.getStorageSync('regitstry'))
        const adderssIndex = regitstryClone.adderssIndex
        const total = this.data.total
        const integral = this.data.integral
        const cars = this.data.cars
        if (integral <= this.data.regitstry.integral) {
            if (this.data.selectCarsIndex.length != 0) {
                if (adderssIndex.length !== 0) {
                    wx.showModal({
                        content: '确定购买吗',
                        complete: (res) => {
                            if (res.confirm) {
                                wx.showModal({
                                    title: "支付",
                                    content: `${"￥"+total+"+积分"+integral}`,
                                    complete: (res) => {
                                        const ordersCloneArray = []
                                        const carsClone = app.deepClone(cars)
                                        this.data.selectCarsIndex.forEach((ele,index) => {
                                            delete this.data.selectCarsIndex[index]
                                            this.setData({
                                                selectCarsIndex: this.data.selectCarsIndex.filter(ele=>ele==="empty")
                                            })
                                            const ordersClone = app.deepClone(wx.getStorageSync('orders'))
                                            ordersClone.adderssIndex = adderssIndex
                                            ordersClone.ordersUUID = Math.random().toFixed(11).split(".")[1].toString()
                                            ordersClone.distributionYMD = this.dateGenerated()
                                            ordersClone.distributionTime = this.timeGenerated()
                                            const carsSingle = cars[parseInt(ele)]
                                            if (carsSingle.type === "default") {
                                                ordersClone.cost = carsSingle.commodity.price * carsSingle.count + "元"
                                                this.setData({
                                                    total: this.data.total - carsSingle.commodity.price * carsSingle.count
                                                })
                                            } else if (carsSingle.type === "member") {
                                                ordersClone.cost = carsSingle.commodity.preferentialPrice * carsSingle.count + "元"
                                                this.setData({
                                                    total: this.data.total - carsSingle.commodity.preferentialPrice * carsSingle.count
                                                })
                                            } else {
                                                ordersClone.cost = carsSingle.commodity.exchange * carsSingle.count + "积分"
                                                this.setData({
                                                    integral: this.data.integral - carsSingle.commodity.exchange * carsSingle.count
                                                })
                                            }
                                            ordersCloneArray.push(ordersClone)
                                            // ordersClone.shoppingCarts.push(cars[parseInt(ele)])
                                            ordersClone.shoppingCarts.push(carsSingle)
                                            regitstryClone.ordersStorage.unshift(ordersClone)
                                            delete carsClone[parseInt(ele)]
                                        })
                                        regitstryClone.shoppingCarts = carsClone.filter(ele => ele != "empty")
                                        // this.total()
                                        if (res.cancel) {
                                            ordersCloneArray.forEach((ele) => {
                                                ele.type = 0
                                            })
                                            wx.showToast({
                                                title: '请尽快支付',
                                                mask: true,
                                                duration: 2000
                                            })
                                            // this.total()
                                        }
                                        if (res.confirm) {
                                            const commodityCloneList = app.deepClone(wx.getStorageSync('commodity'))
                                            ordersCloneArray.forEach((ele) => {
                                                const shoppingSinge = ele.shoppingCarts[0]
                                                const consumptionRecordsClone = app.deepClone(wx.getStorageSync('consumptionRecords'))
                                                commodityCloneList.find((elementSingle, indexSingle) => {
                                                    const flag = shoppingSinge.commodity.commodityUUID === elementSingle.commodityUUID
                                                    if (flag) {
                                                        elementSingle.commodityCount -= shoppingSinge.count
                                                    }
                                                    return flag
                                                })
                                                wx.setStorageSync('commodity', app.deepClone(commodityCloneList))
                                                // regitstryClone.integral += shoppingSinge.commodity.integral
                                                regitstryClone.integral += shoppingSinge.commodity.integral * shoppingSinge.count
                                                consumptionRecordsClone.consumptionTime = this.dateGenerated()
                                                // consumptionRecordsClone.obtainIntegral = shoppingSinge.commodity.integral
                                                consumptionRecordsClone.obtainIntegral = shoppingSinge.commodity.integral * shoppingSinge.count
                                                consumptionRecordsClone.spendAmount = ele.cost
                                                regitstryClone.consumptionRecords.unshift(consumptionRecordsClone)
                                                ele.type = 2
                                                if (shoppingSinge.type === "integral") {
                                                    // regitstryClone.integral -= shoppingSinge.commodity.exchange
                                                    regitstryClone.integral -= shoppingSinge.count * shoppingSinge.commodity.exchange
                                                }
                                            })
                                            wx.showToast({
                                                title: '购买成功',
                                                mask: true,
                                                duration: 2000
                                            })
                                        }

                                        wx.setStorageSync('regitstry', regitstryClone)
                                        this.setData({
                                            cars: wx.getStorageSync('regitstry').shoppingCarts,
                                        })
                                    }
                                })

                            }
                        }
                    })
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
                wx.showToast({
                    title: '未选择商品',
                })
            }
        } else {
            wx.showToast({
                title: '积分不足',
            })
        }
        this.setData({
            regitstry: wx.getStorageSync('regitstry')
        })


    },
    navigatinHome() {
        wx.reLaunch({
            url: '../home/home',
        })
    },
    dateGenerated() {
        const date = new Date()
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    },
    timeGenerated() {
        const date = new Date()
        return `${date.getHours()}:00-${date.getHours()+2<=24?date.getHours()+2:"00"}:00`
    },
    // 计算总价
    total() {
        this.setData({
            integral: 0,
            // 总价，money
            total: 0,
        })
        this.data.selectCarsIndex.forEach(ele => {
            const cart = this.data.cars[parseInt(ele)]
            if (cart.type === "default") {
                const price = cart.commodity.price
                const count = cart.count
                this.setData({
                    total: this.data.total + price * count
                })
                // this.utilFun(cart, price, count)
            } else if (cart.type === "member") {
                const preferentialPrice = cart.commodity.preferentialPrice
                const count = cart.count
                this.setData({
                    total: this.data.total + preferentialPrice * count
                })
                // this.utilFun(cart, preferentialPrice, count)
            } else {
                const exchange = cart.commodity.exchange
                const count = cart.count
                this.setData({
                    integral: this.data.integral + exchange * count
                })

            }
        })
    },
    utilFun(cart, price, count) {
        cart.commodity.coupon.forEach((ele, index) => {
            if (!ele.couponRegitstryUUIDActive.includes(wx.getStorageSync('regitstry').UUID)) {
                const rangePrice = ele.rangePrice.split("-")
                const active = this.data.activeCoupon[ele.commodityUUID]
                if (active) {
                    if (!active.includes(parseInt(index))) {
                        if (parseInt(rangePrice[0]) <= price && parseInt(rangePrice[1]) >= price) {
                            const activeCoupon = app.deepClone(this.data.activeCoupon)
                            activeCoupon[ele.commodityUUID].push(parseInt(index))
                            this.setData({
                                activeCoupon
                            })
                            this.setData({
                                total: this.data.total + price * count - ele.preferentialPrice
                            })
                        }
                    } else {
                        this.setData({
                            total: this.data.total + price * count
                        })
                    }
                } else {
                    const activeCoupon = app.deepClone(this.data.activeCoupon)
                    activeCoupon[ele.commodityUUID] = [index]
                    this.setData({
                        activeCoupon,
                        total: this.data.total + price * count - ele.preferentialPrice
                    })
                }
            }
        })
    },
    selectSelfCars(e) {
        const selectIndex = e.currentTarget.dataset.selfindex
        const flag = this.data.selectCarsIndex.indexOf(parseInt(selectIndex))
        const selectCarsIndexClone = app.deepClone(this.data.selectCarsIndex)
        const carsSingle = this.data.cars[selectIndex]
        if (carsSingle.type === "integral") {
            if (carsSingle.commodity.exchange * carsSingle.count > this.data.regitstry.integral) {
                wx.showToast({
                    title: '积分不足',
                })
                return
            }
        }
        if (flag >= 0) {
            selectCarsIndexClone.splice(flag, 1)
            this.setData({
                selectCarsIndex: selectCarsIndexClone,
                allSelect: false
            })
        } else {
            selectCarsIndexClone.push(parseInt(selectIndex))
            this.setData({
                selectCarsIndex: selectCarsIndexClone,
                allSelect: selectCarsIndexClone.length == this.data.cars.length
            })
        }
        this.changeActiveCoupon(this.data.cars[selectIndex])
        this.total()
    },
    allSelect() {
        const selectCarsIndex = []
        if (!this.data.allSelect) {
            for (const index in this.data.cars) {
                if (this.data.cars[index].type === "integral") {
                    if (this.data.cars[index].commodity.exchange * this.data.cars[index].count > this.data.regitstry.integral) {
                        wx.showToast({
                            title: '积分不足',
                        })
                        continue
                    }
                }

                selectCarsIndex.push(parseInt(index))
                const cart = this.data.cars[index]
                if (cart.type === "default") {
                    const activeCouponClone = app.deepClone(this.data.activeCoupon)
                    activeCouponClone[cart.commodity.commodityUUID] = undefined
                    this.setData({
                        activeCoupon: activeCouponClone
                    })
                }
            }
            this.setData({
                selectCarsIndex,
                allSelect: selectCarsIndex.length === this.data.cars.length
            })
        } else {
            this.setData({
                selectCarsIndex,
                allSelect: false
            })
        }
        this.total()
    },
    editEvent() {
        if (this.data.showEdit) this.setData({
            showEdit: false,
            editText: "完成"
        })
        else this.setData({
            showEdit: true,
            editText: "编辑"
        })
    },
    changespecificationActive(e) {
        const selectSpecificationActive = e.detail.value
        const index = e.detail.index
        this.data.cars[index].selectSpecificationActive = selectSpecificationActive
        this.setData({
            cars: this.data.cars
        })
        const regitstryClone = app.deepClone(this.data.regitstry)
        regitstryClone.shoppingCarts = app.deepClone(this.data.cars)
        wx.setStorageSync('regitstry', regitstryClone)
        this.total()
    },

    deleteCount(e) {
        let {
            index,
            oldcount
        } = e.currentTarget.dataset
        oldcount -= 1
        this.changeActiveCoupon(this.data.cars[index])
        this.total()
        if (oldcount >= 1) {
            const cars = app.deepClone(this.data.cars)
            cars[index].count = oldcount
            this.setData({
                cars
            })
            const regitstryClone = app.deepClone(this.data.regitstry)
            regitstryClone.shoppingCarts = app.deepClone(this.data.cars)
            wx.setStorageSync('regitstry', regitstryClone)
            if (this.data.selectCarsIndex.includes(parseInt(index))) this.total()
        }
    },
    addCount(e) {
        let {
            index,
            newcount,
            oldcount
        } = e.currentTarget.dataset
        const cars = app.deepClone(this.data.cars)
        let totalCount = 0
        this.data.cars.forEach(ele => {
            if (cars[index].commodity.commodityUUID === ele.commodity.commodityUUID) {
                totalCount += ele.count
            }
        })
        oldcount += 1
        this.changeActiveCoupon(cars[index])
        this.total()
        if (cars[index].type === "integral") {
            if ((this.data.regitstry.integral - cars[index].commodity.exchange * oldcount) < 0) {
                wx.showToast({
                    title: '积分不足你添加',
                })
            } else {
                this.handlerCount(cars, index, oldcount, newcount, totalCount)
            }
        } else {
            this.handlerCount(cars, index, oldcount, newcount, totalCount)
        }
    },
    handlerCount(cars, index, oldcount, newcount, totalCount) {
        if (oldcount <= newcount && (+totalCount) < newcount) {
            cars[index].count = oldcount
            this.setData({
                cars
            })
            const regitstryClone = app.deepClone(this.data.regitstry)
            regitstryClone.shoppingCarts = app.deepClone(this.data.cars)
            wx.setStorageSync('regitstry', regitstryClone)
            if (this.data.selectCarsIndex.includes(parseInt(index))) this.total()
        }
    },
    changeActiveCoupon(cart) {
        if (cart.type === "default" || cart.type === "member") {
            const activeCouponClone = app.deepClone(this.data.activeCoupon)
            activeCouponClone[cart.commodity.commodityUUID] = undefined
            this.setData({
                activeCoupon: activeCouponClone
            })
        }
    }
})