<template>
  <div>
    <div>
      <van-tabs @change="onChange">
        <van-tab title="全部">
          <view v-for="(item, idx) in orderList"
                :key="idx">
            <van-cell
              value=" 订单已完成" value-class="cell-value">
              <view slot="icon">
                <van-image
                  width="30px"
                  height="30px"
                  fit="contain"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </view>
              <div slot="title" class="cell-title ">
                桂工屏风食堂一楼
              </div>
            </van-cell>
            <van-cell>
              <van-row v-for="(item, _id) in item.goodList"
                       :key=" idx">
                <van-col span="6" offset="1">{{item.goodName}}</van-col>
                <van-col span="16">× {{item.num}}</van-col>
              </van-row>
              <van-row>
                <van-col span="24"> 实付￥{{item.totalMoney}}</van-col>
              </van-row>
            </van-cell>
            <van-cell>
              <van-row>
                <!--             <van-button type="default" size="small">再来一单</van-button>-->
                <van-button type="default" size="small">再来一单</van-button>
                </van-col>
                </van-col>
              </van-row>
            </van-cell>
          </view>

        </van-tab>
        <van-tab title="待评价">
          <view v-for="(item, idx) in orderList"
                :key="idx">
            <van-cell
              value="待评价" value-class="cell-value">
              <view slot="icon">
                <van-image
                  width="30px"
                  height="30px"
                  fit="contain"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </view>
              <div slot="title" class="cell-title ">
                桂工屏风食堂一楼
              </div>
            </van-cell>
            <van-cell>
              <van-row v-for="(item, _id) in item.goodList"
                       :key=" idx">
                <van-col span="6" offset="1">{{item.goodName}}</van-col>
                <van-col span="16">× {{item.num}}</van-col>
              </van-row>
              <van-row>
                <van-col span="24"> 实付￥{{item.totalMoney}}</van-col>
              </van-row>
            </van-cell>
            <van-cell>
              <van-row>
                <!--             <van-button type="default" size="small">再来一单</van-button>-->
                <van-button type="default" size="small" @click="goComment(item._id)">去评价</van-button>
                </van-col>
                </van-col>
              </van-row>
            </van-cell>
          </view>
        </van-tab>
        <van-tab title="退款">内容 2</van-tab>
      </van-tabs>
    </div>


  </div>
</template>

<script>
  export default {
    computed: {},
    onLoad () {
      this.getOrderList()
    },
    data () {
      return {
        title: '标题',
        desc: '描述信息',
        status: '状态',
        selectedCategory: '全部',
        orderList: [],
        goodList: [],
        orderList2: [],
      }
    },
    methods: {
      onChange (event) {
        console.log(event.mp.detail.title)
        this.selectedCategory = event.mp.detail.title
        //      wx.showToast({
        //   title: `点击标签 ${event.detail.title}`,
        //   icon: 'none',
        // });
      },
      //去评价
      goComment (id) {
        console.log(id)
        wx.redirectTo({
          url: `/pages/comment/main?id=${id}`
        })
      },
      //     获取列表
      getOrderList () {
        const that = this
        const db = wx.cloud.database()
        const order = db.collection('order')
        if (that.selectedCategory === '全部') {
          order.get().then(res => {
            console.log(res)
            that.orderList = []
            that.orderList = that.orderList.concat(res.data)
          })
            .catch(err => {
              console.log(err)
            })
        } else if (that.selectedCategory !== '全部' && that.selectedCategory !== '') {
          order.where({
            category: that.selectedCategory,
          })
            .get().then(res => {
            console.log(res)
            that.orderList = []
            that.orderList = that.orderList.concat(res.data)

          })
            .catch(err => {
              console.log(err)
            })
        }
      },
    },

  }
</script>

<style>
  .cell-value {
    color: #ff2026 !important;
  }

  .cell-title {
    justify-content: center;
    align-items: center;
  }

  .D {
    float: left;
    font-size: 18px;
    color: #444;
    line-height: 38px;
  }

  .A {
    float: left;
  }

  .name {
    color: #565656;
    font-size: 16px;
    line-height: 50px;
  }

</style>
