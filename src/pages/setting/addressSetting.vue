<template>
  <view class="container" style="padding-bottom: 100px;">
    <view class="layout_block">
      <view class="layout_title">
        <view class="label">
          <text class="iconfont icon-home"></text>
          <text style="margin-left: 5px;">收货地址设置</text>
        </view>
      </view>
      <view class="content">
        <view class="layout_list">
          <view class="item">
            <view class="label">收件人</view>
            <view class="value">
              <input type="text" placeholder="请填写收件人姓名" v-model="name" />
            </view>
          </view>
          <view class="item">
            <view class="label">收件号码</view>
            <view class="value">
              <input type="text" placeholder="请填写收件号码" v-model="telephone" />
            </view>
          </view>
          <view class="item">
            <view class="label">地址</view>
            <view class="value" @tap="selectLocalAddress">
              <text v-if="!addressName" class="placeholder">点击选择地址</text>
              <text v-else>{{addressName}}</text>
            </view>
          </view>
          <view class="item">
            <view class="label">详细地址</view>
            <view class="value">
              <textarea placeholder="越详细送货小哥越容易找到你" v-model="addressDetail"></textarea>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="shopping-cart-action">
      <button class="cancel-btn">取消</button>
      <button class="take-btn" @click="submit">
        <text class="iconfont icon-check"></text>
        <text style="margin-left: 5px;">确定</text>
      </button>
    </view>
    <address-popup ref="addressPopup" />
  </view>
</template>

<script>
import AddressPopup from "../../components/addressPopup";
import {
  apiCreateCurrentUserAddress,
  apiUpdateCurrentUserAddress
} from "@/api/main";
export default {
  components: {
    AddressPopup
  },
  props: ["address"],
  data() {
    return {
      id: "",
      latitude: null,
      longitude: null,
      addressName: "",
      addressDetail: "",
      name: "",
      telephone: ""
    };
  },
  mounted() {
    this.getLocalPosition();
    if (this.address) {
      this.id = this.address.id;
      this.latitude = this.address.latitude;
      this.longitude = this.address.longitude;
      this.addressName = this.address.addressName;
      this.addressDetail = this.address.addressDetail;
      this.name = this.address.name;
      this.telephone = this.address.telephone;
    }
  },
  watch: {
    address(newValue, oldValue) {
      this.id = newValue.id;
      this.latitude = newValue.latitude;
      this.longitude = newValue.longitude;
      this.addressName = newValue.addressName;
      this.addressDetail = newValue.addressDetail;
      this.name = newValue.name;
      this.telephone = newValue.telephone;
    }
  },
  methods: {
    getLocalPosition() {
      uni.getLocation({
        type: "wgs84",
        success: res => {
          uni.hideLoading();
          this.latitude = res.latitude;
          this.longitude = res.longitude;
          console.log(this.latitude, this.longitude);
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            title: "获取位置信息失败",
            mask: true,
            duration: 2000,
            icon: "none"
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1
            });
          }, 2000);
        }
      });
    },
    selectLocalAddress() {
      uni.chooseLocation({
        longitude: this.longitude,
        latitude: this.latitude,
        success: res => {
          this.addressName = res.address;
          this.latitude = res.latitude;
          this.longitude = res.longitude;
        }
      });
    },
    submit() {
      if (!this.id) {
        apiCreateCurrentUserAddress({
          addressName: this.addressName,
          addressDetail: this.addressDetail,
          latitude: this.latitude,
          longitude: this.longitude,
          name: this.name,
          telephone: this.telephone
        }).then(res => {
          this.$emit("on-submited");
        });
      } else {
        apiUpdateCurrentUserAddress({
          id: this.id,
          addressName: this.addressName,
          addressDetail: this.addressDetail,
          latitude: this.latitude,
          longitude: this.longitude,
          name: this.name,
          telephone: this.telephone
        }).then(res => {
          this.$emit("on-submited");
        });
      }
    }
  }
};
</script>

<style>
</style>