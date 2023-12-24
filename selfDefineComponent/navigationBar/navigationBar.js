// selfdefinecomponent/navigationBar/navigationBar.js
Component({

    properties: {
        title:{
            type:String,
            value:"WeXin"
        },
        close:{
            type:Boolean,
            value: true
        }
    },

    data: {
    },

    lifetimes:{
        attached: function() {
            const menu = wx.getMenuButtonBoundingClientRect();
           let systemInfo=wx.getSystemInfoSync()
           const navgationBarHeight = (menu.top - systemInfo.statusBarHeight)*2 + menu.height
           const statusBarHeight = (systemInfo.statusBarHeight ? systemInfo.statusBarHeight : 32)
           this.setData({
            statusBarHeight:statusBarHeight + "px",
            navgationBarHeight: navgationBarHeight  +"px",
            menuButtonWidth:menu.width+systemInfo.screenWidth-menu.right + "px"
           })
           wx.setStorageSync('spaceHardOverflow', (statusBarHeight+navgationBarHeight)+"px")
           wx.setStorageSync('scrennWidth', systemInfo.screenWidth)
          },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        navagationBack(){
            wx.navigateBack({
                delta:1
            })
        }
    }
})
