<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view class="title" v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }">
        <view v-if="activeTab === 'home'">
          <view class="title-wrapper">
            <img src="/static/images/system/logo.png" />
          </view>
        </view>
        <view v-if="activeTab === 'search'">
          <view class="title-wrapper">
            <view class="title-text">搜索</view>
          </view>
          <view>
            <search-input :placeholder="'搜你想要的'" />
          </view>
        </view>
        <view v-if="activeTab === 'HistoryOrder'">
          <view class="title-wrapper">
            <view class="title-text">历史订单</view>
          </view>
          <view>
            <search-input :placeholder="'在历史订单中搜索'" />
          </view>
        </view>
        <view v-if="activeTab === 'mine'">
          <view class="mine-title" :style="{ lineHeight: styleObject.title.marginTop > 15 ? (styleObject.title.marginTop + 25) + 'px' : '40px' }">
            <img
              src="/static/images/avatar/8f692bb4852376870f88d2f561ff6fe7.png"
              v-bind:style="{ height: styleObject.title.marginTop > 15 ? (styleObject.title.marginTop + 25) + 'px' : '40px' }"
            />
            <text>METHY</text>
          </view>
        </view>
      </view>
    </view>
    <view class="main" ref="mainDiv">
      <home v-if="activeTab === 'home'" />
      <search v-if="activeTab === 'search'" />
      <history-order v-if="activeTab === 'HistoryOrder'" />
      <mine v-if="activeTab === 'mine'" />
    </view>
    <view class="footer">
      <view :class="'tab ' + (activeTab === 'home' ? 'active' : '')">
        <view @click="setActiveTab('home')">
          <i class="icon iconfont icon-shop"></i>
        </view>
      </view>
      <view :class="'tab ' + (activeTab === 'search' ? 'active' : '')">
        <view @click="setActiveTab('search')">
          <i class="icon iconfont icon-search"></i>
        </view>
      </view>
      <view :class="'tab ' + (activeTab === 'HistoryOrder' ? 'active' : '')">
        <view @click="setActiveTab('HistoryOrder')">
          <i class="icon iconfont icon-ticket"></i>
        </view>
      </view>
      <view :class="'tab ' + (activeTab === 'mine' ? 'active' : '')">
        <view @click="setActiveTab('mine')">
          <i class="icon iconfont icon-people"></i>
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
    this.postUserInfo();
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
    postUserInfo() {
      uni.request({
        url: "http://uat.ziyun-cloud.net:50007/guoshufang/user/register",
        method: "POST",
        data: {
          errMsg: "getUserInfo:ok",
          rawData:
            '{"nickName":"METHY","gender":1,"language":"zh_CN","city":"","province":"","country":"Lithuania","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo9U0sL5Mtk3NhN72bAxVgSKEwbliaDslJfIG0zuicxFYzBK8PPIDcvGCBkPjI7HNzebsWXAHicCpFbg/132"}',
          userInfo: {
            nickName: "METHY",
            gender: 1,
            language: "zh_CN",
            city: "",
            province: "",
            country: "Lithuania",
            avatarUrl:
              "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo9U0sL5Mtk3NhN72bAxVgSKEwbliaDslJfIG0zuicxFYzBK8PPIDcvGCBkPjI7HNzebsWXAHicCpFbg/132"
          },
          signature: "126f9dec9650e91411dafd7c4a7687bd51682020",
          encryptedData:
            "WalMQMN/9QfFaZKFGo8arqCh4fWVmpdR7YHfWkQ6vbLGa2+T/RM1YmmSq2aBmScs29ohaAwK4Jr9ggjQZaor/JA5WjPvNB7DgWCatkjTS06cpvDdu5bPQkbzv/cwABW7IIDmZwmf8VxqUEfUxJonjN4zOKmNXI04bZ71uzWZxQ1dZC8XGD/X546nUk/BS7b3Gw06EZz+34Cq6SY0OBaQ5TxAa/rdBsT99NMFeSul3oqTdVLmRIMrQhlkEtNYr/nRPhLm6XdvC5XifQ1u5y09nAdOF9EWcU0hiAcEhbhm8nzl6LQgi9tYn2+b/Hw9qFysAXpFcFpmgfaqB43Rsb8REgnciCbIzEPqWa6x3k3KKE+Xszzcl3Ey2g/+Gr5aP+syUDeAE2kEllb4qHO+lxsL5Dzdh94h0oKz2VwPSaxJx2UxvllQ+doWosIGg7fyCJWgn2g1SXFrtbqDXQUIc0+siQ==",
          iv: "LjGeRrN62X07cVVCxIZDxQ==",
          cloudID:
            "32_QxDcsyEHd3Ye7QFVIcQAh8dveTCtl7NTv_I55me00FW-yHi8fjngo-Mk_BQ",
          code: "081Mkoww0G5U5d1te9xw02Bgww0Mkowm"
        },
        success: function(res) {
          console.log(res);
        }
      });
    },
    setActiveTab(name) {
      this.activeTab = name;
    }
  }
};
</script>

<style>
</style>