<template>
  <view class="contain">
     <view class="go">
<!--             <button  v-on:click="goHome">{{content}}</button>-->
       <van-button type="info" v-on:click="goHome">{{content}}</van-button>
     </view>
<view>

  <img class="bg" :src="img" alt=""/>
</view>
  </view>
</template>
  <script>
    export default {
      data () {
        return {
          img: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
         totalTime:3,
          content:"跳过",
          canClick:true,
          count:""

        }
      },
      methods: {
    //     onReady(){
    //       let timejump = 3;
    //       this.count = timejump ;
    //       this.timer = setInterval(() => {
    //         if (this.count > 0 && this.count <= timejump) {
    //           this.count--;
    //         } else {
    //           clearInterval(this.timer);
    //           this.timer = null;
    //           this.go()
    //         }
    //       },1000)
    //     },
    //     go(){
    //       clearInterval(this.timer);
    //       this.timer= null;
    //        wx.reLaunch({
    //   url: '/pages/index/main'
    // });
    //     },
// countDown(){
//  if (!this.canClick) return   //改动的是这两行代码
//   this.canClick = false
//   this.content = this.totalTime + 's后跳转'
//   let clock = window.setInterval(() => {
//     this.totalTime--
//     this.content = this.totalTime + 's后跳转'
//     if (this.totalTime < 0) {
//        wx.reLaunch({
//       url: '/pages/index/main'
//     })
//     }
//   },1000)
// },


        goHome(){
        let timejump = 3;
        this.count = timejump ;
        if(!this.timer){
            this.count = timejump ;
            this.show = false;
            this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= timejump ){
                this.count--;
                this.content = this.count + 's后跳转'
            }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                wx.reLaunch({
      url: '/pages/index/main'
    })
            }
          },3000)
        }
    },

          }
    }
  </script>
<style scoped>
.contain {
      width: 100%;
      height: 100%;
      position: relative;
}
.bg {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: -1;
}
.go {
      position: absolute;
      right: 30px;
      top: 150px;
      z-index: 9;
}
.go button {
      font-size: 28px;
      letter-spacing: 4px;
      border-radius: 30px;
      color: #000;
      background: rgba(255, 255, 255, 0.781);
       display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 160px;
      height: 60px;
}
</style>
