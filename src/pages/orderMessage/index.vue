<template>
  <div class="body">
    <div class="top"></div>
    <div class="main">
      <van-cell-group>
        <van-cell title="口味备注"/>
        <van-cell>
          <van-row>
            <van-col span="6" v-for="(item,index) in tags" :key="index">
              <van-tag plain size="large" v-if="!item.selected" @click="onClick(item.id)">{{item.value}}</van-tag>
              <van-tag color="#ff4d37" v-else size="large" @click="onClick(item.id)">{{item.value}}</van-tag>
            </van-col>
          </van-row>
          </van-tab>
        </van-cell>
      </van-cell-group>
      <view>
        <van-cell-group>
          <van-field
            v-bind:value="message"
            type="textarea"
            placeholder="无接触配送，将商品挂在门口或者放前台"
            v-bind:autosize="autosize1"
            v-bind:border="false "
            @change="onChangeMessage"
          />
        </van-cell-group>
      </view>

    </div>
    <div class="foot">
      <!--   <van-button type="primary" size="large">保存地址</van-button>-->
      <text @click="AddMessage">完成</text>
    </div>

  </div>
</template>

<script>
  export default {
    computed: {},
    onLoad: function () {

    },
    onShow: function () {

    },
    onReady () {

    },
    data () {
      return {
        tags: [
          {
            id: 0,
            value: '少加辣',
            selected: false,
          },
          {
            id: 1,
            value: '不加辣',
            selected: false,
          },
          {
            id: 2,
            value: '多加辣',
            selected: false,
          },
          {
            id: 3,
            value: '不加蒜',
            selected: false,
          },
          {
            id: 4,
            value: '不吃葱',
            selected: false,
          },
          {
            id: 5,
            value: '不加香菜',
            selected: false,
          },

        ],
        value: [],
        autosize1:{maxHeight: 200, minHeight: 100},
        message: '',
      }
    },
    methods: {

      onClick (id) {
        // console.log(id)
        const index = this.tags.findIndex(item => item.id === id)
        const selected = this.tags[index].selected
        this.tags[index].selected = !selected
        this.$set(this.tags, index, this.tags[index])
        this.value = this.value.concat(this.tags[index].value)
      },
      onChangeMessage (event) {
        // console.log(event.mp.detail)
        this.message = event.mp.detail
      },
      AddMessage () {
        let message=this.value+this.message
        console.log(message)
       wx.navigateTo({
          url: `/pages/onSubmitOder/main?message=${message}`
        })
        },
      },
    }
</script>

<style>
  .body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #eeeeee;
  }

  .top {
    height: 2%;
    background: #eeeeee;
  }

  .main {
    position: relative;
    width: 100%;
    height: 80%;
    background: #ffffff;
    margin: 0 auto;

  }

  .main_img {
    margin: auto;
  }

  .butoom {
    margin: auto;
  }

  .foot {
    width: 100%;
    height: 10%;
    background: #ff4d37;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #eeeeee;
  }
</style>
