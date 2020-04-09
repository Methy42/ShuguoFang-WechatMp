<template>
  <view class="container">
    <view class="layout_block">
      <view class="layout_title">
        <i class="iconfont icon-ticket"></i>
        我的收货地址
        <view class="tool">
          <a href="javascript:;" class="more" @tap="toSettingPage('addressList')">
            <i class="iconfont icon-menu"></i>
            <span style="margin-left: 5px;">更多</span>
          </a>
        </view>
      </view>
      <view class="content">
        <view class="layout_list">
          <view class="item" @click="toInfoPage('1')">
            <view class="commodity">
              <view class="content">
                <span class="title">车厘子×4，苹果×3</span>
                <span class="message">
                  <b>总价￥29.80</b>
                  <br />2020年4月4日00点51分
                </span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff">
                <i class="icon iconfont icon-trolley"></i>
                再来一单
              </text>
            </view>
          </view>
          <view class="item" @click="toInfoPage('1')">
            <view class="commodity">
              <view class="content">
                <span class="title">车厘子×4，苹果×3</span>
                <span class="message">
                  <b>总价￥29.80</b>
                  <br />2020年4月4日00点51分
                </span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff">
                <i class="icon iconfont icon-trolley"></i>
                再来一单
              </text>
            </view>
          </view>
          <view class="item" @click="toInfoPage('1')">
            <view class="commodity">
              <view class="content">
                <span class="title">车厘子×4，苹果×3</span>
                <span class="message">
                  <b>总价￥29.80</b>
                  <br />2020年4月4日00点51分
                </span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff">
                <i class="icon iconfont icon-trolley"></i>
                再来一单
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="layout_block">
      <view class="layout_title">
        <i class="iconfont icon-ticket"></i>
        我的历史订单
        <view class="tool">
          <a href="javascript:;" class="more" @tap="toSettingPage('address')">
            <i class="iconfont icon-menu"></i>
            <span style="margin-left: 5px;">更多</span>
          </a>
        </view>
      </view>
      <view class="content">
        <view class="layout_list">
          <view class="item" @click="toInfoPage('1')">
            <view class="commodity">
              <view class="content">
                <span class="title">车厘子×4，苹果×3</span>
                <span class="message">
                  <b>总价￥29.80</b>
                  <br />2020年4月4日00点51分
                </span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff">
                <i class="icon iconfont icon-trolley"></i>
                再来一单
              </text>
            </view>
          </view>
          <view class="item" @click="toInfoPage('1')">
            <view class="commodity">
              <view class="content">
                <span class="title">车厘子×4，苹果×3</span>
                <span class="message">
                  <b>总价￥29.80</b>
                  <br />2020年4月4日00点51分
                </span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff">
                <i class="icon iconfont icon-trolley"></i>
                再来一单
              </text>
            </view>
          </view>
          <view class="item" @click="toInfoPage('1')">
            <view class="commodity">
              <view class="content">
                <span class="title">车厘子×4，苹果×3</span>
                <span class="message">
                  <b>总价￥29.80</b>
                  <br />2020年4月4日00点51分
                </span>
              </view>
            </view>
            <view class="actionbox">
              <text class="message" style="color: #4395ff">
                <i class="icon iconfont icon-trolley"></i>
                再来一单
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <index-shopping-cart />
  </view>
</template>

<script>
import IndexShoppingCart from '../../components/indexShoppingCart';
export default {
  components: {
    IndexShoppingCart
  },
  mounted() {
  },
  methods: {
    toSettingPage(type){
      uni.navigateTo({
        url: "/pages/setting/index?type=" + type
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