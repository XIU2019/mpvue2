<template>
  <div>
      <van-checkbox-group v-bind:value=" result" @change=" onChangeValue($event)">
        <van-cell-group>
          <van-cell>
            <van-card
              num="2"
              tag="标签"
              price="10.00"
              desc="描述信息"
              title="商品标题"
             thumb="https://img.yzcdn.cn/vant/cat.jpeg"
            >
              <view slot="footer">
                <van-button size="mini">按钮</van-button>
                <van-button size="mini">按钮</van-button>
              </view>
            </van-card>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  .card {
    padding: 10px;
  }
</style>
