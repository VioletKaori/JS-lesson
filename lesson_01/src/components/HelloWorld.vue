<template>
  <div class="main">
    <!-- <h1>{{ msg }}</h1> -->
    <div class="hello">
      <div id="login">
        <div class="tabs">
          <div class="tab" id="tab1" @click="toggleTab('FirstComponent')">普通登录</div>
          <div class="tab" id="tab2" @click="toggleTab('SecondComponent')">二维码登录</div>
        </div>
        <first-component :is="currentTab" keep-alive></first-component>
        <!-- <div class="bottom-wrap"> -->
          <div class="bottom">
            <nav><a href="#">忘记密码？</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">注册</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">关于网易邮箱账号</a></nav>
          </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import FirstComponent from '@/components/FirstComponent.vue'
import SecondComponent from '@/components/SecondComponent.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎使用163网易邮箱',
      currentTab: 'FirstComponent'
    }
  },
  components: {
    FirstComponent,
    SecondComponent
  },
  methods: {
    toggleTab: function (tab) {
      this.currentTab = tab // tab 为当前触发标签页的组件名
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #000a9c;
}
.main {
  display: flex;
  justify-content:center;
  align-items:Center;
}
.hello {
  height: 410px;
  width: 510px;
  background-color: #3399FF;
  display: flex;
  justify-content:center;
  align-items:Center;
}
#login {
  height: 390px;
  width: 490px;
  background-color: rgb(231, 246, 248);
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  position:relative;
}
.tabs {
  height: 40px;
  width: 490px;
  text-align:left;
}
.tab {
  background-color: rgb(225, 248, 252);
  font-size: 23px;
}
.tab:hover {
  background-color: rgb(130, 215, 248);
  font-size: 23px;
}
#tab1 {
  height: 40px;
  width: 245px;
  display: inline-block;
  text-align:center;
  line-height: 40px;
}
#tab2 {
  height: 40px;
  width: 245px;
  display: inline-block;
  position: absolute;
  text-align:center;
  line-height: 40px;
}
.bottom{
  height:20px;
  position:absolute;
  bottom:0;
  left: 25%;
  margin-bottom: 10px;
}
/* .bottom-wrap{
  height:20;
  margin-left: auto;
  margin-right: auto;
  position:relative;
} */
</style>
