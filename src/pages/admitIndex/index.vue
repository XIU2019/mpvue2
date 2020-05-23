<template>
  <div class="userContainer">
    <div class="user">
      <div class="userImg">
        <div v-if="isLogin">
        </div>
        <div v-else>
      <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
      </div>
      <div class="userName">
        <p class="userName" >
          管理员XIU2020
        </p>
      </div>
      <div class="main">
         <!--        用户管理-->
        <van-cell
          icon="shop-o"
          is-link
          title="用户管理"
         link-type="navigateTo"
          url="/pages/orderList/main"
        />
         <!--        菜品管理-->
        <van-cell
          icon="shop-o"
          is-link
          title="菜品管理"
         link-type="navigateTo"
          url="/pages/orderList/main"
        />

        <!--        订单管理-->
        <van-cell
          icon="shop-o"
          is-link
          title="订单管理"
         link-type="navigateTo"
          url="/pages/orderList/main"
        />
        <!--        我的评价-->
        <van-cell
          icon="location-o"
          is-link
          title="评价管理"
          link-type="navigateTo"
          url="/pages/address/main"
        />
        <!--        轮播图-->
        <van-cell
          icon="records"
          is-link
          title="轮播图"
          link-type="navigateTo"
          url="/pages/orderList/main"
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
      this.isLogin = false
    },
    onShow: function () {

    },
    onReady () {

    },
    data () {
      return {
        isLogin: true,   //用于视图的判断    如果true则显示登陆注册按钮，false则显示用户信息

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
