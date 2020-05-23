<template>
  <div class="body">
    <div class="top"></div>
    <div class="main">
      <div class="main_img">
        <van-image
          width="100"
          height="100"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
    </div>
    <div class="foot">
      <div class="butoom">
        <!-- 需要使用 button 来授权登录 -->
        <van-button block type="danger" @getuserinfo="getUserInfo"
                    open-type="getUserInfo">微信授权登录
        </van-button>
        <a @click="admitLogin">
          管理员登录入口
        </a>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    computed: {},
    onLoad: function () {
      this.initOpenid()
      var that = this
      Object.assign(this.$data, this.$options.data())//用于重新定义data的数据
      wx.getSetting({
        // 查看是否授权
        success (res) {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            that.logged = true
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
              }
            })

          }

        }
      })
    },
    onShow: function () {
      this.initOpenid()
    },
    onReady () {
      this.initOpenid()
    },
    data () {
      return {
        // canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isLogin: true,   //用于视图的判断    如果true则显示登陆注册按钮，false则显示用户信息
        logged: false,  //用于是否将用户信息添加到云数据库中，如果是false则是第一次登录，添加信息到云数据库，如果是true，则不添加到数据
        openId: ''//缓存用户的openId
      }
    },
    methods: {

      getUserInfo: function (event) {
        var that = this
        const db = wx.cloud.database()
        const _ = db.command
        console.log(event.mp.detail.userInfo)
        wx.showToast({
          title: '登录中',
        })
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: function (res) {
            console.log(res.result)
            //缓存用户的openID
            that.openId = res.result.openid
            // wx.setStorageSync('openId', res.result.openid)
            console.log(that.openId)
            wx.setStorage({
              key: 'openId',
              data: that.openId,
              success (res) {
                console.log(res)
              }
            })
            if (!that.logged) {
              db.collection('user').add({
                data:
                  {
                    userInfo: event.mp.detail.userInfo,
                    nickName: event.mp.detail.userInfo.nickName,
                    avatarUrl: event.mp.detail.userInfo.avatarUrl,
                    gender: event.mp.detail.userInfo.gender,//性别 0：未知、1：男、2：女
                    province: event.mp.detail.userInfo.province,
                    city: event.mp.detail.userInfo.city,
                    country: event.mp.detail.userInfo.country,
                  }
              })
            }
            wx.showToast({
              title: '登录成功',
            })
            that.isLogin = false
            let isLogin = that.isLogin
            wx.switchTab({
              url: '/pages/my/main?isLogin=false'
            })
          }
        })
        that.isLogin = false
      },
//      缓存openid
      initOpenid () {
        let value = wx.getStorageSync('openId')
        if (value) {
          this.openId = value
          console.log(value)
        } else {
          this.openId = ''
        }
      },
      //管理员登录
      admitLogin () {
         wx.redirectTo({
          url: '/pages/admitLogin/main'
        })
      },
    },
  }
</script>

<style>
  .body {
    margin: 0;
    padding: 0;
    background: #ffffff;
  }

  .top {
    height: 120px;
    background: #ffffff;
  }

  .main {
    width: 300px;
    height: 200px;
    background: #ffffff;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .main_img {
    margin: auto;
  }

  .butoom {
    margin: auto;
  }

  .foot {
    width: 300px;
    height: 100px;
    background: #ffffff;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
