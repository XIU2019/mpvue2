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
    <view v-show="inputVal.length>0">
      联想词列表
    </view>
    <!--    输入框中无内容显示-->
    <!--    <view class="main">-->

    <!--    </view>-->
    <view v-show="inputVal.length<= 0 || !inputFocused" >
      <!--       历史搜索记录栏-->
      <view class="box1">
        热门搜索词栏
      </view>
      <!--      热门搜索词栏-->
      <view class="box2">
        热门搜索词栏
      </view>
    </view>
    <!-- 当输入框中有内容，且输入框未聚焦时显示搜索结果栏 -->
    <view v-show="inputVal.length>0">
      搜索结果栏
    </view>

  </view>


</template>

<script>


  export default {
    computed: {

    },
    onLoad () {

    },
    data () {
      return {
        inputVal: '', //用户输入的搜索内容
        searchedKeywords: [], //搜索历史记录
        hotSearchProducts: [], //热搜产品关键词
        suggestKeywords: [], //搜索联想关键词
        // isNoMoreData: false, //记录是否已加载完所有分页数据
        inputFocused: false, //是否焦点在搜索输入框
        value: true,
      }
    },

    methods: {
      onChange (event) {
        if (event.mp.detail) {
          this.inputVal = event.mp.detail
          // console.log(this.inputVal.length)
        }
      },
      onClick () {

      },
      //输入框聚焦，设置输入框是否聚焦的标志为 true，根据输入框中的关键词刷新联想关键词数组
      inputFocus () {

      },
      //输入框失去焦点事件，设置输入框是否聚焦的标志为 false
      inputBlur () {

      },
      /**
       * 清空搜索框内容按钮点击事件：清空用户输入关键词和联想关键词数组
       */
      clearInput: function () {

      },

      // 输入框键盘输入事件：记录用户输入关键词，根据输入框中的关键词刷新联想关键词数组
      onSearch: function (e) {
        if (e.mp.detail) {
          this.inputVal = e.mp.detail
          // console.log(this.inputVal.length)
        }

      },

      //
      // 搜索按钮点击事件：在历史搜索关键词列表中添加当前用户输入关键词，
      // 并在子部件 4 中显示商品标题包含用户输入关键词的搜索结果列表
      //
      onClickSearchButton () {

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
       * 在历史搜索关键词列表中添加关键词
       * 使用小程序官方提供的数据缓存 API 实现历史搜索关键词列表的读取与存储
       */
      addSearchedKeyword: function (text) {

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
    margin: 0;
    padding: 0;
    background: #ffffff;
  }

  .top {
    height: 120px;
    background: #0207c1;
  }

  .box1{
    width: 100%;
    height: 300px;
    background: #db4ad1;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .box2{
    width: 100%;
    height: 300px;
    margin: 10px auto;
    background: #0207c1;
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
