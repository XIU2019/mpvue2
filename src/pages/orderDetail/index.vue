<template>
  <div class="body">
    <div class="top1">

    </div>
    <div class="top">
      <van-steps v-bind:steps="steps" v-bind:active="active" active-icon="success"
                 active-color="#FF2620" desc-class="desc-class1" @clickStep="onchangeStep"/>
    </div>
    <div class="main">
      <scroll-view scroll-y="true" style="height: 100%;" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
        <div class="mainBox1" v-if="flat">
          <div class="mainBox1_top " v-if="!canceled">
            <van-icon name="underway-o" size="large"/>
            <text class="text">预计送达时间:{{orderList.sendTime}}</text>
          </div>
          <div class="mainBox1_top " v-if="canceled">
            <text class="text">您的订单已取消</text>
          </div>
          <div class=" mainBox1_bottom">
            <div class="mainBox1_left" v-if="!canceled">
              <van-button type="default" size="small" @click="cancelOrder">取消订单</van-button>
            </div>
            <div class="mainBox1_left" v-if="canceled">
              <van-button type="default" size="small" @click="cancelOrder">逛逛别家</van-button>
            </div>
            <div class="mainBox1_right">
              <van-button type="default" size="small" @click="goProduct">再来一单</van-button>
            </div>
          </div>
        </div>
        <!--          订单状态改变  内容改变-->
        <div class="mainBox1" v-if="!flat">
          <div class="mainBox1_top ">
            <text class="text">{{message}}</text>
          </div>
          <div class=" mainBox1_bottom">
            <van-button type="default" size="small" @click="goProduct">{{context}}</van-button>
          </div>
        </div>
        <div class="mainBox2">
          <van-swipe-cell>
            <van-cell-group>
              <van-cell
                v-for="(item, idx) in goodList"
                :key="idx"
                clickable
                v-bind:data-index="index">
                <van-card
                  v-bind:num="item.num"
                  v-bind:tag="item.category"
                  v-bind:thumb="item.fileIds"
                  thumb-mode="aspectFit"
                >
                  <view slot="title" class="D">
                    {{ item.goodName}}
                  </view>
                  <view slot="price" class="carts-price">
                    ￥ {{ item.price}}
                  </view>
                </van-card>
              </van-cell>
              <van-cell title="合计" v-bind:value="'￥'+orderList.totalMoney"/>
              <van-cell title="致电商家">
                <van-icon slot="icon" name="phone-o" color="red" size="20px" class="custom-icon"/>
              </van-cell>
            </van-cell-group>
          </van-swipe-cell>
          <div class="mainBox3">
            <van-cell title="订单信息">
              <van-icon slot="icon" name="label-o" color="red" size="20px" class="custom-icon"/>
            </van-cell>
            <van-row>
              <van-col offset="1.5" class="text">订单号：z2020295555</van-col>
            </van-row>
            <van-row>
              <van-col offset="1.5" class="text">下单时间：{{orderList.orderTime}}</van-col>
            </van-row>
            <van-row>
              <van-col offset="1.5" class="text">下单方式：{{orderList.payment}}</van-col>
            </van-row>
            <van-row>
              <van-col offset="1.5" class="text">订单备注：{{orderList.orderInfo}}</van-col>
            </van-row>
          </div>
          <div class="mainBox4">
            <van-cell title="配送信息">
              <van-icon slot="icon" name="todo-list-o" color="red" size="20px" class="custom-icon"/>
            </van-cell>
            <van-row>
              <van-col offset="1.5" class="text">送达时间：{{orderList.sendTime}}</van-col>
            </van-row>
            <van-row>
              <van-col offset="1.5" class="text">联系人：{{orderList.userName}}</van-col>
            </van-row>
            <van-row>
              <van-col offset="1.5" class="text">联系方式：{{orderList.phone}}</van-col>
            </van-row>
            <van-row>
              <van-col offset="1.5" class="text">配送地址：{{orderList.addressCity}} {{orderList.address}}</van-col>
            </van-row>
          </div>
        </div>

      </scroll-view>
    </div>

  </div>
</template>
<script>
  export default {
    onLoad (e) {
      console.log(e)
      Object.assign(this.$data, this.$options.data())
      this.order_id = e.order_id
      this.orderAdmit_id = e.orderAdmit_id
      // 05f2c36f5ebbafbf00b779371e24a9d3
      // 982133855ebbafbf00a289942c1b73a0
      this.getOrderList()
    },
    onReady () {
 this.getOrderList()
    },
    onShow () {
 this.getOrderList()
    },
    data () {
      return {
        order_id: '',
        orderAdmit_id: '',
        steps: [
          {
            desc: '提交订单',
          },
          {
            desc: '商家接单',
          },
          {
            desc: '配送中',
          },
          {
            desc: '订单完成',
          },
        ],
        active: 0,
        orderList: [],
        goodList: [],
        canceled: false,
        flat: true,
        context: '',
        message: '',
      }
    },
    methods: {
      onchangeStep (event) {
        console.log(event.mp.detail)
        this.active = event.mp.detail
        if (this.active === 1) {
          this.flat = false
          this.message = '商家已接单，请耐心等待'
          this.context = '再来一单'
        } else if (this.active === 2) {
          this.flat = false
          this.message = '商品配送中，请耐心等待'
          this.context = '再来一单'
        } else if (this.active === 3) {
          this.flat = false
          this.message = '订单已完成，去评价'
          this.context = '再来一单'
        }

      },
      upper (e) {
        // console.log(e)
      },

      lower (e) {
        // console.log(e)
      },

      scroll (e) {
        // console.log(e)
      },
      //  获取订单信息
      getOrderList () {
        var that = this
        const db = wx.cloud.database()
        db.collection('order').doc(that.order_id)
          .get().then(res => {
          console.log(res)
          that.orderList = res.data
          that.goodList = that.orderList.goodList
        }).catch(err => {
          console.log(err)
        })
      },
      goProduct () {
        wx.switchTab({
          url: '/pages/index/main',
        })
      },
      cancelOrder () {
        var that = this
        const db = wx.cloud.database()
        db.collection('order').doc(that.order_id)
          .update({
              data: {
                orderStatus: '订单已取消',
              }
            }
          ).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.canceled = true
        }),
          db.collection('orderAdmit').doc(that.orderAdmit_id)
            .update({
                data: {
                  orderStatus: '订单已取消',
                }
              }
            ).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        this.canceled = true

      },

    },
  }
</script>
<style scoped>
  .text {
    font-size: 16px !important;
    line-height: 35px;
  }

  .body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #eeeeee;
  }

  .top1 {
    width: 95%;
    height: 2px;
    background: #eeeeee;
    margin: 10px auto;
  }

  .top {
    width: 95%;
    height: 14%;
    background: #ffffff;
    margin: 0 auto;


  }

  /*.foot {*/
  /*  position: absolute;*/
  /*  width: 100%;*/
  /*  height: 10%;*/
  /*  background: #0f7dee;*/
  /*  display: flex;*/
  /*  flex-direction: row;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*}*/

  .main {
    width: 100%;
    height: 85%;
    background: #eeeeee;
    margin: auto;
  }

  .mainBox1 {
    width: 95%;
    height: 20%;
    background: #ffffff;
    margin: 10px auto;
    position: relative;

    /*line-height: 20px;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }

  .mainBox1_top {
    width: 100%;
    height: 50%;
    background: #ffffff;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .mainBox1_bottom {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .mainBox1_left {
    width: 50%;
    height: 100%;
    background: #ffffff;
    float: left;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .mainBox1_right {
    width: 50%;
    height: 100%;
    background: #ffffff;
    float: right;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .mainBox2 {
    width: 95%;
    height: 100px;
    background: #ffffff;
    margin: 10px auto;
    position: relative;
  }

  .mainBox3 {
    width: 100%;
    height: 200px;
    background: #ffffff;
    margin: 10px auto;
    position: relative;
  }

  .mainBox4 {
    width: 100%;
    height: 200px;
    background: #ffffff;
    margin: 10px auto;
    position: relative;
  }

</style>
