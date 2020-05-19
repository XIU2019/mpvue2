<template>
  <view class="body">
    <view class="top">
      <van-cell>
        <view slot="title">
          <view class="van-cell-text">评分
            <van-rate v-bind:value="score" @change="onChangeRate"/>
          </view>
        </view>
      </van-cell>
    </view>
    <view class="main">
      <van-field
        v-bind:value="per_cost"
        clearable
        label="人均￥"
        placeholder="请输入人均消费费用"
        @change="onChangeCost"
      />
      <van-cell-group>
        <van-field
          v-bind:value="content"
          type="textarea"
          placeholder="说说商家的亮点与不足吧（写够15字，才是好同志）"
          v-bind:autosize=" { maxHeight: 200, minHeight: 100} "
          v-bind:border="false "
          @change="onChangeComment"
        />
      </van-cell-group>
      <view>

        <van-grid column-num="3">
          <van-grid-item
            v-for="(item, idx) in images" :key="idx"
          >
            <view slot="icon">
              <img
                style="width: 60px; height: 30px;"
                v-bind:src="item"
              >
            </view>
            <view slot="text">
              <van-icon name="cross" color="red" @click="deleteImage(idx)"/>
            </view>
          </van-grid-item>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="上传图片" @click="clickPhone"/>
        </van-grid>
        <view>
        </view>
      </view>
      <view>
        <!--        <van-button type="warning" @click="submit">警告按钮</van-button>-->
      </view>
      <view class="foot">
        <text @click="submit">提交</text>
      </view>

    </view>

  </view>
</template>

<script>
  export default {
    computed: {},
    onLoad: function (e) {
      console.log(e.id)
      Object.assign(this.$data, this.$options.data())//用于重新定义data的数据
      this.orderId = e.id
    },
    onShow: function () {

    },
    onReady () {

    },
    data () {
      return {
        score: 3,
        per_cost: '',
        content: '',
        images: [],
        fileIds: [],
        orderId: '',
      }
    },
    methods: {
      onChangeRate (event) {
        // console.log(event.mp.detail)
        this.score = event.mp.detail
      },
      onChangeCost (event) {
        // console.log(event.mp.detail)
        this.per_cost = event.mp.detail
      },
      onChangeComment (event) {
        // console.log(event.mp.detail)
        this.content = event.mp.detail
      },
      clickPhone () {
        wx.chooseImage({
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: res => {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            console.log(tempFilePaths)
            this.images = this.images.concat(tempFilePaths)
          }
        })
      },
      //删除图片
      deleteImage (index) {
        console.log(index)
        this.images.splice(index, 1)
        console.log(this.images)
      },
      //  提交
      submit: function () {
        var that = this
        wx.showLoading({
          title: '评价中',
        })
        let promiseArr = []
        for (let i = 0; i < that.images.length; i++) {
          promiseArr.push(new Promise((resolve, reject) => {
              console.log(promiseArr)
              let item = that.images[i]
              let suffix = /\.\w+$/.exec(item)[0]//正达表达式，返回文件的扩展名
              wx.cloud.uploadFile({
                  cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
                  filePath: item, // 小程序临时文件路径
                  success: res => {
                    // 返回文件 ID
                    console.log(res)
                    that.fileIds = that.fileIds.concat(res.fileID)
                    resolve()
                  },
                  fail: console.error
                }
              )
            }
          ))
        }
        Promise.all(promiseArr).then(res => {
          //插入数据
          const db = wx.cloud.database()
          db.collection('comment').add({
            data: {
              score: that.score,
              content: that.content,
              per_cost: that.per_cost,
              orderId: that.orderId,
              // movieid:that.movieid,
              fileIds: that.fileIds,
            }
          }).then(res => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '评价成功',
            })
          //  修改订单的售后状态

          })
            .catch(err => {
              wx.hideLoading()
              wx.showToast({
                title: '评价失败',
              })
            })
        })

      },
    },
  }
</script>

<style>
  .body {
    margin: 0;
    padding: 0;
    background: #e9e9e9;
  }

  .top {
    height: 80px;
    background: #ffffff;
    margin: 10px auto;
  }

  .main {
    width: 100%;
    height: 200px;
    background: #ffffff;
    margin: 10px auto;
  }

  .main_img {
    margin: auto;
  }

  .butoom {
    margin: auto;
  }

  .foot {
    width: 100%;
    height: 25%;
    background: #ff4d37;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #eeeeee;
  }
</style>
