// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import 'normalize.css'
import api from '../config/api'
import Print from 'vue-print-nb'
Vue.prototype.api = api;
//为了支持jsonp
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Print)
//暂未开放的组件
import Not_opened from '@/components/Not-opened'
Vue.component('Not-opened',Not_opened);

//内控店控右侧的登陆和设置的公共组件
import logonRight from './components/common/ini'
Vue.component("logon-view",logonRight);
import store from './store.js'
import pmsStore from '@/views/pms/store.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/assets/css/style.css'
//钱管家--任务体系的公共组件
import money_ini from './components/common/money_ini'
import router from './router'
Vue.component("money-task",money_ini)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
import ElementUI from 'element-ui'
Vue.use(ElementUI);

Vue.filter('formatDateTime', function (value) {
  if (!value) return '';
  let date = new Date(value);
  let y = date.getFullYear() + '/';
  let mon = (date.getMonth() + 1) + '/';
  let d = date.getDate();
  return y + mon + d;
});
/**
 * @interceptors.request
 * @ 添加公共的请求头文件 做授权使用  这里是将所有的请求信息拦截掉，之后将最新的授权信息加到请求头里面
 */
axios.interceptors.request.use((request)=>{
  console.info('拿到的授权信息是====：'+ localStorage.getItem('authorization'));
  /**
   * undefined null '' === false
   * @type {{authorization: string}}
   */
  let str = request.url
  console.log('str',str)
  request.headers.common = {
  'authorization' : localStorage.getItem('authorization') ? localStorage.getItem('authorization') : router.push({path:'/login'}),
  };
  return request;



});
/**
 * @interceptors.response
 * @ 统一处理请求返回数据，根据返回的数据判断用户是不是已授权，如果是已授权的话，那就直接可以拿到授权信息，将最新的授权信息给到本地存储里面。
 */
axios.interceptors.response.use((response)=>{
      /**
       * message === success
       * 如果存在授权信息的话，直接将授权信息拿到
       * 如果授权失效了，那么直接返回到登陆的页面，重新登陆那最新的授权信息
       * 如果后端有接口没有返回授权信息的时候，直接给控制台打印出来提示语
       * @type {{authorization: string}}
       */
      console.log(response)
      console.log(response.data)
      if(response.data.new_authorization){
         localStorage.setItem('authorization',response.data.new_authorization);
         console.info('最后一次的授权信息====：' + response.data.new_authorization);
         return response;
      }else if (response.data.message === 'success' || response.data.msg == 'OK'){
        return response;
      }else if (response.data.status == 400 || response.status == 200){
        return response;
      }
      else if(response.data.message === 'authorization invalid'){
         router.push({path:'/login'});
      }else{
         console.error('do not get it from the back end');
      }
});
new Vue({
  router,
  store,
  pmsStore,
  el: '#app',
  render: h => h(App)//这里的 webpack只能通过render渲染 不能通过component
})
