<template>
  <div class="body">
    <div class="top"></div>
    <view class="main">
      <view class="main_img">
        管理员登录
      </view>
      <view class="box1">
        <van-cell-group>
          <van-field
            v-bind:value="admit"
            label="账号"
            placeholder="请输入管理员账号"
            @change="onChangeAdmit($event)"
          />
          <van-field
            v-bind:value="password"
             type="password"
            label="密码"
            placeholder="请输入密码"
            @change="onChangePassword($event)"
          />
        </van-cell-group>
        <van-dialog id="van-dialog"/>
      </view>
      <view class="box2">
        <!--       <van-button plain type="primary" color="#FF2426">登录</van-button>-->
        <text class="box3" @click="admitLogin">登录</text>
      </view>
    </view>

  </div>


  </div>
</template>

<script>

  import Dialog from '../../../dist/wx/static/vant/dialog/dialog'

  export default {
    computed: {},
    onLoad: function () {

    },
    onShow: function () {

    },
    onReady () {

    },
    data () {
      return {
        admit: '',
        password: '',
      }
    },
    methods: {
      //获取管理员账号
      onChangeAdmit (event) {
        // console.log(event.mp.detail)
        this.admit = event.mp.detail
      },
      //获取输入的密码
      onChangePassword (event) {
        // console.log(event.mp.detail)
        this.password = event.mp.detail
      },
      //管理员登录
      admitLogin () {
        if (this.admit === 'XIU2020' && this.password === '123456') {
          //登录成功
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          //  跳转到管理员首页
          wx.redirectTo({
            url: '/pages/admit/admitIndex/main'
          })
        } else {
          Dialog.alert({
            title: '登录失败',
            message: '账号或者密码错误',
          }).then(() => {
            // on close
          })
        }
      },
    },
  }
</script>

<style>
  .body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #eeeeee;
  }

  .top {
    height: 150px;
    width: 100%;
    background: #eeeeee;
  }

  .main {
    width: 300px;
    height: 250px;
    background: #ffffff;
    margin: 10px auto;
    border: 2px solid #ffffff;
    box-sizing: border-box;
    /*border: 2px solid darkslategray;*/
    box-shadow: darkgrey 10px 10px 30px 5px;
    /*/ / 边框阴影*/
  }

  .main_img {
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .box1 {
    width: 100%;
    height: 100px;
    margin: 25px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .box2 {
    width: 100px;
    height: 40px;
    margin: 0px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #ff5a58;
  }

  .box3 {
    color: #ffffff !important;
    font-size: 18px !important;
  }
</style>
