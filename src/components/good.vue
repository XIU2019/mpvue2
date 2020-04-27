<template>
 <div>
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
              <van-tag plain type="danger">{{item.score}}</van-tag>

            </view>
            <view slot="footer">
              <van-icon name="add-o" size="large" color="red"/>
            </view>
          </van-card>
  </div>
</template>
<script>
  export default {
  	props: ['curGood', 'isLast'],
  	data () {
      	return {
      	}
   	},
   	methods: {

      }
   	}
  }
</script>
<style scoped>

</style>
