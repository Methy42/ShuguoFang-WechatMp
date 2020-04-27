<template>
  <view class="container">
    <view class="layout_block">
      <view class="layout_title">
        <view class="label">
          <text class="iconfont icon-ticket"></text>
          <text style="margin-left: 5px;">我的收货地址</text>
        </view>
        <view class="tool">
          <a href="javascript:;" class="setting" @tap="toSettingPage('addressList')">
            <text class="icon iconfont icon-plus"></text>
            <text style="margin-left: 5px;">管理地址</text>
          </a>
        </view>
      </view>
      <view class="content">
        <view class="layout_list">
          <view class="item" v-for="(address) in addressArr" :key="address.id">
            <view class="address">
              <view class="name">
                <text>{{address.addressName}}</text>
              </view>
              <view class="detail">
                <text>{{address.addressDetail}}</text>
              </view>
              <view class="receiving">
                <text>{{ address.name }}&nbsp;-&nbsp;{{ address.telephone }}</text>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #f00" @tap="deleteConfirmPopupShow(address)">
                <text class="iconfont icon-cancel"></text>
                <text style="margin-left: 5px;">删除</text>
              </text>
              <text
                class="message"
                style="color: #4395ff; margin-left: 15px;"
                @tap="toSettingPage('addressSetting', 'edit', address.id)"
              >
                <text class="iconfont icon-setting"></text>
                <text style="margin-left: 5px;">修改</text>
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <index-shopping-cart />
    <confirm-popup ref="deleteConfirmPopup" @confirm="deleteAddress" />
  </view>
</template>

<script>
import IndexShoppingCart from "../../components/indexShoppingCart";
import ConfirmPopup from "../../components/confirmPopup";
import {
  apiGetCurrentUserAddress,
  apiDeleteCurrentUserAddress
} from "@/api/main";
export default {
  data() {
    return {
      addressArr: []
    };
  },
  components: {
    IndexShoppingCart,
    ConfirmPopup
  },
  mounted() {
    this.getMineAddress();
  },
  methods: {
    getMineAddress() {
      apiGetCurrentUserAddress(1).then(res => {
        this.addressArr = res;
      });
    },
    deleteConfirmPopupShow(address) {
      this.$refs["deleteConfirmPopup"].init({
        title: "删除",
        message: "确认删除此地址吗？",
        object: address
      });
    },
    deleteAddress(address) {
      apiDeleteCurrentUserAddress(address.id).then(res => {
        this.getMineAddress();
      });
    },
    toSettingPage(type, action, id = "") {
      uni.navigateTo({
        url:
          "/pages/setting/index?type=" +
          type +
          "&action=" +
          action +
          "&id=" +
          id
      });
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 0px;
}
</style>