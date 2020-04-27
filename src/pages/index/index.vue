<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view
        class="title"
        v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }"
      >
        <view v-if="activeTab === 'home'">
          <view class="title-wrapper">
            <img :src="assetsUrl + '/static/images/system/logo.png'" />
          </view>
        </view>
        <view v-if="activeTab === 'search'">
          <view class="title-wrapper">
            <view class="title-text">搜索</view>
          </view>
          <view>
            <search-input :placeholder="'搜你想要的'" @on-change="searchInputChange" />
          </view>
        </view>
        <view v-if="activeTab === 'HistoryOrder'">
          <view class="title-wrapper">
            <view class="title-text">历史订单</view>
          </view>
          <!-- <view>
            <search-input :placeholder="'在历史订单中搜索'" />
          </view> -->
        </view>
        <view v-if="activeTab === 'mine'">
          <view
            class="mine-title"
            :style="{ lineHeight: styleObject.title.marginTop > 15 ? (styleObject.title.marginTop + 25) + 'px' : '40px' }"
          >
            <img
              :src=" assetsUrl + '/static/images/avatar/8f692bb4852376870f88d2f561ff6fe7.png'"
              v-bind:style="{ height: styleObject.title.marginTop > 15 ? (styleObject.title.marginTop + 25) + 'px' : '40px', width: styleObject.title.marginTop > 15 ? (styleObject.title.marginTop + 25) + 'px' : '40px' }"
            />
            <text>METHY</text>
          </view>
        </view>
      </view>
    </view>
    <scroll-view class="main" scroll-y @scroll="onMainViewScroll">
      <home v-if="activeTab === 'home'" @on-search="setActiveTab('search')" />
      <search v-if="activeTab === 'search'" :search-value="searchValue" />
      <history-order v-if="activeTab === 'HistoryOrder'" />
      <mine v-if="activeTab === 'mine'" ref="minePage" />
    </scroll-view>
    <view class="footer">
      <view :class="'tab ' + (activeTab === 'home' ? 'active' : '')">
        <view class="icon-wrapper" @click="setActiveTab('home')">
          <text class="icon iconfont icon-shop"></text>
        </view>
      </view>
      <view :class="'tab ' + (activeTab === 'search' ? 'active' : '')">
        <view class="icon-wrapper" @click="setActiveTab('search')">
          <text class="icon iconfont icon-search"></text>
        </view>
      </view>
      <view :class="'tab ' + (activeTab === 'HistoryOrder' ? 'active' : '')">
        <view class="icon-wrapper" @click="setActiveTab('HistoryOrder')">
          <text class="icon iconfont icon-ticket"></text>
        </view>
      </view>
      <view :class="'tab ' + (activeTab === 'mine' ? 'active' : '')">
        <view class="icon-wrapper" @click="setActiveTab('mine')">
          <text class="icon iconfont icon-people"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Home from "./home";
import Search from "./search";
import HistoryOrder from "./historyOrder";
import Mine from "./mine";
import SearchInput from "../../components/searchInput";
export default {
  components: {
    Home,
    Search,
    HistoryOrder,
    Mine,
    SearchInput
  },
  data() {
    return {
      activeTab: "home",
      searchValue: '',
      classObject: {
        header: ""
      },
      styleObject: {
        title: {
          marginTop: 50,
          fontSize: 28
        }
      },
      scrollEventList: [],
      assetsUrl: uni.system_config.assetsUrl
    };
  },
  onPageScroll() {
    console.log("scroll");
  },
  onShow() {
    if(this.$refs['minePage']) this.$refs['minePage'].getMineAddress();
  },
  mounted() {
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
    setActiveTab(name) {
      this.activeTab = name;
    },
    searchInputChange(value){
      this.searchValue = value;
    }
  }
};
</script>

<style>
</style>