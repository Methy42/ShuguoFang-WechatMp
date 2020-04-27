<template>
  <view>
    <login-popup ref="loginPopup"></login-popup>
  </view>
</template>

<script>
import { apiGetCurrentUserShoppingCartCommodityList } from "@/api/main";
import store from '../../store/index';
import LoginPopup from "../../components/loginPopup";
export default {
  components: { LoginPopup },
  mounted() {
    const openId = store.state.openId;
    console.log('[login-index]', 'store.state', store.state);
    if (openId) {
      uni.redirectTo({
        url: "/pages/index/index"
      });
    } else {
      this.$refs["loginPopup"].init();
    }
  },
  methods: {
    getShoppingCartInfo(){
      apiGetCurrentUserShoppingCartCommodityList().then();
    }
  }
};
</script>

<style>
</style>