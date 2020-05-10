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
      <div class="cart"
           v-if="!flat"
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
  </div>
</template>

<script>
  export default {
    computed: {},
    onLoad: function (e) {
      // console.log(e.flat)
      this.getAddress()
      Object.assign(this.$data, this.$options.data())//用于重新定义data的数据
      this.flat = false
      //
    },
    onShow: function () {
      this.getAddress()
    },
    onReady () {
      this.getAddress()
    },
    data () {
      return {
        flat: true,
        addressInfo: [],
        selected: false,
      }
    },
    methods: {
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
          // 缓存地址信息
          wx.setStorage({
            key: 'addressInfo',
            data: that.addressInfo,
            success (res) {
              console.log(res)
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      //  选择地址
      onSelected (id) {
        // console.log(id)
        const index = this.addressInfo.findIndex(item => item._id === id)
        const selected = this.addressInfo[index].selected
        this.addressInfo[index].selected = !selected
        this.$set(this.addressInfo, index, this.addressInfo[index])
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
