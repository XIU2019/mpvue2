<template>
  <view>
<!--    测试-->
<!--    <van-cell-group>-->
<!--      <van-field-->
<!--        v-bind:value="content "-->
<!--        placeholder="请写一些评价吧"-->
<!--        @change="onContentChange($event)"-->
<!--      />-->

<!--    </van-cell-group>-->
    <!--    菜品名  价格    -->
    <van-cell-group>
      <van-field
        v-bind:value="goodName"
        label="菜品名"
        placeholder="请输入菜品名"
        input-align="left"
        @change="onGoodChange($event)"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-bind:value="price"
        label="价格"
        placeholder="请输入价格"
        input-align="left"
        @change="onPriceChange($event)"
      />
    </van-cell-group>
    <!--    库存-->
    <van-cell-group>
      <van-field
        v-bind:value="stock"
        label="库存"
        placeholder="请输入库存"
        input-align="left"
        @change="onStockChange($event)"
      />
    </van-cell-group>
    <!--    菜品描述-->
    <van-cell-group>
      <van-field
        v-bind:value="description"
        label="描述"
        type="textarea"
        placeholder="请输入菜品描述"
        autosize
        v-bind:border="false"
         @change="onDescriptionChange($event)"
      />
    </van-cell-group>
    <!--      菜品类别-->
<!--    <van-radio-group :value="category" @change="onCategoryChange($event)">-->
<!--      <van-cell-group>-->
<!--        <van-cell-->
<!--        <van-row>-->
<!--          <van-col span="4">类别：</van-col>-->
<!--          <van-col span="6">-->
<!--            <van-radio name="早餐" checked-color="#07c160">早餐</van-radio>-->
<!--          </van-col>-->
<!--          <van-col span="6">-->
<!--            <van-radio name="午餐" checked-color="#07c160">午餐</van-radio>-->
<!--          </van-col>-->
<!--          <van-col span="6">-->
<!--            <van-radio name="晚餐" checked-color="#07c160">晚餐</van-radio>-->
<!--          </van-col>-->
<!--        </van-row>-->
<!--        </van-cell>-->
<!--      </van-cell-group>-->
<!--    </van-radio-group>-->

<van-radio-group v-bind:value="category" @change="onCategoryChange($event)">
  <van-cell-group>
    <van-cell title="类别">
<!--      clickable-->
<!--      data-name="1"-->
<!--      bind:click="onClick"-->

<!--        <van-radio name="早餐">早餐</van-radio>-->
      <van-row >
          <van-col span="8">
            <van-radio name="早餐" checked-color="#07c160" >早餐</van-radio>
          </van-col>
          <van-col span="8">
            <van-radio name="午餐" checked-color="#07c160">午餐</van-radio>
          </van-col>
          <van-col span="8">
            <van-radio name="晚餐" checked-color="#07c160">晚餐</van-radio>
          </van-col>
        </van-row>

    </van-cell>
  </van-cell-group>
</van-radio-group>
<!--    评分-->
    <van-rate v-bind:value="score" @change="onScoreChange($event)"/>
    <van-button type="warning" @click="uploadImg">上传图片</van-button>
<!--    上传图片-->
    <view>
      <block v-for="(item, idx) in images" :key="idx">
        <img :src="item" class="z-width-100-percent"/>
      </block>
      <block v-for="(item,idx) in images" :key="idx">
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          :src="item"
        />
      </block>
    </view>
    <view>
      <van-button type="danger" size="large" @click="submit">提交评价</van-button>
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
        images: [
          // 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
        ],
        fileIds: [],
        movieid: -1
      }
    },
    methods: {
      //添加菜品
      onGoodChange: function (event) {
        this.goodName = event.mp.detail
        console.log(' goodName:', this.goodName)
      },
      onCategoryChange (event) {
        this.category = event.mp.detail
        console.log('category:', this.category)
      },
      onPriceChange (event) {
        this.price = event.mp.detail
        console.log('price :', this.price)
      },
      onStockChange (event) {
        this.stock = event.mp.detail
        console.log('stock :', this.stock)
      },

      onDescriptionChange(event){
        this. description = event.mp.detail
        console.log(' description :', this. description)
      },
      onContentChange: function (event) {
        this.content = event.mp.detail
        console.log('content:', this.content)
      },
      onScoreChange: function (event) {
        this.score = JSON.stringify(event.mp.detail)
        console.log('score:', this.score)
      },
      submit: function () {
        const that = this
        wx.showLoading({
          title: '评价中',
        })
        // console.log(that.content)
        // console.log(that.score)
        let promiseArr = []
        for (let i = 0; i < that.images.length; i++) {
          promiseArr.push(new Promise((reslove, reject) => {
            let item = that.images[i]
            let suffix = /\.\w+$/.exec(item)[0]//正达表达式，返回文件的扩展名
            wx.cloud.uploadFile({
              cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
              filePath: item, // 小程序临时文件路径
              success: res => {
                // 返回文件 ID
                console.log(res.fileID)
                that.fileIds = that.fileIds.push(res.fileID)
                console.log(that.fileIds)
                reslove()
              },
              fail: err => {
                console.log(err)
              }
            })
          }))
          Promise.all(promiseArr).then(res => {
            //插入数据
            console.log(res)
            const db = wx.cloud.database()
            db.collection('good').add({
              data: {
                 goodName: that. goodName,
                price: that.price,
                stock: that.stock,
                 description: that.description,
                 category: that.category,
                // movieid:that.movieid,
                fileIds: that.fileIds,
              }
            }).then(res => {
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                title: '评价成功',
              })
            })
              .catch(err => {
                console.log(err)
                wx.hideLoading()
                wx.showToast({
                  title: '评价失败',
                })
              })
          })
        }
      }
      ,

      uploadImg: function () {
        const that = this
        wx.chooseImage({
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: res => {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            console.log(tempFilePaths)
            // let image = []
            that.images = that.images.concat(tempFilePaths)
            console.log(that.images)
          }
        })
      }
      ,

    },
  }
</script>
<style scoped>

</style>
