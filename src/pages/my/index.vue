<template>
  <div class="userContainer">
    <div class="user">
      <div class="userImg">
        <div v-if="isLogin=== text1">

        </div>
        <div v-if="isLogin=== text2">
          <open-data type="userAvatarUrl"></open-data>
        </div>

      </div>
      <div class="userName" v-if="isLogin===text1">
        <div class="user_text" @click="login">登录/注册</div>
      </div>
      <div class="userName" v-if="isLogin===text2">
        <p class="userName">
          <open-data type="userNickName"></open-data>
          <open-data type="userGender" lang="zh_CN"></open-data>
        </p>
      </div>
      <!--      用户名-->
      <!--      <div>-->
      <!--      <ul class="userD">-->
      <!--        <p class="userName">-->
      <!--          <open-data type="userNickName"></open-data>-->
      <!--          <open-data type="userGender" lang="zh_CN"></open-data>-->
      <!--        </p>-->
      <!--      </ul>-->
      <!--        </div>-->
      <!--        完善个人资料-->
      <div class="main">
        <van-cell
          icon="phone-o"
          is-link
          title="修改手机号码"
          link-type="navigateTo"
          url="/pages/orderList/main"
        />
        <!--        订单-->
        <van-cell
          icon="shop-o"
          is-link
          title="我的订单"
          link-type="navigateTo"
          url="/pages/orderList/main"
        />
        <!--        我的地址-->
        <van-cell
          icon="location-o"
          is-link
          title="我的地址"
          link-type="navigateTo"
          url="/pages/address/main"
        />
        <!--        我的评价-->
        <van-cell
          icon="records"
          is-link
          title="我的评价"
          link-type="navigateTo"
          url="/pages/commentList/main"
        />
        <!--        我的钱包-->
        <van-cell
          icon="balance-o"
          is-link
          title="我的钱包"
          link-type="navigateTo"
          url="/pages/orderList/main"
        />
        <!--客服中心-->
        <van-cell
          icon="service-o"
          is-link
          title="客服中心"
          link-type="navigateTo"
          url="/pages/orderList/main"
        />
        <!--        退出登录-->
        <div class="userLogIn">
          <a @click="LoginOut">退出登陆</a>
          <!--          <navigator open-type="exit" target="miniProgram" class="userLogIn">-->
          <!--           退出登陆</navigator>-->
          <van-dialog id="van-dialog" confirm-button-color="#FF2620"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Dialog from '../../../static/vant/dialog/dialog'

  export default {
    computed: {},
    onLoad: function (e) {
      console.log(e.isLogin)
      Object.assign(this.$data, this.$options.data())//用于重新定义data的数据
      this.isLogin = e.isLogin
    },
    onShow: function () {

    },
    onReady () {

    },
    data () {
      return {
        isLogin: true,   //用于视图的判断    如果true则显示登陆注册按钮，false则显示用户信息
        text1: 'true',
        text2: 'false',
      }
    },
    methods: {
      login () {
        wx.redirectTo({
          url: '/pages/login/main'
        })
      },
      LoginOut () {
        var that = this
        Dialog.confirm({
          title: '确定退出',
          message: '退出登录后将无法查看订单，重新登录即可查看'
        }).then(() => {
          // on confirm
          that.isLogin = true
        }).catch(() => {
          // on cancel
        })
      }
    },
  }
</script>

<style>
  .main {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    background: #ffffff;
  }
</style>
