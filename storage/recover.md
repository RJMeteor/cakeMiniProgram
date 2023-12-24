# 页面说明：

~~~
[
		//首页
        "pages/home/home",
        //会员专区
        "pages/member/member",
        //订单
        "pages/orders/orders", 
        //我的
        "pages/self/self",
        //绑定手机号码
        "pages/bindPhone/bindPhone",
        //解绑手机号码
        "pages/relieveBindPhone/relieveBindPhone",
        //绑定新的号码
        "pages/anewBindPhone/anewBindPhone",
        //改用户名
        "pages/rename/rename",
        //更改密码
        "pages/updatePassword/updatePassword",
        //个人信息详情页
        "pages/detailedInformation/detailedInformation",
        //我的购物车
        "pages/selfCars/selfCars",
        //常见问题
        "pages/commonIssue/commonIssue",
        //积分商城
        "pages/integralCentre/integralCentre",
        //常见问题详情页
        "pages/commonIssueAnswer/commonIssueAnswer",
        //展示收货地址
        "pages/insertAddress/insertAddress",
        //更改、添加收货地址
        "pages/updateAddress/updateAddress",
        //积分
        "pages/integral/integral",
        //我的会员
        "pages/selfMember/selfMember",
        //优惠券
        "pages/coupons/coupons",
        //产品详情页
        "pages/productDetails/productDetails",
        //产品评论页
        "pages/commodityComments/commodityComments",
        //产品优惠卷页
        "pages/commondityCoupons/commondityCoupons",
        //购买，添加购物车选择页
        "pages/productsSelecter/productsSelecter",
        //进行评论，产品评论页
        "pages/comments/comments",
        //提交未付款订单
        "pages/submitOrders/submitOrders",
        //催单
        "pages/reminder/reminder",
        "pages/finishOrders/finishOrders"
    ]
~~~



# 原来app.js生成数据内容的代码

~~~
regitstry.avatarImage = "https://img1.baidu.com/it/u=587532848,2636592701&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
regitstry.username = "renjia"
regitstry.sex = "男"
regitstry.birthdayTime = "2001/08/22"
regitstry.password = "123456"
regitstry.UUID = "13088196807"
regitstry.integral = 0
miniprogramRegitStry.unshift(deepClone(regitstry))

const commodityTemplateClone = deepClone(commodityTemplate)
const commodityExplainClone = deepClone(commodityExplain)
const commentsClone = deepClone(comments)
const couponClone = deepClone(coupon)


commodityTemplateClone.commodityImages = [
    "https://oss.51cocoa.com/upload/images/375557ec91beb3abbf385fb2f9728e59.png",
    "https://oss.51cocoa.com/upload/images/dd93374ec1a34bbd38dc3219b16154a6.jpg",
    "https://oss.51cocoa.com/upload/images/660e4c03a00112e84ba181a0ddd9b76d.jpg",
    "https://oss.51cocoa.com/upload/images/3f85768534d83cb6566073091f53bf37.jpg"
]
commodityExplainClone.remark = "夹心中增加可咀嚼的玫瑰蜜饯，丰富口感"
commodityExplainClone.taste = "应季水果夹心"
commodityExplainClone.sweetness = "5" //最高6
commodityExplainClone.suitablePeople = "所有人"
commodityExplainClone.keepFreshTime = "保鲜条件：10℃以下保存"
commodityExplainClone.originalMaterial = "玫瑰甘露、玫瑰蜜饯百利甜酒 百利甜酒酒 酒"
commodityTemplateClone.commodityExplain = commodityExplainClone

commentsClone.regitsory = deepClone(regitstry)
commentsClone.commentsContent = "这个真的好好吃的"
commentsClone.commentsImages = [
    "https://oss.51cocoa.com/upload/images/375557ec91beb3abbf385fb2f9728e59.png",
    "https://oss.51cocoa.com/upload/images/dd93374ec1a34bbd38dc3219b16154a6.jpg",
    "https://oss.51cocoa.com/upload/images/660e4c03a00112e84ba181a0ddd9b76d.jpg",
    "https://oss.51cocoa.com/upload/images/3f85768534d83cb6566073091f53bf37.jpg"
]
commentsClone.commentsTime = "2022/11/23"
commentsClone.businessContent = deepClone(commentsClone)
commodityTemplateClone.comments.unshift(commentsClone)

couponClone.preferentialPrice = 10
couponClone.commodityUUID = "22010230404"
couponClone.rangePrice = "100-200"
couponClone.validityPeriod = "2017.11.01~2017.12.01"
commodityTemplateClone.coupon.unshift(couponClone)

commodityTemplateClone.commentsLables = ["好吃", "服务质量好"]
commodityTemplateClone.selectSpecification = [
    "适合3-4人", "适合5-6人", "适合7-8人", "适合9-10人",
    "适合11-12人", "适合13-14人", "适合15-16人", "适合17-18人"
]
commodityTemplateClone.otherSelectSpecification = ["含5套餐具"]

commodityTemplateClone.title = "Deep Bailey's "
commodityTemplateClone.integral = 50
commodityTemplateClone.price = 188
commodityTemplateClone.exchange = 100
commodityTemplateClone.preferentialPrice = 88
commodityTemplateClone.commodityCount = 2
commodityTemplateClone.commodityUUID = "22010230404"
commodityTemplateClone.type = "蛋糕"
commodityTemplateClone.address = "广州"
commodityTemplateClone.description = "酸酸甜甜， 难道不是我们想要回忆 的初恋味道吗？"

commodityType.unshift("蛋糕")
commodity.unshift(commodityTemplateClone)

const shoppingCartsTemplateClone = deepClone(shoppingCartsTemplate)
shoppingCartsTemplateClone.commodity= deepClone(commodityTemplateClone)
shoppingCartsTemplateClone.selectSpecificationActive = "适合7-8人"
shoppingCartsTemplateClone.otherSelectSpecificationActive = "含5套餐具"
shoppingCartsTemplateClone.count = 1
shoppingCartsTemplateClone.type = "default"
const shoppingCartsTemplateClone1 = deepClone(shoppingCartsTemplateClone)
shoppingCartsTemplateClone1.type = "member"
const shoppingCartsTemplateClone2 = deepClone(shoppingCartsTemplateClone)
shoppingCartsTemplateClone2.type = "integral"
regitstry.shoppingCarts.unshift(shoppingCartsTemplateClone)
regitstry.shoppingCarts.unshift(shoppingCartsTemplateClone1)
regitstry.shoppingCarts.unshift(shoppingCartsTemplateClone2)


const ordersClone = deepClone(orders)
ordersClone.type = 0
ordersClone.ordersUUID="21141214214"
ordersClone.shoppingCarts.unshift(shoppingCartsTemplateClone)
ordersClone.distributionYMD = "2023/8/32"
ordersClone.distributionTime = "14:00-23:00"
ordersClone.message = "切成四块"
ordersClone.cost = 255

const ordersClone1 = deepClone(ordersClone)
ordersClone1.type = 1
const ordersClone2 = deepClone(ordersClone)
ordersClone2.type = 2
regitstry.ordersStorage.unshift(ordersClone)
regitstry.ordersStorage.unshift(ordersClone1)
regitstry.ordersStorage.unshift(ordersClone2)
~~~
