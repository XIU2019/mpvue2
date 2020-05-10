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
              <van-tag type="danger" v-else size="large" @click="onClick(item.id)">{{item.value}}</van-tag>
            </van-col>
            <!--            <van-col span="6">-->
            <!--              <van-tag plain size="large">少加辣</van-tag>-->
            <!--            </van-col>-->
            <!--            <van-col span="6">-->
            <!--              <van-tag plain size="large">多加辣</van-tag>-->
            <!--            </van-col>-->
            <!--            <van-col span="6">-->
            <!--              <van-tag plain size="large">不加蒜</van-tag>-->
            <!--            </van-col>-->
          </van-row>
          </van-tab>
        </van-cell>
        <view>
          dfdf
        </view>
      </van-cell-group>
    </div>
    <div class="foot">
      <!--   <van-button type="primary" size="large">保存地址</van-button>-->
      <text @click="addAddress">保存地址</text>
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
            id:0,
            value: '少加辣',
            selected: false,
          },
          {
            id:1,
            value: '不加辣',
            selected: false,
          },
          {
            id:2,
            value: '多加辣',
            selected: false,
          },
          {
            id:3,
            value: '不加蒜',
            selected: false,
          },
        ],
        value:[],
      }
    },
    methods: {
      onChangeTags () {

      },
      onClick (id) {
        // console.log(id)
        const index = this.tags.findIndex(item => item.id === id)
        const selected = this.tags[index].selected
        this.tags[index].selected = !selected
        this.$set(this.tags, index, this.tags[index])
        this.value=this.value.concat(this.tags[index].value)


      }
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
