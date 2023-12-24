/**
 * @file storage.js
 * @class
 * */
class Gernerater {
    // 个人注册信息
    #regitstry = {
        // 头像资源
        avatarImage: "https://img1.baidu.com/it/u=587532848,2636592701&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        // 姓名
        username: "",
        // 性别
        sex: "",
        // 生日日期
        birthdayTime: "",
        // 密码
        password: "123456",
        // 电话号码
        phone: "",
        // 用户的唯一标识
        UUID: "",
        // 默认收货地址下标 ,string类型
        adderssIndex: "",
        // 添加的收货地址信息列表
        address: [],
        // 优惠券列表信息 ，储存的是commodity对象商品数据
        //优惠券列表信息 ，储存的是coupon对象商品数据
        coupon: [],
        // 积分数据 integer类型
        integral: 0,
        // 消费记录数据 存储的是consumptionRecords对象的数据
        consumptionRecords: [],
        // 购物车数据 ，存储shoppingCartsTemplate类型对象
        shoppingCarts: [],
        //订单数据列表 ，存储orders类型对象
        ordersStorage: [],
    }
    // 商品的模块格式
    #commodityTemplate = {
        // 商品名字
        title: "",
        // 商品的图片资源列表
        commodityImages: [],
        // 商品的规格说明，存储commdityExplain的类型对象
        commodityExplain: {},
        // 商品评论列表的标签
        commentsLables: [],
        // 商品的评论列表
        comments: [
            // 存储comments的类型对象
        ],
        // 商品的选择规格列表
        selectSpecification: [],
        // 其他（赠送）的礼物列表
        otherSelectSpecification: [],
        // 优惠券列表  类型coupon
        coupon: [],
        // 该商品的积分数值类型integer
        integral: "",
        // 商品原价格
        price: "",
        // 积分兑换的数值
        exchange: "",
        // 优惠价
        preferentialPrice: "",
        // 该商品的库存
        commodityCount: "",
        // 标识商品的唯一ID
        commodityUUID: "",
        // 商品的种类，如蛋糕、慕斯
        type: "",
        // 商品的地理位置 ，类型字符串
        address: "",
        // 商品的招牌宣言
        description: "",
    }
    // 商品的信息描述模板
    #commodityExplain = {
        // 心情发言
        remark: "",
        // 口味
        taste: "",
        // 甜度
        sweetness: "",
        // 适合人群
        suitablePeople: "",
        // 保鲜时间
        keepFreshTime: "",
        // 原材料
        originalMaterial: ""
    }
    // 优惠卷数据模板
    #coupon = {
        // 优惠金额
        preferentialPrice: "",
        // 领取的优惠金额的用户，防止重复领取优惠卷
        commodityUUID: "",
        // 标识以已使用的用户
        couponRegitstryUUIDActive: [],
        // 标识以已领取的用户
        couponRegitstryUUIDReceive: [],
        // 在好多范围内才能使用该优惠卷
        rangePrice: "",
        // 有效期 如 2023.11.01-12.01
        validityPeriod: ""
    }
    constructor() {
        this.#regitstry.UUID = Math.random().toFixed(11).split(".")[1].toString()
        this.#regitstry.phone = ""
        this.#regitstry.username = "WinXin"
        this.#regitstry.sex = "男"

    }
    /**
     * 
     * @param {String} username 设置用户名
     */
    setUsername(username) {
        this.#regitstry.username = username
    }
    /**
     * 
     * @param {String} avatarImage 设置头像链接URL 
     */
    setAvatarImage(avatarImage) {
        this.#regitstry.avatarImage = avatarImage
    }
    /**
     * 
     * @param {String} birthdayTime 设置生日日期
     */
    setBirthdayTime(birthdayTime) {
        this.#regitstry.birthdayTime = birthdayTime
    }
    /**
     * @returns regitstry
     */
    newInstanceRegitstry() {
        return this.#regitstry
    }
    /**
     * 
     * @param {{title:String,commodityImages:Array<String>,commodityExplain:Object,commentsLables?:Array<String>,selectSpecification:Array<String>,otherSelectSpecification?:Array<String>,coupon?:Array<String>,integral:Number,price:Number,exchange:Number,preferentialPrice:Number,commodityCount:Number,type:String,address:String,description?:String}} commodityTemplate 
     * @property {String} title 商品的名称
     * @property {Array<String>} commodityImages 商品的图片列表
     * @property {Object} commodityExplain 商品的规格说明, 必须通过this.newInstanceCommodityExplain({...})设置改参数
     * @property {Array<String>} commentsLables 商品评论列表的标签
     * @property {Array<String>} selectSpecification 商品的选择规格列表
     * @property {Array<String>} otherSelectSpecification 其他（赠送）的礼物列表
     * @property {Array<String>} coupon 优惠券列表，必须通过this.newInstanceCoupon({...})设置改参数
     * @property {Number} integral 该商品的积分数值类型integer
     * @property {Number} price 商品原价格
     * @property {Number} exchange 积分兑换的数值
     * @property {Number} preferentialPrice  优惠价
     * @property {Number} commodityCount  该商品的库存
     * @property {String} type 商品的种类，如蛋糕、慕斯
     * @property {Number} address 商品的地理位置 ，类型字符串
     * @property {Number} description 商品的招牌宣言
     * @returns {Object} commodityTemplate
     */
    newInstanceCommodityTemplate(commodityTemplate) {
        const UUID =  Math.random().toFixed(11).split(".")[1].toString()
        this.#commodityTemplate = Object.assign(this.#commodityTemplate,commodityTemplate)
        this.#commodityTemplate.commodityUUID = UUID
        this.#commodityTemplate.coupon.forEach(ele => {
            ele.commodityUUID = UUID
        })
        return this.#commodityTemplate
    }
    /**
     * 
     * @param {{remark:String,taste:String,sweetness:String,suitablePeople:String,keepFreshTime:String,originalMaterial:String}} commodityExplain 
     * @property {String} remark 心情发言
     * @property {String} taste 口味
     * @property {String} sweetness 甜度
     * @property {String} suitablePeople 适合人群
     * @property {String} keepFreshTime 保鲜时间
     * @property {String} originalMaterial  原材料
     * @returns commodityExplain
     */
    newInstanceCommodityExplain(commodityExplain) {
        this.#commodityExplain = Object.assign(this.#commodityExplain,commodityExplain)
        return this.#commodityExplain
    }
    /**
     * 
     * @param {{preferentialPrice:String,rangePrice:String,validityPeriod:String}} coupon 
     * @property {String} preferentialPrice 优惠金额
     * @property {String} rangePrice 在好多范围内才能使用该优惠卷
     * @property {String} validityPeriod 有效期 如 2023.11.01-12.01
     * @returns {Object} coupon 
     */
    newInstanceCoupon(coupon) {
        this.#coupon = Object.assign(this.#coupon,coupon)
        return this.#coupon
    }
}
module.exports = {
    Gernerater
}