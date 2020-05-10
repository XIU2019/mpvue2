<template>
  <div class="oder_Container">
    <div class="userContainer">
      <div class="oder_top">
        <van-tabs bind:click="onClick">
          <van-tab title="外卖配送">
            <van-cell-group>
              <van-cell is-link @click="showPopup">
                <view slot="icon">
                  <van-icon name="add-o" color="red" size="18px" @click="showPopup"/>
                </view>
                <view slot="title">
                  <view class="van-cell-text">
                    <text class="oder_top_text" @click="showPopup">添加收货地址</text>
                  </view>

                </view>
              </van-cell>
              <van-cell title="立即送出" value="内容" is-link/>
              <van-cell title="预留电话" is-link value="内容"/>
            </van-cell-group>
          </van-tab>
          <van-tab title="食堂自取">
            <van-cell-group>
              <van-cell title="商家地址" value="内容" center/>
              <van-cell title="自取时间" is-link value="内容"/>
              <van-cell title="预留电话" is-link value="内容"/>
            </van-cell-group>
          </van-tab>
        </van-tabs>
      </div>
      <div class="oder_main">
        <van-swipe-cell>
          <van-cell-group>
            <van-cell
              v-for="(item, idx) in carts"
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
            <van-cell title="包装费" v-bind:value="totalNum"/>
            <van-cell title="配送费" value="￥1"/>
            <van-cell title="小计" v-bind:value="totalMoney"/>
            <van-cell title="支付方式" value="线上支付"/>
            <van-cell title="备注" is-link value="点击无接触配送"/>
            <van-cell title="备注" value="点击无接触配送"/>
          </van-cell-group>
        </van-swipe-cell>
      </div>
      <div class="foot">
        <van-submit-bar
          v-bind:price="totalPrice"
          button-text="去支付"
          @submit="onSubmit"
        />
      </div>
    </div>
    <!--    弹出窗口-->
    <van-popup v-bind:show="show" @close="onClose" position="bottom" custom-style="height: 50%;">
      <div class="main ">
        <div class="cart"
             v-for="(item, idx) in addressInfo"
             :key="idx"
        >
          <div class="cart_left">
            <van-icon name="passed" v-if="item.selected" color="red" @click="onSelected(item._id)"/>
            <van-icon name="circle" v-else @click="onSelected(item._id)"/>
          </div>
          <div class="cart_middle">
            <div class="cart_top">
              {{item.userName}} {{item.phone}}
            </div>
            <div class="cart_foot">
              <view class="cart_foot_text">
                {{item.addressCity}} {{item.address}}
              </view>
            </div>
          </div>

          <div class="cart_right">
            <van-icon name="edit" @click="updateAddress(item._id)"/>
            <van-icon name="delete" @click="deleteAddress(item._id)"/>
          </div>
        </div>

        <!--      <button type="primary" @tap="chooseAddress">获取收货地址</button>-->
      </div>
      <div class="foot">
        <van-icon name="add-o" color="red" size="18px" @click="addAddress"/>
        <text class="oder_top_text" @click="addAddress">添加收货地址</text>
      </div>
    </van-popup>
  </div>
</template>

<script>


  export default {
    onReady: function () {
      // this.getGoodList()
      // this.initCarts()
      this.getTotalPrice()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      //读取购物车数据
      this.initCart()
      this.getTotalPrice()
      // this.initCarts()
      // this.getGoodList()
      this.getAddress()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      //页面显示，需要刷新购物车数据
      this.initCart()
      this.getTotalPrice()
      this.getAddress()

    },
    data () {
      return {
        carts: [],
        totalNum: '',//包装费
        totalPrice: 0,//总价
        totalMoney: 0,//转换
        show: false,//弹出层
        flat: true,
        addressInfo: [],
      }
    },
    methods: {
      initCart: function () {
        var value = wx.getStorageSync('cart')
        if (value) {
          this.cart = value
        } else {
          this.cart = []
        }
        let carts = []
        if (this.cart && this.cart.length > 0) {
          this.cart.map(val => {
            if (val) {
              carts = [...carts, ...val]
            } else {
              carts = [...carts]
            }
          })
          // console.log('carts',carts);
          // carts.map(item => {
          //   item.num = 1
          // })
          // console.log('carts', carts)
          this.carts = carts
        }
      },

      //获取地址
      getAddress () {
        var that = this
        const db = wx.cloud.database()
        db.collection('address')
          .get().then(res => {
          console.log(res)
          that.addressInfo = []
          that.addressInfo = that.addressInfo.concat(res.data)
          // console.log(that.addressInfo)
          //  给addressInfo添加选择属性
          that.addressInfo.map(item => {
            item.selected = false
          })
        })
      },

      //计算总价
      getTotalPrice () {
        let carts = this.carts                 // 获取购物车列表
        let total = 0
        let num = 0
        for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
          if (carts[i].selected) {                   // 判断选中才会计算价格
            num = carts[i].num + num//包装费
            total += carts[i].num * carts[i].price     // 所有价格加起来   费送费1元
          }
        }
        total = total + num + 1
        this.totalNum = `￥${num}`
        this.carts = carts// 最后赋值到data中渲染到页面
        this.totalPrice = total.toFixed(2)//如何使用 toFixed() 来舍入一个数字。
        this.totalMoney = Number(this.totalPrice)//因为组件的类型是数值
        this.totalPrice = this.totalMoney * 100
      },
      //  弹出层窗口
      showPopup () {
        this.show = true
      },

      onClose () {
        this.show = false
      }

    },
  }
</script>

<style>
  .oder_Container {
    margin: 0;
    padding: 0;
    background: #565656;
  }

  .oder_top {
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
    /*height: 200px;*/
    background: #fff;
  }

  .foot {
    margin-top: 10px;
    width: 100%;
    background: #fff;
  }

  .oder_top_text {
    color: #ff5a58;
  }

  .oder_main {
    margin-top: 10px;
    width: 100%;
    height: 300px;
    background: #fff;
  }

  .show_main {
    width: 100%;
    height: 90%;
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
    height: 70px;
    top: 10px;
    right: 0;
    bottom: 0;
    border-radius: 10px 10px 10px 10px;
    left: 0;
    background: #ffffff;
    margin: 10px auto;
  }

  .cart_left {
    width: 10%;
    height: 70px;
    float: left;
    background: #ffffff;
    border-radius: 10px 0 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .cart_middle {
    width: 75%;
    height: 70px;
    float: left;
    background: #ffffff;


  }

  .cart_top {
    width: 100%;
    height: 35px;
    background: #ffffff;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .cart_foot {
    width: 100%;
    height: 35px;
    background: #ffffff;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .cart_foot_text {
    color: #555555 !important;
  }

  .cart_right {
    width: 15%;
    height: 70px;
    float: right;
    background: #ffffff;
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
