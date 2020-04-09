<template>
  <view class="container">
    <view class="layout_block">
      <view class="layout_title">
        <i class="iconfont icon-ticket"></i>
        我的收货地址
        <view class="tool">
          <a href="javascript:;" class="setting">
            <i class="iconfont icon-plus"></i>
            <span style="margin-left: 5px;">新增地址</span>
          </a>
        </view>
      </view>
      <view class="content">
        <view class="layout_list">
          <view class="item" v-for="(address) in addressArr" :key="address.id">
            <view class="commodity">
              <view class="content" style="margin-top: 0px;">
                <span class="title">{{address.address}}</span>
                <span class="message">
                  <b>{{ address.name }}&nbsp;-&nbsp;{{ address.telephone }}</b>
                </span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #f00" @tap="deleteConfirmPopupShow">
                <i class="iconfont icon-cancel"></i>
                <span style="margin-left: 5px;">删除</span>
              </text>
              <text class="message" style="color: #4395ff; margin-left: 15px;" @tap="toSettingPage('addressSetting')">
                <i class="iconfont icon-setting"></i>
                <span style="margin-left: 5px;">修改</span>
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
export default {
  components: {
    IndexShoppingCart,
    ConfirmPopup
  },
  data() {
    return {
      addressArr: [
        {
          id: "1",
          name: "欧阳先生",
          address: "江苏南京市建邺区沙州街道金穗花园1栋1703",
          telephone: "18795893760"
        },
        {
          id: "2",
          name: "黄先生",
          address: "新疆哈密市伊州区哈建小区203栋3单元202",
          telephone: "18795893760"
        },
        {
          id: "3",
          name: "欧阳先生",
          address: "江苏南京市建邺区沙州街道金穗花园1栋1703",
          telephone: "18795893760"
        },
        {
          id: "4",
          name: "黄先生",
          address: "新疆哈密市伊州区哈建小区203栋3单元202",
          telephone: "18795893760"
        },
        {
          id: "5",
          name: "欧阳先生",
          address: "江苏南京市建邺区沙州街道金穗花园1栋1703",
          telephone: "18795893760"
        },
        {
          id: "6",
          name: "黄先生",
          address: "新疆哈密市伊州区哈建小区203栋3单元202",
          telephone: "18795893760"
        },
        {
          id: "7",
          name: "欧阳先生",
          address: "江苏南京市建邺区沙州街道金穗花园1栋1703",
          telephone: "18795893760"
        },
        {
          id: "8",
          name: "黄先生",
          address: "新疆哈密市伊州区哈建小区203栋3单元202",
          telephone: "18795893760"
        }
      ]
    };
  },
  methods: {
    deleteConfirmPopupShow(address){
      this.$refs['deleteConfirmPopup'].init({
        title: "删除",
        message: "确认删除此地址吗？",
        object: address
      });
    },
    deleteAddress(address){
      console.log(address);
    },
    toSettingPage(type){
      uni.navigateTo({
        url: "/pages/setting/index?type=" + type
      });
    }
  }
};
</script>

<style>
</style>