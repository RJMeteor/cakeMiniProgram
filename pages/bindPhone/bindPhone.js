const app = getApp()
Page({

    data: {
        // 防止重复点击发送验证码
        captchaStatus: false,
        // 验证码的值
        captchaValue:"",
        // 验证码的时间
        timer:"",
        time:12,
        phone:"",
        captchaValueInput:""
    },
    onLoad() {
        this.setData({
            spaceHardOverflow: wx.getStorageSync('spaceHardOverflow'),
        })
    },
    onShow() {

    },
    doSubmit() {
        if(this.data.phone&&(this.data.captchaValueInput===this.data.captchaValue)){
            clearInterval(this.data.timer)
            wx.setStorageSync('bindPhoneStatus', true)
            const regitstry =  app.deepClone(wx.getStorageSync('regitstry'))
            regitstry.phone = this.data.phone
            wx.setStorageSync('regitstry', regitstry)
            wx.showToast({
              title: '绑定成功',
              icon:"success",
              mask:true,
              duration:2000,
              success(){
                  const timer = setTimeout(()=>{
                    wx.navigateBack({
                        delta: 1,
                        success(){
                            clearTimeout(timer)
                        }
                    })
                  },2000)
              }
            })
        }else{
            wx.showToast({
                title: '绑定失败',
                icon:"success",
                mask:true
              })
        }
    },
    captcha(e){
        if(this.data.phone){
            if(!this.data.captchaStatus){
                this.setData({
                    captchaStatus:true,
                    captchaValue:Math.random().toFixed(6).toString().split(".")[1]
                })
                wx.showToast({
                    title: this.data.captchaValue,
                    icon:"success",
                    duration:5000
                })
                this.setData({
                    timer: setInterval(()=>{
                        this.setData({
                            time: this.data.time-1
                        })
                        if (this.data.time === 0) {
                            this.setData({
                                captchaStatus: false,
                                time: 12,
                            })
                            clearInterval(this.data.timer)
                        }
                    },1000)
                })
            }
        }else{
            wx.showToast({
              title: '未输入手机号',
              mask:true,
              duration:2000
            })
        }
        
    }
})