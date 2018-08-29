import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import ButtonCounter from '@/components/button-counter'
// import FirstComponent from '@/components/FirstComponent.vue'
// import SecondComponent from '@/components/SecondComponent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      // components: {
      //   HelloWorld, ButtonCounter
      // }
      component: HelloWorld
      // children: [
      //   {
      //     path: '/button-counter',
      //     name: 'ButtonCounter',
      //     component: ButtonCounter
      //   }
      // ]
    }
  ]
})
