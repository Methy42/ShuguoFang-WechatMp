<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view class="title" v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }">
        <view class="title-wrapper">
          <button class="back-btn" @click="backPage">
            <span class="iconfont icon-back"></span>
          </button>
          <view class="title-text">商品名称</view>
        </view>
      </view>
    </view>
    <scroll-view class="main" scroll-y @scroll="onMainViewScroll">
      <common-commodity v-if="pageKey === 'common'" />
    </scroll-view>
  </view>
</template>

<script>
import CommonCommodity from "./common";

export default {
  components: {
    CommonCommodity
  },
  data() {
    return {
      pageKey: "common",
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
        }else{
          _this.classObject.header = "";
        }
        if (t < 32){
          _this.styleObject.title.fontSize = font_size - (t/4);
        }else{
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