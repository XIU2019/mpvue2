<template>
  <div>
      <view v-for="(item, idx) in commentList" :key="idx">
            <van-cell v-bind:value="item.commentTime" icon="user-o">
              <view slot="title">
                <view class="van-cell-text">匿名用户
                  <van-rate readonly size="10px" v-bind:value="item.score" @change="onChange"/>
                </view>
              </view>
            </van-cell>
            <van-cell>
              <van-row>
                <van-col class="text">
                  人均 ￥: {{item.per_cost}}
                </van-col>
              </van-row>
              <van-row class="text">
                <van-col>评价内容：{{item.content}}</van-col>
              </van-row>
              <van-row>
                <van-grid column-num="3">
                  <van-grid-item use-slot v-for="(item, index) in item.fileIds" :key="index">
                    <img
                      style="width:80px; height: 80px;"
                      v-bind:src="item"
                    />
                  </van-grid-item>
                </van-grid>
              </van-row>
              <van-row class="box">
                商家回复:{{item.reply}}
              </van-row>
            </van-cell>
          </view>

  </div>
</template>

<script>


  export default {
    computed: {},
    onLoad (e) {
     this.getCommentList ()
      Object.assign(this.$data, this.$options.data())
    },
    data () {
      return {
        commentList: [],//评价列表
      }
    },
    methods: {
      getCommentList () {
        const that = this
        const db = wx.cloud.database()
        const comment = db.collection('comment')
        comment.get().then(res => {
          console.log(res)
          that.commentList = []
          that.commentList = that.commentList.concat(res.data)
          that.commentImages = that.commentList.fileIds
        })
          .catch(err => {
            console.log(err)
          })
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

  .text {
    font-size: 16px;
    line-height: 22px;
  }

  .box {
    float: left;
    height: auto;
    width: 100%;
    font-size: 15px;
    background: #f1f1f1;
    display: flex;
    flex-direction: row;
    justify-content: left;
    color: #535353;
  }

</style>
