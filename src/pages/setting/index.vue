<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view
        class="title"
        v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }"
      >
        <view v-if="pageKey === 'addressList'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage"><i class="iconfont icon-back"></i></button>
            <view class="title-text">管理我的地址</view>
          </view>
        </view>
        <view v-if="pageKey === 'addressSetting'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage"><i class="iconfont icon-back"></i></button>
            <view class="title-text">南京建邺区金穗花园1栋1703</view>
          </view>
        </view>
      </view>
    </view>
    <view class="main" ref="mainDiv">
      <address-list v-if="pageKey === 'addressList'" />
      <address-setting v-if="pageKey === 'addressSetting'" />
    </view>
  </view>
</template>

<script>
import AddressList from "./addressList";
import AddressSetting from "./addressSetting";

export default {
  components: {
    AddressList,
    AddressSetting
  },
  data() {
    return {
      pageKey: "address",
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
    if (option.type === "addressList") {
      this.pageKey = "addressList";
    }
    if (option.type === "addressSetting") {
      this.pageKey = "addressSetting";
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