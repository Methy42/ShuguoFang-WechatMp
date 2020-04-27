<template>
  <uni-popup ref="loginPopup" :type="'bottom'" :mask-click="false">
    <view class="popup-wrapper">
      <view class="popup-title">
        <text class="app-name">
          <text class="icon iconfont icon-shop" style="color: #37b44a"></text>蔬果坊
        </text>
        <text class="app-action">申请</text>
      </view>
      <view class="popup-message">
        <text class="login-message">获取您的昵称、头像、地区及性别</text>
      </view>
      <view class="popup-content">
        <view class="content-list">
          <view class="item">
            <text class="icon iconfont icon-check" style="color: #37b44a"></text>
            <text>微信个人信息</text>
          </view>
        </view>
      </view>
      <view class="popup-footer">
        <navigator open-type="exit" target="miniProgram" class="footer-btn">
          <button type="default">拒绝</button>
        </navigator>
        <button class="footer-btn" type="primary" open-type="getUserInfo" @tap="login">允许</button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import { apiLogin } from "../api/main";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
export default {
  components: {
    uniPopup
  },
  data() {
    return {};
  },
  methods: {
    init() {
      this.$refs["loginPopup"].open();
    },
    login() {
      apiLogin().then(result => {
        console.log('[login-popup]', 'login success', result);
        if (result) {
          this.$refs["loginPopup"].close();
          uni.redirectTo({
            url: "/pages/index/index"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-wrapper {
  height: 250px;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.popup-title {
  height: 30px;
  padding: 10px 15px;
  line-height: 30px;
}
.popup-title .app-name {
  font-size: 16px;
  font-weight: bold;
}
.popup-title .app-name .icon {
  font-size: 18px;
  margin-right: 5px;
}
.popup-title .app-action {
  font-size: 18px;
  margin-left: 10px;
}
.popup-message {
  font-weight: bold;
  padding: 10px 15px;
  padding-top: 0px;
}
.popup-content {
  padding: 10px 0px;
}
.popup-content .content-list .item {
  padding: 10px 15px;
  border-top: 1px solid #f6f6f6;
  border-bottom: 1px solid #f6f6f6;
}
.popup-content .content-list .item .icon {
  font-size: 20px;
  margin-right: 5px;
}
.popup-footer {
  padding: 15px;
  display: flex;
  justify-content: space-around;
}
.popup-footer .footer-btn {
  width: 40%;
  margin: unset;
}
</style>