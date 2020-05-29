<template>
  <div class="userContainer">

  </div>
</template>

<script>
  export default {
    computed: {},
    onLoad () {
      this.random_No()
      this.createRandomId()
      this.random_No2()
      this.guid2()
    },
    data () {
      return {
        random_no: '',
        test: '',
      }
    },
    methods: {
      random_No: function (randomLen) {
        for (var i = 0; i < randomLen; i++) {
          this.random_no += Math.floor(Math.random() * 10)
        }
        var  time=new Date().getTime()
        this.random_no =time+ this.random_no
        console.log(time,this.random_no)
      },
      random_No2: function () {
          this.random_no = Math.random().toString().substr(2, 5)
        var now = new Date(),
          y = now.getFullYear(),
          m = now.getMonth() + 1,
          d = now.getDate()
        const hour =  now.getHours()
        const minute =  now.getMinutes()
        const second =  now.getSeconds()
        let time = y + (m < 10 ? '0' + m : m) + (d < 10 ? '0' + d : d) +hour+minute+second
        this.random_no = time + this.random_no
        console.log( this.random_no)
      },
      createRandomId () {
        this.test = (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)
        console.log(this.test)
      },
guid2() {
	/**
   * @return {string}
   */
  function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	let time1= (S4() +' '+ S4() + " " + S4()  );
  console.log(time1)
},
    },

  }
</script>

<style>

</style>
