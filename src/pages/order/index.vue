<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view
        class="title"
        v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }"
      >
        <view v-if="pageKey === 'make'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage"><i class="iconfont icon-back"></i></button>
            <view class="title-text">确认支付</view>
          </view>
        </view>
        <view v-if="pageKey === 'live'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage"><i class="iconfont icon-back"></i></button>
            <view class="title-text">订单等待送达</view>
          </view>
        </view>
        <view v-if="pageKey === 'over'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage"><i class="iconfont icon-back"></i></button>
            <view class="title-text">订单完结</view>
          </view>
        </view>
      </view>
    </view>
    <view class="main" ref="mainDiv">
      <make-order v-if="pageKey === 'make'" />
      <live-order v-if="pageKey === 'live'" />
      <over-order v-if="pageKey === 'over'" />
    </view>
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
    // 请允许我最后操作一次DOM
    this.setHeaderSize();
    var that = this;
    document
      .getElementsByClassName("main")[0]
      .addEventListener("scroll", () => {
        var t = document.getElementsByClassName("main")[0].scrollTop;
        that.scrollEventList.forEach(function(event) {
          event(t);
        });
      });
    // this.postUserInfo();
  },
  methods: {
    setHeaderSize: function() {
      var header = document.getElementsByClassName("header")[0];
      var title = header.children[0];
      var width = header.width;
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