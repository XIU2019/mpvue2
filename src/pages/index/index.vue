<template>

  <view>
    <!--  <van-search-->
    <!--    :value=" value "-->
    <!--    shape="round"-->
    <!--    background="#015478"-->
    <!--    placeholder="请输入搜索关键词"-->
    <!--  />-->
    <!--  搜索框-->
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

    <!--      v-bind:Click="onSearch($event)"-->

    <!--    <van-search-->
    <!--  :value="keyword"-->
    <!--  placeholder="请输入搜索关键词"-->
    <!--  use-action-slot-->
    <!--&gt;-->
    <!--  <view slot="action" @tap="onClick">搜索</view>-->
    <!--</van-search>-->
    <!--      <van-button type="default" @click="get">默认按钮</van-button>-->
    <!--轮播图-->
    <scroll-view scroll-y style="height: calc(35vh - 50px);" scroll-top="0">
      <!--轮播图-->
      <div class="ub-box ub-ver z-bg-color-fff">
        <swiper class="swiper" indicator-dots="false" autoplay="false" interval="5000" duration="500">
          <block v-for="(item, idx) in imgUrls" :key="idx">
            <swiper-item>
              <img :src="item" class="z-width-100-percent" mode="widthFix"/>
            </swiper-item>
          </block>
        </swiper>
      </div>
    </scroll-view>
    <!--    分类入口-->
    <!--    <view>-->
    <!--      <van-grid :column-num="3">-->
    <!--        <van-grid-item v-for="value in 3" :key="value" icon="photo-o" text="文字"/>-->
    <!--      </van-grid>-->
    <!--    </view>-->
    <!--    索引栏-->
    <van-tabs v-bind:active="active" @change="onChange($event)">
      <van-tab title="全部"/>
      <van-tab title="早餐"/>
      <van-tab title="午餐"/>
      <van-tab title="晚餐"/>
    </van-tabs>

    <!--      使用宫格方式展示-->
    <van-grid column-num="2">
      <van-grid-item
        use-slot
        v-for="(item, idx) in goodList" :key="idx"
        link-type="navigateTo"
        url="/pages/products/main?index=${item.index}"
      >
        <img
          style="width: 100%; height: 90px;"
          v-bind:src="item.fileIds"
        />
        <p class="title">{{item.goodName}}
          <van-tag plain color="#2bb0a6">{{item.category}}</van-tag>
        </p>
        <p class="text ">
          <van-icon name="star" color="yellow"/>
          {{item.score}}
          月销售量：50
        </p>
        <p class='price'>￥{{item.price}}</p>
      </van-grid-item>
    </van-grid>

    <!--猜你喜欢，商品列表-->
    <view>
      <dl class="ub-box ub-col z-margin-top-6-px z-padding-all-8-px" style="background:#fff">
        <p class="z-width-100-percent ub-box ub-ver" style="border-bottom:1px solid #eee">
          <span class="z-font-size-12 z-color-888 z-lineHeight-36">—附近商家—</span>
        </p>
      </dl>
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
    computed: {
      onReady: function () {
        this.getGoodList()
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

    },
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
      }
    },
    methods: {
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
    font-size: 18px;
  }

  .price {
    padding-top: 2px;
    color: #e64340;
    font-size: 18px;
  }

  .text {
    font-size: 14px;
  }


</style>
