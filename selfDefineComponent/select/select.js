
Component({
    properties: {
        propArray:{
            type:Array,
        },
        propSelect:{
            type:String
        },
        propIndex:{
            type:Number
        }
    },
    data: {
        selectShow:false,//初始option不显示
        nowText:"请选择",//初始内容
        animationData:{}
    },
    lifetimes:{
        ready(){
            this.setData({
                nowText:this.properties.propSelect,
            })
        }
    },
    methods: {
        selectToggle:function(){
            var nowShow=this.data.selectShow;
            var animation = wx.createAnimation({
                timingFunction:"ease"
            })
            this.animation=animation;
            if(nowShow){
                animation.rotate(0).step();
                this.setData({
                    animationData: animation.export()
                })
            }else{
                animation.rotate(180).step();                
                this.setData({
                    animationData: animation.export()
                })
            }
            this.setData({
                selectShow: !nowShow
            })
        },
        //设置内容
        setText:function(e){
            var nowData = this.properties.propArray;
            var nowIdx = e.target.dataset.index;
            var nowText = nowData[nowIdx];
            this.animation.rotate(0).step();
            this.triggerEvent("changespecificationActive",{value:nowText,index:this.properties.propIndex})
            this.setData({
                selectShow: false,
                nowText:nowText,
                animationData: this.animation.export()
            })
        }
    }
})
