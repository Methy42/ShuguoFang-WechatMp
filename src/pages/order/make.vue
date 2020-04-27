<template>
  <view class="container" style="padding-bottom: 100px;">
    <view class="layout_block">
      <view class="layout_title">
        <view class="label">
          <text class="iconfont icon-home"></text>
          <text style="margin-left: 5px;">收货地址时间</text>
        </view>
      </view>
      <view class="content">
        <view class="layout_list">
          <view class="item">
            <view class="commodity">
              <view class="content" style="margin-top: 0;">
                <text class="title">建邺区复兴路101号A座2504</text>
                <text class="message">
                  <b>欧阳先生&nbsp;-&nbsp;18899009988</b>
                </text>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff" @tap="showaddressDrawer">
                <text class="iconfont icon-edit"></text>
                <text style="margin-left: 5px;">更换</text>
              </text>
            </view>
          </view>
          <view class="item" @click="toInfoPage('1')">
            <view class="commodity">
              <view class="content" style="margin-top: 0;">
                <text class="title">2020年4月9日11点37分</text>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff">
                <text class="iconfont icon-edit"></text>
                <text style="margin-left: 5px;">修改</text>
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="layout_block">
      <view class="layout_title">
        <view class="label">
          <text class="iconfont icon-box"></text>
          <text style="margin-left: 5px;">商品及包装</text>
        </view>
      </view>
      <view class="content">
        <view class="layout_list">
          <view class="item" @click="toCommodityPage('1')">
            <view class="commodity">
              <view class="image-wrapper">
                <img
                  :src="assetsUrl + '/static/images/fruits/05d6ff83fd1cf326.jpg'"
                  alt
                />
              </view>
              <view class="content">
                <text class="title">泰国精品车厘子</text>
                <text class="message">
                  <b>￥30.00/斤</b>
                  <br />源自泰国车厘子，酸酸甜甜非常好吃
                </text>
              </view>
            </view>
          </view>
          <view class="item" @click="toCommodityPage('1')">
            <view class="commodity">
              <view class="image-wrapper">
                <img
                  :src="assetsUrl + '/static/images/fruits/5a30f676N29e74e73.jpg'"
                  alt
                />
              </view>
              <view class="content">
                <text class="title">云南精品龙眼</text>
                <text class="message">
                  <b>￥30.00/斤</b>
                  <br />源自泰国车厘子，酸酸甜甜非常好吃
                </text>
              </view>
            </view>
          </view>
          <view class="item" @click="toCommodityPage('1')">
            <view class="commodity">
              <view class="image-wrapper">
                <img
                  :src="assetsUrl + '/static/images/fruits/5b790440N80765d11.jpg'"
                  alt
                />
              </view>
              <view class="content">
                <text class="title">比利时精品金桔</text>
                <text class="message">
                  <b>￥30.00/斤</b>
                  <br />源自泰国车厘子，酸酸甜甜非常好吃
                </text>
              </view>
            </view>
          </view>
          <view class="item" @click="toCommodityPage('1')">
            <view class="commodity">
              <view class="image-wrapper">
                <img
                  :src="assetsUrl + '/static/images/fruits/05d6ff83fd1cf326.jpg'"
                  alt
                />
              </view>
              <view class="content">
                <text class="title">包装</text>
                <text class="message">
                  <b>￥30.00</b>
                  <br />包装
                </text>
              </view>
            </view>
          </view>
          <view class="item" style="margin: 15px 0px;">
            <view class="commodity">
              <view class="content">
                <text class="title"></text>
              </view>
            </view>
            <view class="actionbox">
              <h3>
                小计：
                <text>￥50.00</text>
              </h3>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="shopping-cart-action">
      <button class="cancel-btn">取消</button>
      <button class="take-btn" @click="toMakeOrderPage">
        <text>￥50.00</text>
        <text style="margin-left: 5px;">确认支付</text>
      </button>
    </view>
    <address-drawer ref="addressDrawer" />
  </view>
</template>

<script>
import addressDrawer from "../../components/addressDrawer";
export default {
  components: {
    addressDrawer
  },
  data(){
    return {
      assetsUrl: uni.system_config.assetsUrl
    }
  },
  methods: {
    showaddressDrawer() {
      this.$refs["addressDrawer"].init("");
    }
  }
};
</script>

<style>
</style>