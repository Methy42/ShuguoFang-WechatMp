import Vue from 'vue'
import Vuex from 'vuex'
import {openId, userInfo, shoppingCartInfo} from './defaultSetting';

Vue.use(Vuex)

const getOpenId = function () {
  try {
    return uni.getStorageSync('OPEN_ID') || "";
  } catch (e) {
    return ""
  }
}

const getUserInfo = function(){
  try {
    return JSON.parse(uni.getStorageSync("USER_INFO") || "{}");
  } catch (error) {
    return {};
  }
}

const getShoppingCartInfo = function(){
  try {
    return JSON.parse(uni.getStorageSync("SHOPPING_CART_INFO") || "{ records: [], total: 0 }");
  } catch (error) {
    return {};
  }
}

const store = new Vuex.Store({
  state: {
    // openId: getOpenId(),
    // userInfo: getUserInfo(),
    openId: openId,
    userInfo: userInfo,
    shoppingCartInfo: getShoppingCartInfo()
  },
  mutations: {
    SetOpenId(state, openId) {
      console.log('[vuex-user]', 'SetOpenId');
      state.openId = openId;
      uni.setStorage({
        key: 'OPEN_ID',
        data: openId
      });
    },
    RemoveOpenId(state) {
      console.log('[vuex-user]', 'RemoveOpenId');
      state.openId = '';
      uni.setStorage({
        key: 'OPEN_ID',
        data: ''
      });
    },
    SetUserInfo(state, userInfo) {
      console.log('[vuex-user]', 'SetUserInfo');
      state.userInfo = userInfo;
      uni.setStorage({
        key: 'USER_INFO',
        data: userInfo
      });
    },
    RemoveUserInfo(state) {
      console.log('[vuex-user]', 'RemoveUserInfo');
      state.userInfo = '';
      uni.setStorage({
        key: 'USER_INFO',
        data: ''
      });
    },
    SetShoppingCart(state, shoppingCartInfo){
      state.shoppingCartInfo = shoppingCartInfo;
      uni.setStorage({
        key: 'SHOPPING_CART_INFO',
        data: shoppingCartInfo
      });
    }
  },
})

export default store