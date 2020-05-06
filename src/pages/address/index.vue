<template>
  <div class="body">
    <div class="main ">
      <div class="main_img" v-if="flat">
        <van-image
          width="100"
          height="100"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="cart" v-else>
        <div class="cart_left">
          <van-icon name="passed"/>
          <!--      <van-icon name="circle" />-->
        </div>
        <div class="cart_middle">
          <div class="cart_top"></div>
          <div class="cart_foot"></div>
        </div>

        <div class="cart_right">
          <van-icon name="edit"/>
        </div>
      </div>

      <!--      <button type="primary" @tap="chooseAddress">获取收货地址</button>-->
    </div>
    <div class="foot">
      <van-icon name="add-o" color="red" size="18px"/>
      <text class="oder_top_text">添加收货地址</text>
    </div>
  </div>
</template>

<script>
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
        flat: true,
        addressInfo: null,
      }
    },
    methods: {
      chooseAddress () {
        wx.chooseAddress({
            success: (res) => {
              this.addressInfo = res
            },

            fail: function (err) {
              console.log(err)
            }
          }
        )
      },
    },
  }
</script>

<style>
  .body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #eeeeee;
  }

  .foot {
    position: absolute;
    width: 100%;
    height: 10%;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .main {
    width: 100%;
    height: 90%;
    background: #eeeeee;
  }

  .main_img {
    width: 300px;
    height: 200px;
    background: #eeeeee;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .butoom {
    margin: auto;
  }


  .cart {
    position: relative;
    width: 95%;
    height: 100px;
    top: 10px;
    right: 0;
    bottom: 0;
    border-radius: 10px 10px 10px 10px;
    left: 0;
    background: #ffffff;
    margin: 0 auto;
  }

  .cart_left {
    width: 10%;
    height: 100px;
    float: left;
    background: red;
    border-radius: 10px 0 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .cart_middle {
    width: 80%;
    height: 100px;
    float: left;
    background: #db4ad1;

  }

  .cart_top {
    width: 100%;
    height: 40px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .cart_foot {
    width: 100%;
    height: 60px;
    background: #38ffb3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .cart_right {
    width: 10%;
    height: 100px;
    float: right;
    background: #0f7dee;
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .add {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
