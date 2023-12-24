const app = getApp()
Page({
    data: {
        username:""
    },
    onLoad(options) {
        this.setData({
            spaceHardOverflow:wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {
        this.setData({
            username:wx.getStorageSync('regitstry').username
        })
    },
    onChange(){},
    clearInput(){
        this.setData({
            username:""
        })
    },
    doSubmit(){
        if(this.data.username){
            wx.showModal({
              content: "你确定更改昵称",
              complete: (res) => {
                if (res.confirm) {
                  const regitstry = app.deepClone(wx.getStorageSync('regitstry'))
                  regitstry.username = this.data.username
                  wx.setStorageSync('regitstry', regitstry)
                  wx.showToast({
                    title: '更改昵称成功',
                    mask:true,
                    duration:2000,
                    success(){
                        const timer = setTimeout(()=>{
                            wx.navigateBack({
                                delta:1,
                                success(){
                                    clearTimeout(timer)
                                }
                            })
                        },2000)
                    }
                  })
                }
              }
            })
        }else{
            wx.showToast({
              title: '名称不能为空',
              mask:true,
              duration:2000
            })
        }
    }
})