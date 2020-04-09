<template>
  <view class="container" style="padding-bottom: 100px;">
    <view class="layout_block">
      <view class="layout_title">
        <i class="iconfont icon-home"></i>
        <span style="margin-left: 5px;">收货地址设置</span>
      </view>
      <view class="content">
        <view class="layout_list">
          <view class="item">
            <view class="commodity">
              <view class="content" style="margin-top: 0;">
                <span class="title">{{address.province ? (address.province + '-' + address.city + '-' + address.district) : "请选择收货地址"}}</span>
                <span class="message">
                  <b>{{ address.detail ? address.detail : "" }}</b>
                </span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff" @tap="showaddressPopup">
                <i class="iconfont icon-edit"></i>
                <span style="margin-left: 5px;">更换</span>
              </text>
            </view>
          </view>
          <view class="item">
            <view class="commodity">
              <view class="content" style="margin-top: 0;">
                <span class="title">{{name}}</span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff" @tap="showaddressDrawer">
                <i class="iconfont icon-edit"></i>
                <span style="margin-left: 5px;">更换</span>
              </text>
            </view>
          </view>
          <view class="item">
            <view class="commodity">
              <view class="content" style="margin-top: 0;">
                <span class="title">{{telephone}}</span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff" @tap="showaddressDrawer">
                <i class="iconfont icon-edit"></i>
                <span style="margin-left: 5px;">更换</span>
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="shopping-cart-action">
      <button class="cancel-btn">取消</button>
      <button class="take-btn" @click="toMakeOrderPage">
        <i class="iconfont icon-check"></i>
        <span style="margin-left: 5px;">确定</span>
      </button>
    </view>
    <address-popup ref="addressPopup" />
  </view>
</template>

<script>
import AddressPopup from '../../components/addressPopup';
export default {
  components: {
    AddressPopup
  },
  data() {
    return {
      address: {
        province: "江苏",
        city: "南京",
        district: "建邺区",
        detail: "金穗花园1栋1703"
      },
      name: "欧阳先生",
      telephone: "18779098899"
    };
  },
  methods: {
    showaddressPopup(){
      this.$refs['addressPopup'].init(this.address);
    }
  }
};
</script>

<style>
</style>