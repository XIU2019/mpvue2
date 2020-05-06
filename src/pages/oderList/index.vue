<template>
<!--  <div>-->
<!--  <div>-->
<!--    <open-data type="userAvatarUrl"></open-data>-->
<!--<open-data type="userNickName"></open-data>-->
<!--  </div>-->
<!--<div>-->
<!--<button open-type='getUserInfo' bindgetuserinfo='onGotUserInfo'>获取用户信息</button>-->
<!--</div>-->
<!--    </div>-->
<div class="userContainer">
    <div class="user">
      <div class="userImg">
        <!--<img src="/static/img/tx.png" alt="tx">-->
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="userName">
       <van-button  v-if="isLogin===false" plain hairline type="primary" size="small" color="#1bc6bf" open-type="getUserInfo" @getuserinfo="onGetUserInfo">登录/注册</van-button>
      </div>
<!--      用户名-->
      <ul  class="userD">
        <p class="userName">
          <open-data type="userNickName"></open-data>
          <open-data type="userGender" lang="zh_CN"></open-data>
        </p>
      </ul>
      <!--        完善个人资料-->
      <div>
         <van-cell
          icon="edit"
          is-link
       title="完善个人资料"
        link-type="switchTab"
       url="/pages/orderList/main"
       />
<!--        订单-->
        <van-cell
          icon="shop-o"
          is-link
       title="我的订单"
        link-type="switchTab"
       url="/pages/orderList/main"
       />
<!--        我的地址-->
        <van-cell
          icon="location-o"
          is-link
       title="我的地址"
        link-type="switchTab"
       url="/pages/orderList/main"
       />
<!--        我的评价-->
          <van-cell
          icon="records"
          is-link
       title="我的评价"
        link-type="switchTab"
       url="/pages/orderList/main"
       />
<!--联系卖家-->
         <van-cell
          icon="phone-o"
          is-link
       title="联系卖家"
        link-type="switchTab"
       url="/pages/orderList/main"
       />
<!--        退出登录-->
        <div class="userLogIn">
      <a>退出登陆</a>
    </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
computed: {
  isLogin () {

  },
},
  data () {
    return {

    }
  },

  onGotUserInfo:function(event){
console.log(event);
  },
}
</script>

<style>

</style>
