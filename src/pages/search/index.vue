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



  </div>

</template>

<script>


export default {
  computed: {

  },

  data () {
    return {
      keyword:'',

    }
  },

  methods: {

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
    .icon-value{
     width: 100px !important;;
    height: 100px !important;
      size:100px
  }


</style>
