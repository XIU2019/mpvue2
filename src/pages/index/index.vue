<template>

  <view>
    <van-cell
      size="large"
      link-type="navigateTo"
      url="/pages/search/main"
    >
      <van-search
        :value="keyword"
        disabled
        input-align="center"
        placeholder="请输入搜索关键词"
      />
    </van-cell>
    <!--轮播图-->
    <scroll-view scroll-y style="height: calc(35vh - 50px);" scroll-top="0">
      <div class="ub-box ub-ver z-bg-color-fff">
        <swiper class="swiper" indicator-dots="false" autoplay="false" interval="5000" duration="500">
          <block v-for="(item, idx) in imgUrls" :key="idx">
            <swiper-item>
              <img :src="item" class="z-width-100-percent" mode="widthFix" />
            </swiper-item>
          </block>
        </swiper>
      </div>
    </scroll-view>
    <van-cell>
      <view slot="title">
        <van-row>
          <van-col span="8">
            <view class="van-cell-text">限时秒杀</view>
          </van-col>
          <van-col span="8">
            <van-count-down use-slot v-bind:time=" time " @change="onChangeTime($event)">
              <text class="item">{{ timeData.hours }}</text>
              <text class="item">{{ timeData.minutes }}</text>
              <text class="item">{{ timeData.seconds }}</text>
            </van-count-down>
          </van-col>
        </van-row>
      </view>
    </van-cell>
    <!--      使用宫格方式展示-->
    <scroll-view scroll-x="true" style="height:100%;" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
      <van-grid column-num="2" v-if="sale">
        <van-grid-item
          use-slot
          v-for="(item, idx) in  saleList[0].goodList" :key="idx"
          link-type="navigateTo"
          url="/pages/products/main"
        >
          <img
            style="width: 100%; height: 80px;"
            v-bind:src="item.fileIds"
          />
          <p class="title">{{item.goodName}}
            <van-tag color="#FF0000">{{item.discount}}</van-tag>
          </p>
          <p class="text">
            <van-icon name="star" color="yellow"/>
            {{item.score}}
            月销售量：50
          </p>
          <p>
            <text class="price"> ￥{{item.nowPrice}}</text>
            <text class='origin-price'>￥{{item.price}}</text>
          </p>
        </van-grid-item>
      </van-grid>
    </scroll-view>
    <!--附近商家-->
    <view>
      <!--      <dl class="ub-box ub-col z-margin-top-6-px z-padding-all-8-px" style="background:#fff">-->
      <p class="z-width-100-percent ub-box ub-ver" style="border-bottom:1px solid #eee">
        <span class="z-font-size-12 z-color-888 z-lineHeight-36">—附近商家—</span>
      </p>
      <!--      </dl>-->
    </view>

    <!--   常规的商品卡片  -->
    <van-card
      desc="桂林理工大学屏风校区"
      title="桂工一楼食堂"
      tag="美食"
      v-bind:thumb="imageURL"
      thumb-link="/pages/products/main"
    >
      <view slot="tags">
        <!--        <van-button size="mini">按钮</van-button>-->
        <!--        <van-button size="mini">按钮</van-button>-->
        <view class="text "> 起送￥10 配送￥1 人均￥10</view>
      </view>
      <view slot="tags">
        <van-tag plain type="danger">满20减2</van-tag>
        <van-tag plain type="danger">满30减5</van-tag>
      </view>
    </van-card>
  </view>

</template>
<script>

  export default {
    computed: {},
    onReady: function () {
      this.getGoodList()
      this.getSaleList()
    },
    onLoad () {
      this.getGoodList()
      this.getSaleList()
    },
    //测试
    // getList () {
    //   const that = this
    //   const db = wx.cloud.database()
    //   const banner = db.collection('banner')
    //   banner.get().then(res => {
    //     console.log(res.data[0].fileID)
    //   })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    //响应分类导航组件的分类点击事件

    //获取菜品信息
    // getList () {
    //   const that = this
    //   const db = wx.cloud.database()
    //   const banner = db.collection('good')
    //   banner.get().then(res => {
    //     console.log(res)
    //     that.goodList = that.goodList.concat(res.data)
    //     that.category = that.goodList.item.category
    //     console.log('goodList:', that.goodList)
    //     console.log('category:', that.category)   //打印分类
    //   })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },

    data () {
      return {
        imgUrls: [
          'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
          'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
        ],
        imageURL: 'https://img.yzcdn.cn/vant/cat.jpeg',
        images: [],
        goodList: [],
        active: 0,
        category: [],//分类数组
        selectedCategory: '全部', //当前选中的分类ID，页面加载时默认选中的全部分类
        keyword: '',
        time: 30 * 60 * 60 * 1000,
        timeData: {},
        saleList: [],
        sale: false,
      }
    },
    methods: {
      //限时打折
      onChangeTime (e) {
        this.timeData = e.mp.detail
      },

      upper (e) {
        console.log(e)
      },

      lower (e) {
        console.log(e)
      },

      scroll (e) {
        console.log(e)
      },
//       测试下载图片
//       get () {
//         wx.cloud.downloadFile({
//           fileID: 'cloud://test-a1vlk.7465-test-a1vlk-1301795243/1586400400996.png', // 文件 ID
//           success: res => {
//             // 返回临时文件路径
//             const that = this
//             console.log(res.tempFilePath)
//             that.images [0] = res.tempFilePath
//             console.log(images[0])
//           },
//           fail: console.error
//         })
//
//       },
      //响应分类导航组件的分类点击事件
      onChange (event) {
        wx.showToast({
          // title: `切换到标签 ${event.mp.detail.name}`,
          title: `切换到分类${event.mp.detail.title}`,
          icon: 'none'
        })
        //将用户点击的分类  放入selectedCategory中
        this.selectedCategory = event.mp.detail.title,
          console.log('selectedCategory:', this.selectedCategory)

      },
      //获取打折列表
      // 查询促销活动
      getSaleList () {
        const that = this
        const db = wx.cloud.database()
        const good = db.collection('sale')
        good.get().then(res => {
          console.log(res)
          that.saleList = []
          that.saleList = that.saleList.concat(res.data)
          if(that.saleList.length>0){
              that.sale=true
          }

        }).catch(err => {
          console.log(err)
        })
      },
      //     获取列表
      getGoodList () {
        const that = this
        const db = wx.cloud.database()
        const good = db.collection('good')
        if (that.selectedCategory === '全部') {
          good.get().then(res => {
            console.log(res)
            that.goodList = [],
              that.goodList = that.goodList.concat(res.data)
            // that.category = that.goodList.item.category
            console.log('goodList:', that.goodList)
            // console.log('category:', that.category)   //打印分类
          })
            .catch(err => {
              console.log(err)
            })
        } else if (that.selectedCategory !== '全部' && that.selectedCategory !== '' && that.keyword !== '') {

        } else if (that.selectedCategory !== '全部' && that.selectedCategory !== '') {
          good.where({
            category: that.selectedCategory,
          })
            .get().then(res => {
            console.log(res)
            that.goodList = [],
              that.goodList = that.goodList.concat(res.data)
            console.log('goodList:', that.goodList)
          })
            .catch(err => {
              console.log(err)
            })
        } else if (that.keyword !== '') {

        }
      },

    },
  }
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100vh;
    background: #e8e8e8;
  }

  .search {
    background: #f5f5f5;
    border-radius: 12px;
    padding: 5px 10px
  }

  .swiper {
    height: 120px;
    width: calc(100% - 16px)
  }

  .icon-item {
    width: 20%;
    padding: 10px 13px 0 13px;
    box-sizing: border-box;
  }

  .icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: #fff;
    font-size: 24px
  }

  .adv {
    border-right: 2px solid #eee
  }

  .adv img {
    width: 50px;
    height: 50px
  }

  .good {
    border-bottom: 1px solid #DDD8CE
  }

  .good img {
    width: 80px;
    height: 80px
  }

  my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

  .title {
    font-size: 15px;
    font-weight: bold;
  }

  .price {
    padding-top: 2px;
    color: #ff0000;
    font-size: 15px;
    font-weight: bold;
  }

  .origin-price {
    font-size: 15px;
    padding-top: 2px;
    line-height: 20px;
    color: #555555 !important;
    text-decoration: line-through;
  }

  .text {
    font-size: 14px;
    color: #565656;
  }


  .item {
    display: inline-block;
    width: 22px;
    margin-right: 5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #ff2026;
    border-radius: 2px;
  }

</style>
