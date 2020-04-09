import Vue from 'vue'
import App from './App'

import i18n from './language'

import './static/css/font.css'
import './static/css/style.css'
import './static/iconfont/iconfont.css';
import './static/iconfont/iconfont.js';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  i18n
})
app.$mount()
