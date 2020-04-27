import Vue from 'vue'
import App from './App'

import i18n from './language'
import filters from './filters';
import './system.config';

import './static/css/style.css'
import './static/iconfont/iconfont.css';

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$filters = filters;

App.mpType = 'app'

const app = new Vue({
  ...App,
  i18n
})
app.$mount()
