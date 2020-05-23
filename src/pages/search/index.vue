<template>
  <view class="body ">
    <view class="top">
      <van-search
        :value="inputVal"
        placeholder="请输入搜索关键词"
        use-action-slot
        @change="onChange"
        @search="onSearch"
        @focus="inputFocus"
        @blur="inputBlur"
        @clear="clearInput"

      >
        <view slot="action" @tap="onClickSearchButton">搜索</view>
      </van-search>
    </view>
    <!--  当输入框中有内容，且输入框聚焦时显示 联想词列表 -->
<!--    <view v-show="inputVal.length>0">-->
<!--      联想词列表-->
<!--    </view>-->
    <!--    输入框中无内容显示-->
    <view v-show="inputVal.length<= 0 && ! inputFocused">
      <!--       历史搜索记录栏-->
      <view class="box1">
        <van-cell title="历史搜索记录栏" v-bind:border="false " use-label-slot>
          <view slot="label">
            <van-row>
              <van-col v-for="(item, idx) in searchedKeywords"
                       :key="idx"
                       span="6" @click="onClickValue(item)">{{item}}
              </van-col>
            </van-row>
          </view>
          <van-icon slot="right-icon" name="delete" class="custom-icon" @click="clearSearchedKeywords($event)"/>
        </van-cell>
      </view>
      <!--      热门搜索词栏-->
      <view class="box2">
        <van-cell title="热门搜索词栏" v-bind:border="false " use-label-slot>
          <view slot="label">
            <van-row>
              <van-col v-for="(item, idx) in hotSearchProducts"
                       :key="idx"
                       span="6" @click="onClickValue(item)">{{item}}
              </van-col>
            </van-row>
          </view>
        </van-cell>
      </view>
    </view>
    <!-- 当输入框中有内容，且输入框未聚焦时显示搜索结果栏 -->
    <view v-show=" inputVal.length>0">
      <van-card
        v-for="(item, idx) in goodList"
        :key="idx"
        v-bind:value="item._id"
        v-bind:tag="item.category"
        v-bind:price="item.price"
        v-bind:desc="item.description"
        v-bind:title="item.goodName"
        v-bind:thumb="item.fileIds"
        thumb-mode="aspectFit"
        link-type="navigateTo"
        thumb-link="/pages/products/main"
      />
    </view>

  </view>


</template>

<script>


  export default {
    computed: {},
    onLoad () {
      this.initSearchedKeyword()
    },
    data () {
      return {
        inputVal: '', //用户输入的搜索内容
        searchedKeywords: [], //搜索历史记录
        hotSearchProducts: ['早餐', '午餐'], //热搜产品关键词
        suggestKeywords: [], //搜索联想关键词
        // isNoMoreData: false, //记录是否已加载完所有分页数据
        inputFocused: false, //是否焦点在搜索输入框
        clickWord: '',//选择的历史纪录关键词
        goodList: [],//搜索到产品列表
      }
    },
    methods: {
      //点击历史记录
      onClickValue (clickWord) {
        console.log(clickWord)
        this.inputVal = clickWord
        this.getProductList()
      },
      onChange (event) {
        if (event.mp.detail) {
          this.inputVal = event.mp.detail
        }
      },
      onClick () {

      },
      //输入框聚焦，设置输入框是否聚焦的标志为 true，根据输入框中的关键词刷新联想关键词数组
      inputFocus () {
        this.inputFocused = true
      },
      //输入框失去焦点事件，设置输入框是否聚焦的标志为 false
      inputBlur () {
        this.inputFocused = false
      },
      /**
       * 清空搜索框内容按钮点击事件：清空用户输入关键词和联想关键词数组
       */
      clearInput: function () {
        this.inputVal = ''
        this.suggestKeywords = []
      },

      // 输入框键盘输入事件：记录用户输入关键词，根据输入框中的关键词刷新联想关键词数组
      onSearch: function (e) {
        if (e.mp.detail) {
          this.inputVal = e.mp.detail
          this.getProductList()
          this.addSearchedKeyword(this.inputVal)
        }

      },

      //
      // 搜索按钮点击事件：在历史搜索关键词列表中添加当前用户输入关键词，
      // 并在子部件 4 中显示商品标题包含用户输入关键词的搜索结果列表
      //
      onClickSearchButton () {
        this.getProductList()
        this.addSearchedKeyword(this.inputVal)
      },
      /**
       * 联想词列表中联想词点击事件：设置输入框内容为点击关键词，并触发搜索按钮点击事件
       * 点击历史记录的标签、点击热门搜索标签的事件响应函数同样为该方法
       */
      onClickTags: function (e) {
        this.inputVal = e.currentTarget.id
        this.onClickSearchButton()
      },
      /**
       * 根据输入框中的关键词刷新联想关键词数组
       */
      refreshSuggestWords: function () {
        //调用数据服务，从搜索联想词库获取搜索联想词

      },
      /**
       * 页面加载时读取搜索历史记录
       */
      initSearchedKeyword: function () {
        var value = wx.getStorageSync('searchedKeywords')
        if (value) {
          this.searchedKeywords = value
        }
      },
      /**
       * 在历史搜索关键词列表中添加关键词
       * 使用小程序官方提供的数据缓存 API 实现历史搜索关键词列表的读取与存储
       */
      addSearchedKeyword: function (text) {
        if (typeof (text) === 'undefined' || text.length === 0) {
          return
        }
        //从缓存读取历史搜索关键词列表
        var value = wx.getStorageSync('searchedKeywords')
        if (value) {
          //如果缓存中已经存在历史搜索关键词列表
          if (value.indexOf(text) < 0) {
            //如果历史搜索关键词列表中没有关键词，就将关键词添加到列表末尾
            value.unshift(text)
          }
        } else {
          //如果缓存中不存在历史搜索关键词列表，新建列表并添加关键词进列表
          value = []
          value.push(text)
        }
        //自取前8个数组
        value = value.slice(0, 8)
        //更新历史搜索关键词列表的显示数据

        this.searchedKeywords = value

        //将最新的历史搜索关键词列表更新到本地缓存
        wx.setStorage({
          key: 'searchedKeywords',
          data: value,
        })
      },
      /**
       * 清空按钮点击事件：在微信客户端缓存中清空历史搜索关键词列表
       */
      clearSearchedKeywords: function () {
        //清空历史搜索关键词列表的显示数据
        this.searchedKeywords = []
        //缓存中清除历史搜索关键词列表
        wx.removeStorage({
          key: 'searchedKeywords',
        })
        wx.showToast({
          title: '清除成功',
          icon: 'success',
          duration: 2000
        })
      },
      //从搜索联想词库中获取联想词
      getSuggestWords (keyword) {
        keyword = keyword.toLowerCase()
        //将用户输入的关键词与联想词库进行小写匹配，返回 8 个联想词
        // this.productData.suggestWords.filter(e => e.word.toLowerCase().indexOf(keyword) >= 0).slice(0, 8)
      },
      //  关键词搜索  获取菜品信息
      getProductList () {
        var that = this
        const db = wx.cloud.database()
        const good = db.collection('good')
        good.where({
          category: that.inputVal,
        }).get().then(res => {
          console.log(res)
          that.goodList = res.data
          // console.log('goodList:', that.goodList)
        })
          .catch(err => {
            console.log(err)
          })
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

  .body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #eeeeee;
  }

  .top {
    height: 60px;
    background: #ffffff;
    margin: 10px auto;
  }

  .box1 {
    width: 100%;
    height: 100px;
    background: #ffffff;
    margin: 10px auto;
  }

  .box2 {
    width: 100%;
    height: 100px;
    margin: 10px auto;
    background: #ffffff;
  }

  .foot {
    width: 300px;
    height: 100px;
    background: #000900;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

</style>
