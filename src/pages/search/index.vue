<template>
  <div>
    <van-search
      :value="keyword"
      placeholder="请输入搜索关键词"
      use-action-slot
      @change="onChange"
      @search="onSearch"
    >
      <view slot="action" @tap="onClick">搜索</view>
    </van-search>
    <van-cell
      title="单元格"
      value="内容"
      title-class="cell-title"
      value-class="cell-value"
    />
    <van-cell title="展示弹出层" is-link @click="showPopup"/>

    <van-popup
      v-bind:show="show"
      position="bottom"
      custom-style="height: 20%;"
      @close="onClose">
      gfhgfh
    </van-popup>
  <view>
    {{nowDate}}
  </view>

    </div>



</template>

<script>


  export default {

    computed: {},
onLoad(){
       var util = require('../../utils/index.js')
       this.nowDate=util.formatTime(new Date())
},
    data () {
      return {
         nowDate:'',
        keyword: '',
        show: false,
        active: 1,
        isAuth: false,
        //  测试
        mainActiveIndex: 0,
        activeId: [],
        max: 2,
        items: [{
          // 导航名称
          text: '所有城市',
          disabled: false,
          children: [
            // {
            //   text: '温州',
            //   id: 1,
            // },
            // {
            //   text: '杭州',
            //   id: 2
            // }
          ]
        }],

        //  复选框
        test: ['a', 'b', 'c'],
        result: ['a','b'],
          carts:[
            {id:1,title:'新鲜芹菜 半斤',image:'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',num:4,price:0.01,selected:true},
            {id:2,title:'素米 500g',image:'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',num:1,price:0.03,selected:true}
          ]

      }
    },

    methods: {
      showPopup () {
        this.show = true
      },

      onClose () {
        this.show = false
      },
      authorize () {
        this.isAuth = true
      },

      //  tree
      onClickNav (event) {
        console.log(event.mp.detail.index)
        this.mainActiveIndex = event.mp.detail.index
        console.log('mainActiveIndex:', this.mainActiveIndex)
      },

      onItemClick (event) {
        const clickActiveId = []
        this.clickActiveId = event.mp.detail

        const index = clickActiveId.indexOf(event.mp.detail.id)
        if (index > -1) {
          clickActiveId.splice(index, 1)
        } else {
          clickActiveId.push(event.mp.detail.id)
        }
        this.activeId = this.clickActiveId
      },

      onClick (event) {
        console.log(event.mp.detail)
      },

      OnClickTreeItemAd (event, detail = {}) {
        console.log(event.mp.detail)
        let activeId1 = []
        // const { activeId } = this.event.mp.detail;
        this.activeId1 = event.mp.detail
        const index = activeId1.indexOf(detail.id)
        if (index > -1) {
          activeId1.splice(index, 1)
        } else {
          activeId1.push(detail.id)
        }
        console.log('activeId1:', this.activeId1)
        this.activeId = this.activeId1
        console.log('activeId:', this.activeId)
      },
      //复选框
      onChange1 (event) {

        this.result = event.mp.detail

        console.log(this.result)

      },
      //数组测试set结构和map
      onClickTest () {


      },
 onChange2(event) {

      this.result=event.detail

  },

 toggle(event) {
        const {name} = event.mp.currentTarget.dataset;
        console.log(event.mp.currentTarget.dataset);

        // const box =this.$mp.page.selectComponent(`.checkboxes-${name}`)
        // box.toggle()
      },

  noop() {

  },
    },
  }
</script>

<style>
  .cell-title {
    color: pink !important;
    font-size: 20px !important;
  }

  .cell-value {
    color: green !important;
    font-size: 12px !important;
  }

  .icon-value {
    width: 100px !important;;
    height: 100px !important;
    size: 100px
  }

  .fade-leave-to {
    opacity: 0;
    transform: translate3d(0, 300px, 0);
  }

  .fade-enter {
    transform: translate3d(0, -300px, 0);
  }

  .fade-leave-active, .fade-enter-active {
    transition: .5s all ease;
  }

  .value-class {
    flex: none !important;
  }
  .van-swipe-cell__left,
.van-swipe-cell__right {
  display: inline-block;
  width: 65px;
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: #f44;
}
</style>
