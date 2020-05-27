<template>
  <div class="userContainer">
    <van-cell>
      <van-image class="Img"
                 width="50"
                 height="50"
                 src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <view class="D">
        <p class="name">
          桂工屏风校区一楼食堂
        </p>
      </view>
    </van-cell>
    <!--    分类-->
    <view>
      <van-tabs v-bind:active="active" @change="onChange($event)">
        <van-tab title="点餐">
          <!--        点餐的内容布局-->
          <view>
            <van-tree-select
              v-bind:items="items"
              v-bind:main-active-index="mainActiveIndex"
              v-bind:active-id="activeId"
              v-bind:max="max"
              @clickNav="onClickNav($event)"
              @clickItem=" OnClickItemEvents($event)"
            >
              <!--             <img src="https://img.yzcdn.cn/vant/apple-1.jpg" slot="content" />-->
              <view slot="content">
                <!--                <van-checkbox-group v-bind:value=" selectedGoodIndex" @change="onChangeAdd">-->
                <van-cell-group>
                  <view
                    v-for="(item, idx) in goodList"
                    :key="idx"
                    v-bind:data-index="index">
                    <!--                      @click="toggle"-->
                    <!--   常规的商品卡片  -->
                    <van-card
                      v-bind:value="item._id"
                      v-bind:tag="item.category"
                      v-bind:origin-price="item.oprice"
                      v-bind:price="item.price"
                      v-bind:title="item.goodName"
                      v-bind:desc="item.description"
                      v-bind:thumb="item.fileIds"
                      thumb-mode="aspectFit"
                    >
                      <view slot="tags">
                        <van-icon name="star" color="yellow"/>
                        {{item.score}}
                      </view>
                      <view slot="footer">
                        <!--                          <van-checkbox v-bind:name="item._id" use-icon-slot>-->
                        <!--                            <van-icon slot="icon" name="add-o" color="red" size="20px"/>-->
                        <!--                          </van-checkbox>-->

                        <van-icon name="add-o" color="red" size="23px" @click="onAddCart(item._id)"/>
                      </view>
                    </van-card>
                  </view>
                </van-cell-group>
                <!--                </van-checkbox-group>-->
              </view>
            </van-tree-select>
          </view>
          <!--    商品导航-->
          <view>
            <van-submit-bar
              v-bind:price="totalPrice"
              button-text="提交订单"
              @submit="onClickButton"
              v-bind:tip="true">
              <van-icon name="shopping-cart-o" v-bind:info="carts.length" size="25px" @click="showPopup"/>
              <view slot="tip">
                <view>
                  {{cartTipText}}
                </view>
              </view>
            </van-submit-bar>
          </view>
        </van-tab>

        <van-tab title="评价">
          <!--        评价布局-->
          <view>
            <van-cell>
              <van-row>
                <van-col span="6" v-for="(item,index) in tags" :key="index">
                  <van-tag plain size="large" v-if="!item.selected" @click="onClickTag(item.id)">{{item.value}}
                  </van-tag>
                  <van-tag color="#FF2426" v-else size="large" @click="onClickTag(item.id)">{{item.value}}</van-tag>
                </van-col>
              </van-row>
            </van-cell>
          </view>
          <view class="main1 ">
            <view v-for="(item, idx) in commentList" :key="idx">
              <van-cell v-bind:value="item.commentTime" icon="user-o">
                <view slot="title">
                  <view class="van-cell-text">匿名用户
                    <van-rate readonly size="10px" v-bind:value="item.score" @change="onChange"/>
                  </view>
                </view>
              </van-cell>
              <van-cell>
                <van-row>
                  <van-col>
                    人均 ￥: {{item.per_cost}}
                  </van-col>
                </van-row>
              </van-cell>
              <van-cell>
                <van-row>
                  <van-col>评价内容：{{item.content}}</van-col>
                </van-row>
                <van-row>
                  <van-grid column-num="3">
                    <van-grid-item use-slot v-for="(item, index) in item.fileIds" :key="index">
                      <!--                    <view slot="icon">-->
                      <img
                        style="width:80px; height: 80px;"
                        v-bind:src="item"
                      />
                      <!--                    </view>-->
                    </van-grid-item>
                  </van-grid>
                </van-row>
              </van-cell>
            </view>
          </view>
        </van-tab>
      </van-tabs>
    </view>
    <!--    购物车弹出框   遮盖层-->
    <view>
      <van-popup
        v-bind:show="show"
        position="bottom"
        custom-style="height: 90%;"
        @close="onClose">
        <!--        购物车内容-->
        <view class="cartContainer carts-list ">
          <div class="cart_top">
            <div class="cartTop_titile">
              购物车
            </div>
            <div class="cartTop_delected ">
              <van-icon name="delete" size="13px" @click="deleteCartList"/>
              <text @click="deleteCartList"> 清空购物车</text>
            </div>
          </div>
          <view class="carts-container" v-for="(item, idx) in carts"
                :key="idx"
                v-bind:data-object-id="item._id">
            <!--   常规的商品卡片  -->
            <!--            <van-checkbox-group v-bind:value=" result" @change=" onChangeValue($event)">-->
            <van-cell-group>
              <van-cell>
                <div class="shoppingCart ">
                  <van-icon v-if="item.selected" size="23px" color="red" name="passed"
                            @click="onChangeSelected(item._id)"
                            v-bind:data-index="item.id"/>
                  <van-icon v-else name="circle" size="23px" @click="onChangeSelected(item._id)"
                            v-bind:data-index="item.id"/>
                </div>
                <van-card
                  v-bind:value="item._id"
                  v-bind:tag="item.category"
                  v-bind:thumb="item.fileIds"
                  thumb-mode="aspectFit"
                >
                  <view slot="title" class="D">
                    {{ item.goodName}}
                  </view>
                  <!--                  <view slot="desc" class="D">-->
                  <!--                    {{ item.description}}-->
                  <!--                  </view>-->
                  <view slot="price" class="carts-price">
                    ￥ {{ item.price}}
                  </view>
                  <view slot="footer">
                    <van-button type="default" size="mini" v-bind:id="item._id" v-bind:data-index="index"
                                @click=reduceNum(item)>-
                    </van-button>
                    {{item.num}}
                    <van-button type="default" size="mini" v-bind:id="item._id" @click=addNum(item)>+</van-button>
                  </view>
                </van-card>
              </van-cell>
            </van-cell-group>
          </view>
        </view>
        <!--        底部-->
        <view>
          <van-submit-bar
            v-bind:price="totalPrice"
            button-text="提交订单"
            @submit="onClickButton(this.totalPrice)"
            v-bind:tip="true"
          >
            <!--            <van-checkbox v-bind:value="selectAllStatus" checked-color="#FF2426" @change="SelectedAll($event)"/>-->
            <view>
              <van-icon v-if="selectAllStatus" color="red" size="23px" name="passed" @click="selectedAll($event)">全选
              </van-icon>
              <van-icon v-else name="circle" size="23px" @click="selectedAll($event)">全选</van-icon>
            </view>
            <view slot="tip">
              {{cartTipText}}
            </view>
          </van-submit-bar>
        </view>
      </van-popup>
    </view>

  </div>

</template>

<script>
  export default {
    computed: {},
    onReady: function () {
      this.getGoodList()
      this.initCarts()
      this.getTotalPrice()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      //读取购物车数据
      this.initCart()
      this.getTotalPrice()
      this.initCarts()
      this.getGoodList()
      this.getComment()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      //页面显示，需要刷新购物车数据
      this.initCart()
      this.getTotalPrice()
    },

    data () {
      return {
        commentImages: [],//评价图片
        tags: [
          {
            id: 0,
            value: '全部',
            selected: true,
          },
          {
            id: 1,
            value: '有图',
            selected: false,
          },
          {
            id: 2,
            value: '好评',
            selected: false,
          },
          {
            id: 3,
            value: '差评',
            selected: false,
          },
        ],
        value: '全部',//点击评价的标签值
        commentList: [],//评价列表
        checked1: true,
        selectAllStatus: true,   //全选复选框的勾选状态
        isAdd: false,
        //横向导航
        active: 0,
        //竖向分类
        mainActiveIndex: 0,
        activeId: [],
        //右侧数组选中项的ID
        max: 2,
        items: [{
          // 导航名称
          text: '全部',
          disabled: false,// 禁用选项
          // 该导航下所有的可选项
          children: [],
          badge: 5
        },
          {
            text: '限时打折',
            children: [],
          },
          {
            text: '早餐',
            children: [],
          },
          {
            text: '午餐',
            children: []
          },
          {
            text: '晚餐',
            children: []
          }
        ],
        goodList: [],
        category: [],
        selectedCategory: '全部', //当前选中的分类ID，页面加载时默认选中的全部分类
        show: false,
        selectedGoodIndex: [],//复选框
        cart: [],//缓存的cart
        carts: [],//转化后的购物车的数据，用于渲染
        selectedGood: [],
        result: [],
        totalPrice: 0,           // 总价，初始为0
        selectAllStatus: true, // 全选状态，默认全选
        cartTipText: '十元起送，配送费1元',
        num: 0,
        // sale: false,
        totalMoney: '',
      }
    },
    methods: {
//将缓存的购物车数据转化，渲染在页面上
      initCarts () {
        let carts = []
        if (this.cart && this.cart.length > 0) {
          this.cart.map(val => {
            if (val) {
              carts = [...carts, ...val]
            } else {
              carts = [...carts]
            }
          })
          this.carts = carts
        }
      },

      onClickTag (id) {
        // console.log(id)
        const index = this.tags.findIndex(item => item.id === id)
        const selected = this.tags[index].selected
        this.tags[index].selected = !selected
        this.$set(this.tags, index, this.tags[index])
        this.value = this.tags[index].value
        this.getComment()
      },
      getComment () {
        const that = this
        const db = wx.cloud.database()
        const comment = db.collection('comment')
        if (that.value === '全部') {
          comment.get().then(res => {
            console.log(res)
            that.commentList = []
            that.commentList = that.commentList.concat(res.data)
            that.commentImages = that.commentList.fileIds
          })
            .catch(err => {
              console.log(err)
            })
        } else if (that.value !== '全部' && that.value !== '') {
          comment.where({
            category: that.selectedCategory,
          })
            .get().then(res => {
            console.log(res)
            that.commentList = []
            that.commentList = that.commentList.concat(res.data)
          })
            .catch(err => {
              console.log(err)
            })
        }
      },
      //   用户点击 导航
      onChange (event) {
        wx.showToast({
          // title: `切换到标签 ${event.mp.detail.name}`,
          title: `切换到${event.mp.detail.title}`,
          icon: 'none'
        })
      },
      onClickNav (event) {
        console.log(event.mp.detail.index)
        this.mainActiveIndex = event.mp.detail.index
        console.log('mainActiveIndex:', this.mainActiveIndex)
        console.log('选中标题：', this.items[this.mainActiveIndex].text)
        wx.showToast({
          // title: `切换到标签 ${event.mp.detail.name}`,
          title: `切换到分类${this.items[this.mainActiveIndex].text}`,
          icon: 'none'
        })
        //将用户点击的分类  放入selectedCategory中
        this.selectedCategory = this.items[this.mainActiveIndex].text
        console.log('selectedCategory:', this.selectedCategory)
        this.getGoodList()
      },
      //未改
      OnClickItemEvents (event) {
        console.log(event.mp.detail)
        const {clickActiveId} = event.mp.detail
        const index = clickActiveId.indexOf(event.mp.detail.id)
        console.log('index:', this.index)
        if (index > -1) {
          clickActiveId.splice(index, 1)
        } else {
          clickActiveId.push(event.mp.detail.id)
        }
        console.log('clickActiveId:', this.clickActiveId)
        this.activeId = clickActiveId
        console.log('activeId:', this.activeId)
      },
      //     获取列表
      getGoodList () {
        const that = this
        const db = wx.cloud.database()
        const good = db.collection('good')
        const sale = db.collection('sale')
        if (that.selectedCategory === '全部') {
          good.get().then(res => {
            console.log(res)
            that.goodList = []
            that.goodList = that.goodList.concat(res.data)
            // console.log('goodList:', that.goodList)
            this.getSaleList()
          })
            .catch(err => {
              console.log(err)
            })
        } else if (that.selectedCategory !== '全部' && that.selectedCategory !== '限时打折') {
          good.where({
            category: that.selectedCategory,
          })
            .get().then(res => {
            console.log(res)
            that.goodList = [],
              that.goodList = that.goodList.concat(res.data)
            console.log('goodList:', that.goodList)
            this.getSaleList()
          })
            .catch(err => {
              console.log(err)
            })
        } else if (that.selectedCategory === '限时打折') {
          sale.get().then(res => {
            console.log(res)
            let saleList = res.data
            that.goodList = saleList[0].goodList
            // console.log('saleList:', saleList)
            this.getSaleList()
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //获取秒杀列表
      getSaleList () {
        const db = wx.cloud.database()
        const sale = db.collection('sale')
        sale.get().then(res => {
          // console.log(res)
          let saleList = res.data
          saleList = saleList[0].goodList
          // console.log('saleList:', saleList)
          for (let i = 0; i < saleList.length; i++) {
            const id = saleList[i]._id
            const oPrice = saleList[i].price
            const newPrice = saleList[i].nowPrice
            this.goodList.map(item => {
              if (item._id === id) {
                return (item.oprice = oPrice, item.price = newPrice)
              }
            })
            // console.log('1', this.goodList)
          }
        })
      },
//  提交订单按钮
      onClickButton () {
        if (this.totalMoney > 10) {
          wx.navigateTo({
            url: '/pages/onSubmitOder/main'
          })
        } else {
          wx.showToast({
            title: this.cartTipText,
            icon: 'none',
            duration: 2000
          })

        }

      },
      showPopup () {
        this.show = true
        this.initCarts()
      }
      ,
      onClose () {
        this.show = false
      }
      ,
      //t添加按钮动画
      onClick (event) {
        this.isAdd = true

      }
      ,
      addShop (event) {
        console.log(event.mp.detail)

      }
      ,
      onAddCart (id) {
        // console.log(id)
        this.selectedGood = this.goodList.filter(item => item._id === id)
        console.log('selectedGood2', this.selectedGood)
        //向数组中添加num字段
        this.selectedGood.map(item => {
          item.num = 1,
            item.selected = true
        })
        this.addCart()
        this.initCarts()
        this.getTotalPrice()
      }
      ,
      //富选项
      onChangeAdd (event) {
        //获取选中的商品数据
        console.log(event.mp.detail)
        let index = event.mp.detail.toString()
        console.log(index)
        this.selectedGoodIndex = event.mp.detail
        for (let i = 0; i < this.selectedGoodIndex.length; i++) {
          let id = this.selectedGoodIndex[i].toString()
          this.selectedGood = this.goodList.filter(item => item._id === id)
          // this.selectedGood = this.selectedGood.concat(this.selectedGoodList);
          console.log('selectedGood', this.selectedGood)
          //向数组中添加num字段
          this.selectedGood.map(item => {
            item.num = 1
            item.selected = true
          })
          this.initCarts()
          this.getTotalPrice()

        }

        this.addCart()
      }
      ,

      toggle (event) {
        // const {index} = event.currentTarget.dataset;
        // console.log(event.currentTarget.dataset);
        // const checkbox = this.selectComponent(`.checkboxes-${index}`)
        // checkbox.toggle()
      }
      ,
      //减商品
      reduceNum (data) {
        // const id = event.currentTarget.id
        // console.log(id)
        data.num--
        if (data.num <= 0) {
          data.num = 1
        }
        const index = this.carts.findIndex(item => item._id === data._id)
        this.carts[index].num = data.num
        this.$set(this.carts, index, this.carts[index])
        this.getTotalPrice()
        //更新本地缓存
        wx.setStorage({
          key: 'cart',
          data: this.cart,
        })
      }
      ,
      //添加商品
      addNum (data) {
        // console.log(data);
        data.num++
        const index = this.carts.findIndex(item => item._id === data._id)
        this.carts[index].num = data.num
        this.$set(this.carts, index, this.carts[index])
        this.getTotalPrice()
        //更新本地缓存
        wx.setStorage({
          key: 'cart',
          data: this.cart,
        })
      }
      ,

      onChangeSelect (id, event) {
        console.log(event.mp.detail)
        this.checked1 = event.mp.detail
        console.log(event.currentTarget)
        console.log(id)
      }
      ,
      //单选
      onChangeSelected (id) {
        this.selectAllStatus = false
        const index = this.carts.findIndex(item => item._id === id)
        const selected = this.carts[index].selected
        this.carts[index].selected = !selected
        this.$set(this.carts, index, this.carts[index])
        // console.log(id)
        this.getTotalPrice()
      }
      ,
      //计算总价
      getTotalPrice () {
        let carts = this.carts                 // 获取购物车列表
        let total = 0
        let num = 0
        for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
          if (carts[i].selected) {
            num = carts[i].num + num// 判断选中才会计算价格
            total += carts[i].num * carts[i].price     // 所有价格加起来
          }
        }
        total = total + num
        this.num = num
        this.carts = carts// 最后赋值到data中渲染到页面
        this.totalPrice = total.toFixed(2)//如何使用 toFixed() 来舍入一个数字。
        this.totalMoney = Number(this.totalPrice)//因为组件的类型是数值
        // console.log(this.totalMoney );
        if (this.totalMoney < 10) {
          let num = 10 - this.totalMoney
          this.cartTipText = `还差${num}就能起送,快去凑单`
        } else {
          this.cartTipText = '已满10元，包装费1元'
        }
        this.totalPrice = this.totalPrice * 100

      }
      ,

      onChangeValue (event) {
        // const index = event.currentTarget.dataset.eventid;
        //   console.log(index);
        this.result = event.mp.detail
        console.log(this.result)
      }
      ,
      //全选
      selectedAll (event) {
        let selectAllStatus = this.selectAllStatus
        selectAllStatus = !selectAllStatus
        let carts = this.carts
        for (let i = 0; i < carts.length; i++) {
          carts[i].selected = selectAllStatus     // 改变所有商品状态
        }
        console.log('carts', carts)
        this.selectAllStatus = selectAllStatus
        this.carts = carts
        this.getTotalPrice() //重新获取总价

      }
      ,
      /**
       * 页面加载时读取用户本地缓存的购物车数据
       */
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
      }
      ,

      addCart: function () {
        //  添加商品到购物车
        var value = wx.getStorageSync('cart')
        if (value) {
          // for (var i = 0; i < value.length; i++) {
          //   // console.log(value[i]);
          //   for (var j = 0; j < value[i].length; j++) {
          //     console.log(value[i][j])
          //     let test = value[i][j]
          //     let test1 = value.filter(test => test._id === this.selectedGood[0]._id)
          //     console.log('test1', test1)
          //   }
          // }
          //将value中的子数组转化成数组  利用map
          let test = []
          if (value && value.length > 0) {
            value.map(val => {
              if (val) {
                test = [...test, ...val]
              } else {
                test = [...test]
              }
            })
          }
          console.log('test', test)
          //利用filter方法   筛选出已经添加的菜单，根据数组的长度判断，是否添加到购物车
          let dd = test.filter(item => item._id === this.selectedGood[0]._id)
          // console.log('dd', dd)
          if (dd.length <= 0) {
            // console.log(this.selectedGood[0]._id)
            value.unshift(this.selectedGood)
            // console.log('value3', value)
          }
        } else {
          value = []
          value.push(this.selectedGood)
          console.log('value4', value)
        }
        //更新显示数据

        this.cart = value
        //更新本地缓存
        wx.setStorage({
          key: 'cart',
          data: value,
        })
        //提示已加入购物车,2秒后隐藏提示
        wx.showToast({
          title: '已加入购物车',
          icon: 'success',
          duration: 2000
        })
      }
      ,
      //清空购物车
      deleteCartList () {
        this.cart = []
        this.carts = []
        this.totalPrice = 0
        //更新本地缓存
        wx.removeStorage({
          key: 'cart',
        })
        // this. getTotalPrice;
      }
      ,

    }
    ,

  }
</script>

<style>
  .D {
    float: left;
    font-size: 18px;
    color: #444;
    line-height: 38px;
  }

  .main1 {
    width: 100%;
    height: 400px;
    background: #ffffff;
    margin: 10px auto;
  }

  .A {
    float: left;
  }

  .name {
    color: #565656;
    font-size: 16px;
    line-height: 50px;
  }

  .Img {
    float: left;
  }

  .carts-price {
    float: left;
    color: #ff2026;
    font-size: 18px;
    line-height: 22px;
  }

  .shoppingCart {
    flex: 1;
    text-align: left;
  }

  .van-icon- s {
    float: left !important;
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;
  }

  .van-enter-active-class,
  .van-leave-active-class {
    transition-property: background-color, transform;
  }

  .van-enter-class,
  .van-leave-to-class {
    background-color: red;
    transform: rotate(-360deg) translate3d(-100%, -100%, 0);
  }

  .value-class {
    flex: none !important;
  }


</style>
