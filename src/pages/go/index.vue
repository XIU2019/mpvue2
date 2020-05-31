<template>
  <view class="contain">
    <view class="go">
      <van-button type="danger" color="#FF374D" size="small" v-on:click="goHome1">{{content }}</van-button>
    </view>
    <view>
      <img class="bg" v-bind:src="img" alt=""/>
    </view>
  </view>
</template>
<script>
  export default {
    onLoad () {
       this. countTime () ;
      // setTimeout(function () {
      //   wx.reLaunch({
      //     url: '/pages/index/main'
      //   })
      // }, 5000);
    },
    data () {
      return {
        img: '/static/images/go.jpg',
        totalTime: 3,
        content: '跳过',
        canClick: true,
        count: ''

      }
    },
    methods: {
      goHome1 () {
        wx.reLaunch({
          url: '/pages/my/main'
        })
      },
      countTime () {
        let timejump = 5
        this.count = timejump
         this.content = this.count + 's后跳转'
        if (!this.timer) {
          this.count = timejump
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= timejump) {
              this.count--
              this.content = this.count + 's后跳转'
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
              //跳转的页面写在此处
              let  isLogin=true
              wx.reLaunch({
                url: `/pages/my/main?isLogin=${isLogin}`
              })
            }
          }, 1000)
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
    top: 10px;
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
