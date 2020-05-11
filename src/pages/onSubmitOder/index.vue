<template>
  <div class="oder_Container">
    <div class="userContainer">
      <div class="oder_top">
        <van-tabs bind:click="onClick">
          <van-tab title="外卖配送">
            <van-cell-group>
              <van-cell is-link @click="showPopup" v-if="flat">
                <view slot="icon">
                  <van-icon name="add-o" color="red" size="18px" @click="showPopup"/>
                </view>
                <view slot="title">
                  <view class="van-cell-text">
                    <text class="oder_top_text" @click="showPopup">添加收货地址</text>
                  </view>
                </view>
              </van-cell>
              <van-cell is-link @click="showPopup" center
                        v-bind:title="selectedAddressInfo[0].userName+selectedAddressInfo[0].phone"
                        v-bind:label="selectedAddressInfo[0].addressCity+selectedAddressInfo[0].address" v-else/>
              <van-cell title="立即送出" v-bind:value="time" is-link @click="showPopupTime"/>
              <!--               <van-cell title="预留电话" is-link value="内容"/>-->
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
            <van-cell title="小计" v-bind:value="'￥'+totalMoney"/>
            <van-cell title="支付方式" value="线上支付"/>
            <van-cell title="备注" is-link v-bind:value="message" link-type="navigateTo"
                      url="/pages/orderMessage/main"/>
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
    <!-- 地址弹出窗口-->
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
    <!-- 时间弹出窗口-->
    <van-popup v-bind:show="showTime" @close="onCloseTime" position="bottom" custom-style="height: 50%;">
      <van-datetime-picker
        type="time"
        v-bind:value="currentDate"
        v-bind:filter="filter"
        @confirm="confirmTime($event)"
        @cancel="cancelTime"
      />
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
    onLoad: function (e) {
      //读取购物车数据
      this.initCart()
      this.getTotalPrice()
      // this.initCarts()
      // this.getGoodList()
      this.getAddress()
      console.log(e)
      Object.assign(this.$data, this.$options.data())
      this.message = e.message
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
        show: false,//地址弹出层
        flat: true,//是否选择了地址
        addressInfo: [],
        selectedAddressInfo: [],
        showTime: false,//时间弹出窗口
        time: '',//渲染的时间数据
        currentDate: '12:00',
        filter (type, options) {
          if (type === 'minute') {
            return options.filter((option) => option % 15 === 0)
          }
          return options
        },
        message: '无接触配送',
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
      //  选择地址
      onSelected (id) {
        // console.log(id)
        const index = this.addressInfo.findIndex(item => item._id === id)
        const selected = this.addressInfo[index].selected
        this.addressInfo[index].selected = !selected
        this.$set(this.addressInfo, index, this.addressInfo[index])
        this.flat = false
        this.selectedAddressInfo = this.addressInfo.filter(item => item._id === id)//将选中的地址展示出来上
      },
      //新增地址
      addAddress () {
        wx.navigateTo({
          url: '/pages/addAddress/main',
        })
      },
      //  编辑地址
      updateAddress (id) {
        // console.log(id)
        wx.navigateTo({
          url: `/pages/updateAddress/main?id=${id}`,
        })
      },
      //  删除地址
      deleteAddress (id) {
        // console.log(id)
        var that = this
        const db = wx.cloud.database()
        db.collection('address')
          .where(
            {
              _id: id,
            }
          ).remove().then(res => {
          console.log(res)
          that.getAddress()
        }).catch(err => {
          console.log(err)
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
      },
      showPopupTime () {
        this.showTime = true
      },
      onCloseTime () {
        this.showTime = false
      },
      confirmTime (event) {
        console.log(event.mp.detail)
        this.currentDate = event.mp.detail
        this.time = '大约' + this.currentDate + '送达'
        this.showTime = false
      },
      cancelTime () {
        this.showTime = false
      },
      onSubmit () {

      },
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
    /*height: 400px;*/
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
