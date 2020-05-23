<template>
  <view class="body">
    <view class="main">
       <scroll-view scroll-y="true" style="height: 100%;" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
      <van-cell-group>
        <van-field
          v-bind:value="goodName"
          label="菜品名:"
          placeholder="请输入菜品名"
          input-align="left"
          @change="onGoodChange($event)"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-bind:value="price"
          label="价格:"
          placeholder="请输入价格"
          input-align="left"
          @change="onPriceChange($event)"
        />
      </van-cell-group>
      <!--    库存-->
      <van-cell-group>
        <van-field
          v-bind:value="stock"
          label="库存:"
          placeholder="请输入库存"
          input-align="left"
          @change="onStockChange($event)"
        />
      </van-cell-group>
      <van-radio-group v-bind:value="category" @change="onCategoryChange($event)">
        <van-cell-group>
          <van-cell>
            <van-row>
              <van-col class="title">类别:</van-col>
            </van-row>
            <van-row>
              <van-col span="8">
                <van-radio name="早餐" checked-color="#FF2426">早餐</van-radio>
              </van-col>
              <van-col span="8">
                <van-radio name="午餐" checked-color="#FF2426">午餐</van-radio>
              </van-col>
              <van-col span="8">
                <van-radio name="晚餐" checked-color="#FF2426">晚餐</van-radio>
              </van-col>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!--    自评评分-->
      <van-cell>
        <view slot="title">
          <view>
            自评：
            <van-rate v-bind:value="score" @change="onScoreChange($event)"/>
          </view>

        </view>
      </van-cell>
      <!--    菜品描述-->
      <van-cell-group>
        <van-cell title="描述：" use-label-slot>
       <view slot="label">
        <van-field
          v-bind:value="description"
          type="textarea"
          placeholder="请输入菜品描述"
            v-bind:autosize=" { maxHeight: 100, minHeight: 20} "
          v-bind:border="false"
          @change="onDescriptionChange($event)"
        />
         </view>
           </van-cell>
      </van-cell-group>
      <!--    上传图片-->
         <view>

        <van-grid column-num="3">
          <van-grid-item
            v-for="(item, index) in images" :key="index"
          >
            <view slot="icon">
              <img
                style="width: 60px; height: 30px;"
                v-bind:src="item"
              >
            </view>
            <view slot="text">
              <van-icon name="cross" color="red" @click="deleteImage(index)"/>
            </view>
          </van-grid-item>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="上传图片" @click="uploadImg"/>
        </van-grid>
        <view>
        </view>
      </view>
<!--      <view>-->
<!--        <van-button type="warning" @click="uploadImg">上传图片</van-button>-->
<!--        <view>-->
<!--          <block v-for="(item, idx) in images" :key="idx">-->
<!--            <img :src="item" class="z-width-100-percent"/>-->
<!--          </block>-->
<!--          <block v-for="(item,idx) in images" :key="idx">-->
<!--            <van-image-->
<!--              width="10rem"-->
<!--              height="10rem"-->
<!--              fit="contain"-->
<!--              :src="item"-->
<!--            />-->
<!--          </block>-->
<!--        </view>-->
<!--      </view>-->
       </scroll-view>
    </view>
    <view class="foot" @click="submit">
      <van-button  size="large" color=" #ff2624" >发布</van-button>
    </view>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        goodName: '',
        price: '',
        category: ['早餐', '午餐', '晚餐'],
        description: '',
        stock: '',
        detail: [],
        content: '6',
        score: 5,
        images: [],
        fileIds: [],
      }
    },
    methods: {
         upper (e) {
        // console.log(e)
      },

      lower (e) {
        // console.log(e)
      },

      scroll (e) {
        // console.log(e)
      },
      //添加菜品
      onGoodChange: function (event) {
        this.goodName = event.mp.detail
        // console.log(' goodName:', this.goodName)
      },
      onCategoryChange (event) {
        this.category = event.mp.detail
        // console.log('category:', this.category)
      },
      onPriceChange (event) {
        this.price = event.mp.detail
        // console.log('price :', this.price)
      },
      onStockChange (event) {
        this.stock = event.mp.detail
        // console.log('stock :', this.stock)
      },
      onDescriptionChange (event) {
        this.description = event.mp.detail
        // console.log(' description :', this.description)
      },
      // onContentChange: function (event) {
      //   this.content = event.mp.detail
      //   console.log('content:', this.content)
      // },
      onScoreChange: function (event) {
        this.score = JSON.stringify(event.mp.detail)
        console.log('score:', this.score)
      },
       //提交
       submit: function () {
        var that = this
        wx.showLoading({
          title: '发布中',
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
          db.collection('good').add({
            data: {
              goodName: that.goodName,
              category: that.category,
              price : that.price ,
              stock : that.stock ,
              description:that.description,
              fileIds: that.fileIds,
              score:that.score,
            }
          }).then(res => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '发布成功',
            })
            //  修改订单的售后状态
            that.updateStatus()
            // 转到订单详情
            wx.switchTab({
              url: '/pages/oderList/main',
            })
          })
            .catch(err => {
              wx.hideLoading()
              wx.showToast({
                title: '发布失败',
              })
            })
        })

      },
    //  上传图片
       uploadImg () {
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
  deleteImage(index){
        console.log(index)
        this.images.splice(index, 1)
        console.log(this.images)
  },
    },
  }
</script>
<style scoped>
  .title {
    color: #000900;
  }

  .body {
    height: 100%;
    width: 100%;
    background: #e9e9e9;
  }

  .main {
    height: 85%;
    width: 100%;
    background: #ffffff;
  }

  .foot {
    height: 10%;
    width: 100%;
    background: #ff2624;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
