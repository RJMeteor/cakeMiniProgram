import {
    // 微信小程序的总注册用户，类型regitstry的数据
    miniprogramRegitStry,
    // 个人的注册信息
    // regitstry,
    // 消费记录数据 （深拷贝）
    consumptionRecords,
    // 地址模板 （深拷贝）
    address,
    // 商品数据，存储commodityTemplate
    commodity,
    // 商品的种类列表
    commodityType,
    //商品数据模板（深拷贝）
    commodityTemplate,
    // 优惠卷数据模板，（深拷贝）
    coupon,
    // 标识以已使用的用户模板 （深拷贝）
    // couponRegitstryUUIDActive,
    // 商品的信息描述模板 （深拷贝）
    commodityExplain,
    // 评论模板数据 （深拷贝）
    comments,
    // 购物车数据 
    shoppingCarts,
    // 购物车数据格式模板 （深拷贝）
    shoppingCartsTemplate,
    //订单数据列表 
    ordersStorage,
    // 订单数据模板数据格式 （深拷贝）
    orders
} from "./storage/storage"
import {
    Gernerater
} from "./utils/generater.js"

function deepClone(target) {
    return JSON.parse(JSON.stringify(target))
}
const gernerater = new Gernerater()
const regitstry = gernerater.newInstanceRegitstry()
const commodityTemplateInsance_one = gernerater.newInstanceCommodityTemplate({
    title: "Deep Bailey's ",
    commodityImages: [
        "https://oss.51cocoa.com/upload/images/375557ec91beb3abbf385fb2f9728e59.png",
        "https://oss.51cocoa.com/upload/images/dd93374ec1a34bbd38dc3219b16154a6.jpg",
        "https://oss.51cocoa.com/upload/images/660e4c03a00112e84ba181a0ddd9b76d.jpg",
        "https://oss.51cocoa.com/upload/images/3f85768534d83cb6566073091f53bf37.jpg"
    ],
    commodityExplain: gernerater.newInstanceCommodityExplain({
        remark: "夹心中增加可咀嚼的玫瑰蜜饯，丰富口感",
        taste: "应季水果夹心",
        sweetness: "5", //最高6
        suitablePeople: "所有人",
        keepFreshTime: "保鲜条件：10℃以下保存",
        originalMaterial: "玫瑰甘露、玫瑰蜜饯百利甜酒 百利甜酒酒 酒"
    }),
    commentsLables: ["好吃", "服务质量好"],
    selectSpecification: [
        "适合3-4人", "适合5-6人", "适合7-8人", "适合9-10人",
        "适合11-12人", "适合13-14人", "适合15-16人", "适合17-18人"
    ],
    otherSelectSpecification: ["一次性刀、叉、盘"],
    coupon: [
        gernerater.newInstanceCoupon({
            preferentialPrice: 10,
            rangePrice: "100-200",
            validityPeriod: "2023.02.01~2023.12.01",
        })
    ],
    integral: 50,
    price: 188,
    exchange: 100,
    preferentialPrice: 88,
    commodityCount: 2,
    type: "蛋糕",
    address: "广州",
    description: "酸酸甜甜， 难道不是我们想要回忆 的初恋味道吗？"

})
const gernerater1 = new Gernerater()
const commodityTemplateInsance_two = gernerater1.newInstanceCommodityTemplate({
    title: "鲜果之恋",
    commodityImages: [
        "https://i.huasongwang.com/i/g/2016/09/15/05272508538156407_1280.jpg",
        "https://i.huasongwang.com/i/g/2022/10/07/07184725480412463_1280.jpg",
    ],
    commodityExplain: gernerater1.newInstanceCommodityExplain({
        remark: "夹心中增加可咀嚼的玫瑰蜜饯，丰富口感",
        taste: "应季水果夹心",
        sweetness: "5", //最高6
        suitablePeople: "所有人",
        keepFreshTime: "保鲜条件：10℃以下保存",
        originalMaterial: "玫瑰甘露、玫瑰蜜饯百利甜酒 百利甜酒酒 酒"
    }),
    commentsLables: ["好吃", "服务质量好"],
    selectSpecification: [
        "适合3-4人", "适合5-6人", "适合7-8人", "适合9-10人",
        "适合11-12人", "适合13-14人", "适合15-16人", "适合17-18人"
    ],
    otherSelectSpecification: ["含5套餐具"],
    coupon: [
        gernerater1.newInstanceCoupon({
            preferentialPrice: 50,
            rangePrice: "50-200",
            validityPeriod: "2023.02.01~2023.12.01",
        })
    ],
    integral: 50,
    price: 275,
    exchange: 120,
    preferentialPrice: 169,
    commodityCount: 10,
    type: "蛋糕",
    address: "上海",
    description: "酸酸甜甜， 难道不是我们想要回忆 的初恋味道吗？"

})
const gernerater2 = new Gernerater()
const commodityTemplateInsance_there = gernerater2.newInstanceCommodityTemplate({
    title: "一路有你",
    commodityImages: [
        "https://i.huasongwang.com/i/g/2022/10/21/07196843255845631_1280.jpg",
        "https://i.huasongwang.com/i/g/2019/01/25/06017295948524249_1280.jpg",
        "https://i.huasongwang.com/i/g/2019/01/25/06017297367576415_1280.jpg"
    ],
    commodityExplain: gernerater2.newInstanceCommodityExplain({
        remark: "夹心中增加可咀嚼的玫瑰蜜饯，丰富口感",
        taste: "应季水果夹心",
        sweetness: "5", //最高6
        suitablePeople: "所有人",
        keepFreshTime: "保鲜条件：10℃以下保存",
        originalMaterial: "圆形鲜奶油蛋糕，夹心水果，表面时令水果和奶油手绘"
    }),
    commentsLables: ["好吃", "服务质量好"],
    selectSpecification: [
        "适合3-4人", "适合5-6人", "适合7-8人", "适合9-10人",
        "适合11-12人", "适合13-14人", "适合15-16人", "适合17-18人"
    ],
    otherSelectSpecification: ["一次性刀、叉、盘"],
    coupon: [
        gernerater2.newInstanceCoupon({
            preferentialPrice: 50,
            rangePrice: "50-200",
            validityPeriod: "2023.02.01~2023.12.01",
        })
    ],
    integral: 50,
    price: 359,
    exchange: 160,
    preferentialPrice: 198,
    commodityCount: 12,
    type: "蛋糕",
    address: "北京",
    description: "酸酸甜甜， 难道不是我们想要回忆 的初恋味道吗？"

})
const gernerater3 = new Gernerater()
const commodityTemplateInsance_four = gernerater3.newInstanceCommodityTemplate({
    title: "潘祥记鲜花饼",
    commodityImages: [
        "https://gw.alicdn.com/imgextra/i3/2211680769599/O1CN01T7IE3F2KmOeppWqfq_!!2211680769599.jpg",
        "https://gw.alicdn.com/imgextra/i4/2211680769599/O1CN01F2qx4e2KmOetOxqWM_!!2211680769599.jpg",
        "https://gw.alicdn.com/imgextra/i1/2211680769599/O1CN014KlUcz2KmOeppRc3E_!!2211680769599.jpg"
    ],
    commodityExplain: gernerater3.newInstanceCommodityExplain({
        remark: "夹心中增加可咀嚼的玫瑰蜜饯，丰富口感",
        taste: "应季水果夹心",
        sweetness: "5", //最高6
        suitablePeople: "所有人",
        keepFreshTime: "保鲜条件：10℃以下保存",
        originalMaterial: "圆形鲜奶油蛋糕，夹心水果，表面时令水果和奶油手绘"
    }),
    commentsLables: ["好吃", "服务质量好"],
    selectSpecification: [
        "适合3-4人", "适合5-6人", "适合7-8人", "适合9-10人",
        "适合11-12人", "适合13-14人", "适合15-16人", "适合17-18人"
    ],
    otherSelectSpecification: ["一次性刀、叉、盘"],
    coupon: [
        gernerater3.newInstanceCoupon({
            preferentialPrice: 50,
            rangePrice: "50-200",
            validityPeriod: "2023.02.01~2023.12.01",
        })
    ],
    integral: 10,
    price: 33,
    exchange: 60,
    preferentialPrice: 23,
    commodityCount: 2,
    type: "月饼",
    address: "云南",
    description: "酸酸甜甜， 难道不是我们想要回忆 的初恋味道吗？"

})
const commodityTypeSimple = []
miniprogramRegitStry.unshift(deepClone(regitstry))
commodityTypeSimple.push(commodityTemplateInsance_one.type)
commodityTypeSimple.push(commodityTemplateInsance_two.type)
commodityTypeSimple.push(commodityTemplateInsance_there.type)
commodityTypeSimple.push(commodityTemplateInsance_four.type)
commodity.unshift(commodityTemplateInsance_one)
commodity.unshift(commodityTemplateInsance_two)
commodity.unshift(commodityTemplateInsance_there)
commodity.unshift(commodityTemplateInsance_four)
Array.from(new Set(commodityTypeSimple)).forEach(ele=>{
    commodityType.push(ele)
})
App({
    onLaunch() {
        wx.setStorageSync("miniprogramRegitStry", miniprogramRegitStry)
        wx.setStorageSync("regitstry", regitstry)
        wx.setStorageSync("consumptionRecords", consumptionRecords)
        wx.setStorageSync("address", address)
        wx.setStorageSync("commodity", commodity)
        wx.setStorageSync("commodityType", commodityType)
        wx.setStorageSync("commodityTemplate", commodityTemplate)
        wx.setStorageSync("coupon", coupon)
        // wx.setStorageSync("couponRegitstryUUIDActive",couponRegitstryUUIDActive)
        wx.setStorageSync("commodityExplain", commodityExplain)
        wx.setStorageSync("comments", comments)
        wx.setStorageSync("shoppingCarts", shoppingCarts)
        wx.setStorageSync("shoppingCartsTemplate", shoppingCartsTemplate)
        wx.setStorageSync("ordersStorage", ordersStorage)
        wx.setStorageSync("orders", orders)
    },
    deepClone,
})