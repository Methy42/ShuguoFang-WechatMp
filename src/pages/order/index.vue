<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view
        class="title"
        v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }"
      >
        <view v-if="pageKey === 'make'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage">
              <text class="iconfont icon-back"></text>
            </button>
            <view class="title-text">确认支付</view>
          </view>
        </view>
        <view v-if="pageKey === 'live'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage">
              <text class="iconfont icon-back"></text>
            </button>
            <view class="title-text">订单等待送达</view>
          </view>
        </view>
        <view v-if="pageKey === 'over'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage">
              <text class="iconfont icon-back"></text>
            </button>
            <view class="title-text">订单完结</view>
          </view>
        </view>
      </view>
    </view>
    <scroll-view class="main" scroll-y @scroll="onMainViewScroll">
      <make-order v-if="pageKey === 'make'" />
      <live-order v-if="pageKey === 'live'" />
      <over-order v-if="pageKey === 'over'" />
    </scroll-view>
  </view>
</template>

<script>
import MakeOrder from "./make";
import LiveOrder from "./live";
import OverOrder from "./over";

export default {
  components: {
    MakeOrder,
    LiveOrder,
    OverOrder
  },
  data() {
    return {
      pageKey: "make",
      classObject: {
        header: ""
      },
      styleObject: {
        title: {
          marginTop: 50,
          fontSize: 28
        }
      },
      scrollEventList: []
    };
  },
  mounted: function() {
    this.setHeaderSize();
  },
  methods: {
    onMainViewScroll(event) {
      var t = event.detail.scrollTop;
      this.scrollEventList.forEach(function(event) {
        event(t);
      });
    },
    setHeaderSize: function() {
      var margin_top = 50;
      var font_size = 28;
      var min_height = 50;
      var _this = this;
      function scroll(t) {
        if (t < min_height) {
          _this.styleObject.title.marginTop = margin_top - t;
        } else {
          _this.styleObject.title.marginTop = margin_top - min_height;
        }
        if (t != 0) {
          _this.classObject.header = "up";
        } else {
          _this.classObject.header = "";
        }
        if (t < 32) {
          _this.styleObject.title.fontSize = font_size - t / 4;
        } else {
          _this.styleObject.title.fontSize = font_size - 8;
        }
      }
      this.scrollEventList.push(scroll);
    },
    backPage() {
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style>
</style>