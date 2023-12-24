module.exports = {
    // 微信小程序的总注册用户，类型regitstry的数据
    miniprogramRegitStry: [],
    // 个人的注册信息
    regitstry: {
        // 头像资源
        avatarImage: "",
        // 姓名
        username: "",
        // 性别
        sex: "",
        // 生日日期
        birthdayTime: "",
        // 密码
        password: "",
        // 电话号码
        phone: "",
        // 用户的唯一标识
        UUID: "",
        // 默认收货地址下标
        adderssIndex:"",
        // 添加的收货地址信息列表
        address: [],
        // 优惠券列表信息 ，储存的是commodity对象商品数据
        //优惠券列表信息 ，储存的是coupon对象商品数据
        coupon: [],
        // 积分数据 integer类型
        integral: "",
        // 消费记录数据 存储的是consumptionRecords对象的数据
        consumptionRecords: [],
        // 购物车数据 ，存储shoppingCartsTemplate类型对象
        shoppingCarts: [],
        //订单数据列表 ，存储orders类型对象
        ordersStorage: [],
    },
    // 消费记录数据 （深拷贝）
    consumptionRecords: {
        // 消费时间  如 2023-06-08
        consumptionTime: "",
        // 获得积分
        obtainIntegral: "",
        // 消费金额
        spendAmount: ""
    },
    // 地址模板 （深拷贝）
    address: {
        // 收货人的名字
        username: "",
        // 收货人的号码
        phone: "",
        // 收货人的地址
        addressText: "",
        // 收货人的门牌号
        houseNumber: ""
    },
    // 商品数据，存储commodityTemplate
    commodity: [],
    // 商品的种类列表
    commodityType: [],
    //商品数据模板（深拷贝）
    commodityTemplate: {
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
    },
    // 优惠卷数据模板，（深拷贝）
    coupon: {
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
    },
    // 标识以已使用的用户模板 （深拷贝）
    // couponRegitstryUUIDActive: {
        // 领取的优惠金额的用户
        // regitstryUUID: "",
        // 标识是否已使用 未使用 0 ，已使用 1
        // active: ""
    // },
    // 商品的信息描述模板 （深拷贝）
    commodityExplain: {
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
    },
    // 评论模板数据 （深拷贝）
    comments: {
        // 评论的用户 ,类型 regitstry对象
        regitsory: "",
        // 评论内容
        commentsContent: "",
        // 评论的图片资源列表
        commentsImages: [],
        // 评论的日期 如 2022/01/22
        commentsTime: "",
        // 商家评论内容,存储comments的类型对象
        businessContent: {}
    },
    // 购物车数据格式模板 （深拷贝）
    shoppingCartsTemplate: {
        // 添加的commodityTemplate类型对象
        commodity: {},
        // 商品的选择规格
        selectSpecificationActive: "",
        // 其他（赠送）的礼物
        otherSelectSpecificationActive: "",
        // 购买的商品个数
        count: "",
        // default:首页，member:会员，integral：积分
        type:""
    },
    // 订单数据模板数据格式 （深拷贝）
    orders: {
        // 收货地址下标
        adderssIndex:"",
        // 订单的类型 如 是否未付款、未评论、催单。。未付款：0，未评论：1，催单：2，完成：3
        type: "",
        // 订单号
        ordersUUID: "",
        //付款的商品数据 存储类型是shoppingCartsTemplate
        shoppingCarts: [],
        // 配送时间段  如2023/8/32
        distributionYMD: "",
        // 配送时间段  如14:00-23:00
        distributionTime: "",
        // 留言
        message: "",
        // 总共付的金额
        cost: "",
    }

}