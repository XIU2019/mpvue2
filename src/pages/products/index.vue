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
            @clickItem="onClickItem($event)"
          >
            <!--             <img src="https://img.yzcdn.cn/vant/apple-1.jpg" slot="content" />-->
            <view slot="content">
              <!--   常规的商品卡片  -->
              <van-card v-for="(item, idx) in goodList" :key="idx"
                        num="1"
                        v-bind:tag="item.category"
                        v-bind:price="item.price"
                        v-bind:desc="item.description"
                        v-bind:title="item.goodName"
                        v-bind:thumb="item.fileIds"
                        thumb-mode="aspectFit"
              >
                <view slot="tags">
                  <van-icon name="star" color="yellow"/>
                  {{item.score}}
                </view>
                <view slot="footer">
                  <van-icon name="add-o" size="large" color="red"/>
                </view>
              </van-card>
            </view>
          </van-tree-select>
        </view>
      </van-tab>

      <van-tab title="评价">
        <!--        评价布局-->
        <div>
          jhhhg

        </div>
      </van-tab>
    </van-tabs>
    <!--    商品导航-->
    <view>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon"/>
        <van-goods-action-icon icon="cart-o" text="购物车" info="5" @click="onClickIcon"/>
        <van-goods-action-button text="加入购物车" type="warning" @click="onClickButton"/>
        <van-goods-action-button text="立即购买" @click="onClickButton"/>
      </van-goods-action>
    </view>
  </div>

</template>

<script>


  import Toast from '../../../dist/wx/static/vant/toast/toast'

  export default {
    computed: {
      onReady: function () {
        this.getGoodList()
      },
    },

    data () {
      return {
        //横向导航
        active: 0,
        //竖向分类
        mainActiveIndex: 0,
        activeId: [],
        max: 2,
        items: [{
          // 导航名称
          text: '全部',
          disabled: false,// 禁用选项
          // 该导航下所有的可选项
          children: [
            //   {
            //     text: '温州',
            //     id: 1,
            //     disabled: true
            //   },
            //   {
            //     text: '杭州',
            //     id: 2
            //   }
          ]
        }, {
          text: '早餐',
          children: [
            //   {
            //   text: '东方今典',   // 名称
            //   id: 1,// id，作为匹配选中状态的标识
            // }
          ],
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
        keyword: '',
        selectedCategory: '全部', //当前选中的分类ID，页面加载时默认选中的全部分类
      }
    },
    methods: {
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
        this.selectedCategory = this.items[this.mainActiveIndex].text,
          console.log('selectedCategory:', this.selectedCategory),
          this.getGoodList()
      },
      //未改
      onClickItem (event) {
        const {activeId} = this.data

        const index = activeId.indexOf(detail.id)
        if (index > -1) {
          activeId.splice(index, 1)
        } else {
          activeId.push(detail.id)
        }

        this.setData({activeId})
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

      //  底部的商品导航
      onClickIcon () {
        Toast('点击图标')
      },

      onClickButton () {
        Toast('点击按钮')
      }
    },
  }
</script>

<style>
  .D {
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


</style>
