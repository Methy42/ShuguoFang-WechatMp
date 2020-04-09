<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view
        class="title"
        v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }"
      >
        <view v-if="pageKey === 'common'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage"><i class="iconfont icon-back"></i></button>
            <view class="title-text">购物车</view>
          </view>
          <view>
            <search-input :placeholder="'在购物车内搜索'" />
          </view>
        </view>
      </view>
    </view>
    <view class="main" ref="mainDiv">
      <common v-if="pageKey === 'common'" />
    </view>
  </view>
</template>

<script>
import Common from "./common";
import SearchInput from "../../components/searchInput";

export default {
  components: {
    Common,
    SearchInput
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
  onLoad: function(option) {
    if (option.type === "common") {
      this.pageKey = "common";
    }
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

<style scoped>
</style>