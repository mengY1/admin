import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import './assets/iconfont/iconfont.css'
import '../static/utf8-php/ueditor.config.js'
import '../static/utf8-php/ueditor.all.min.js'
import '../static/utf8-php/lang/zh-cn/zh-cn.js'
import '../static/utf8-php/ueditor.parse.min.js'
import MenuUtils from '@/utils/MenuUtils'
import echarts from 'echarts'
//一般都要加个$加到vue的原型链上，方便引用
Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)


//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
let data = JSON.parse(window.sessionStorage.getItem('user'))
if (data){
  //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
  let routes = []
  MenuUtils(routes,data)
  router.addRoutes(routes)
  window.sessionStorage.removeItem('isLoadNodes')
}
router.beforeEach((route, redirect, next) => {
  let data = JSON.parse(window.sessionStorage.getItem('user'))
  if(data&&route.path === '/login'){
    //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
    //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
    //而我们在刷新之前已经把sessionStorage里的user移除了，所以上面的添加路由也不行执行
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('isLoadNodes')
    window.location.href = '/'
    return false
  }
  let user = sessionStorage.getItem('token')
  if (!user &&!data && route.path !== '/login') {
    next({ path: '/login' })
  } else {
    if (route.path) {
      next()
    } else {
      next({ path: '/nofound' })
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


