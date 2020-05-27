<template>
  <div class="body">
    <div class="top"></div>
    <div class="main">
      <van-cell-group>
        <van-cell v-bind:title="selectedAddress" @click="showPopup">
          <van-icon slot="right-icon" name="location-o" class="custom-icon"/>
        </van-cell>

        <van-field
          v-bind:value="addressInfo[0].address"
          label="门牌号"
          placeholder="详细地址，例如1层101室"
          @change="onChangeAddress2($event)"
        />

        <van-field
          v-bind:value="addressInfo[0].userName"
          label="联系人"
          placeholder="请输入收货人姓名"
          @change="onChangeUserName"
        />
        <van-field
          v-bind:value="addressInfo[0].phone"
          label="手机号"
          placeholder="请输入联系人手机号码"
          @change="onChangePhone"
          @input="onInput"
          v-bind:error-message="message"
        />
        <van-dialog id="van-dialog"/>

      </van-cell-group>

    </div>
    <div class="foot">
      <!--   <van-button type="primary" size="large">保存地址</van-button>-->
      <text @click="addAddress">保存地址</text>
    </div>
    <!--弹出遮罩层的内容-->
    <van-popup v-bind:show="show" position="bottom"
               custom-style="height: 50%;" @close="onClose">
      <van-area
        v-bind:area-list="areaList"
        v-bind:columns-placeholder="['请选择', '请选择', '请选择']"
        title="所在区域"
        value="110101"
        @confirm="confirm($event)"
        @cancel="onCancel"
        @change="onchangeArea($event)"
      />
    </van-popup>
  </div>
</template>

<script>
  export default {
    computed: {},
    onLoad: function (e) {
      console.log(e.id)
      this.initAddressInfo()
      Object.assign(this.$data, this.$options.data())//用于重新定义data的数据
      this.selectedId = e.id

    },
    onShow: function () {
      this.initAddressInfo()
      this.selectedAddress = '收货地址' + this.addressInfo[0].addressCity

    },
    onReady () {
      this.initAddressInfo()
      this.selectedAddress = '收货地址' + '\xa0\xa0' + this.addressInfo[0].addressCity
    },
    data () {
      return {
        addressInfo: [],
        selectedId: '',
        flat: true,
        address: '',
        userName: '',
        phone: '',
        message: '',
        show: false,
        selectedAddress: '收货地址',
        areaList: {
          province_list: {
            450000: '广西壮族自治区',
          },
          city_list: {
            450100: '南宁市',
            450200: '柳州市',
            450300: '桂林市',
            450400: '梧州市',
            450500: '北海市',
            450600: '防城港市',
            450700: '钦州市',
            450800: '贵港市',
            450900: '玉林市',
            451000: '百色市',
            451100: '贺州市',
            451200: '河池市',
            451300: '来宾市',
            451400: '崇左市',
          },
          county_list: {
            450102: '兴宁区',
            450103: '青秀区',
            450105: '江南区',
            450107: '西乡塘区',
            450108: '良庆区',
            450109: '邕宁区',
            450110: '武鸣区',
            450123: '隆安县',
            450124: '马山县',
            450125: '上林县',
            450126: '宾阳县',
            450127: '横县',
            450202: '城中区',
            450203: '鱼峰区',
            450204: '柳南区',
            450205: '柳北区',
            450206: '柳江区',
            450222: '柳城县',
            450223: '鹿寨县',
            450224: '融安县',
            450225: '融水苗族自治县',
            450226: '三江侗族自治县',
            450302: '秀峰区',
            450303: '叠彩区',
            450304: '象山区',
            450305: '七星区',
            450311: '雁山区',
            450312: '临桂区',
            450321: '阳朔县',
            450323: '灵川县',
            450324: '全州县',
            450325: '兴安县',
            450326: '永福县',
            450327: '灌阳县',
            450328: '龙胜各族自治县',
            450329: '资源县',
            450330: '平乐县',
            450332: '恭城瑶族自治县',
            450381: '荔浦市',
            450403: '万秀区',
            450405: '长洲区',
            450406: '龙圩区',
            450421: '苍梧县',
            450422: '藤县',
            450423: '蒙山县',
            450481: '岑溪市',
            450502: '海城区',
            450503: '银海区',
            450512: '铁山港区',
            450521: '合浦县',
            450602: '港口区',
            450603: '防城区',
            450621: '上思县',
            450681: '东兴市',
            450702: '钦南区',
            450703: '钦北区',
            450721: '灵山县',
            450722: '浦北县',
            450802: '港北区',
            450803: '港南区',
            450804: '覃塘区',
            450821: '平南县',
            450881: '桂平市',
            450902: '玉州区',
            450903: '福绵区',
            450921: '容县',
            450922: '陆川县',
            450923: '博白县',
            450924: '兴业县',
            450981: '北流市',
            451002: '右江区',
            451021: '田阳县',
            451022: '田东县',
            451023: '平果县',
            451024: '德保县',
            451026: '那坡县',
            451027: '凌云县',
            451028: '乐业县',
            451029: '田林县',
            451030: '西林县',
            451031: '隆林各族自治县',
            451081: '靖西市',
            451102: '八步区',
            451103: '平桂区',
            451121: '昭平县',
            451122: '钟山县',
            451123: '富川瑶族自治县',
            451202: '金城江区',
            451203: '宜州区',
            451221: '南丹县',
            451222: '天峨县',
            451223: '凤山县',
            451224: '东兰县',
            451225: '罗城仫佬族自治县',
            451226: '环江毛南族自治县',
            451227: '巴马瑶族自治县',
            451228: '都安瑶族自治县',
            451229: '大化瑶族自治县',
            451302: '兴宾区',
            451321: '忻城县',
            451322: '象州县',
            451323: '武宣县',
            451324: '金秀瑶族自治县',
            451381: '合山市',
            451402: '江州区',
            451421: '扶绥县',
            451422: '宁明县',
            451423: '龙州县',
            451424: '大新县',
            451425: '天等县',
            451481: '凭祥市',
          }
        },// 地址列表
        // names: []
      }
    },
    methods: {
      //初试化
      initAddressInfo () {
        let value = wx.getStorageSync('addressInfo')
        if (value) {
          this.addressInfo = value
          console.log(value)
        } else {
          this.addressInfo = ''
        }
        this.addressInfo = this.addressInfo.filter(item => item._id === this.selectedId)
      },

      showPopup () {

        this.show = true
      },
      onClose () {
        this.show = false
      },
      confirm (event) {
        this.show = false
        this.selected = true
        let m = event.mp.detail.values
        this.addressAll = m[0].name + m[1].name + m[2].name
        console.log(this.addressAll)
        this.selectedAddress = '收货地址' + '\xa0\xa0\xa0\xa0\xa0' + m[0].name + m[1].name + m[2].name
        console.log(this.selectedAddress)
        this.addressInfo[0].addressCity = this.addressAll
      },
      onchangeArea (event) {

      },
      onCancel () {
        this.show = false
      },

      //获取门牌号
      onChangeAddress2 (event) {
        this.addressInfo[0].address = event.mp.detail
        // console.log(event.mp.detail)
      },
      //获取联系人
      onChangeUserName (event) {
        // console.log(event.mp.detail)
        this.addressInfo[0].userName = event.mp.detail
      },

      //  获取联系电话
      onChangePhone (event) {
        var that = this
        let phone = event.mp.detail
        if (!(/^1([3456789])\d{9}$/.test(phone))) {
          that.message = '手机号码格式错误'
          that.addressInfo[0].phone = ''
        } else {
          that.message = ''
          that.addressInfo[0].phone = phone
        }
      },
      //  增加地址
      addAddress () {
        var that = this
        //添加到数据库
        // const db = wx.cloud.database()
        // db.collection('address').doc(this.selectedId).update({
        //   data:{
        //       userName: that.addressInfo[0].userName,
        //   }
        // }).then(res=>{console.log(res)})
        // .catch(err=>{console.log(err)})
        //利用云函数更新
        wx.cloud.callFunction({
          name: 'addAddress',
          data: {
            _id: that.selectedId,
            addressCity: that.addressInfo[0].addressCity,
            address: that.addressInfo[0].address,
            phone: that.addressInfo[0].phone,
            userName: that.addressInfo[0].userName,
          }
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: '修改成功',
          })
          that.flat = false
          wx.navigateTo({
            url: '/pages/address/main?flat=false',
          })
        })
          .catch(err => {
            console.log(err)
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
