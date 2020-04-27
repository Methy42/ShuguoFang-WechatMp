<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view
        class="title"
        v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }"
      >
        <view v-if="pageKey === 'addressList'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage"><text class="iconfont icon-back"></text></button>
            <view class="title-text">管理我的地址</view>
          </view>
        </view>
        <view v-if="pageKey === 'addressSetting'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage"><text class="iconfont icon-back"></text></button>
            <view class="title-text">{{settingPageTitle}}</view>
          </view>
        </view>
      </view>
    </view>
    <scroll-view class="main" scroll-y @scroll="onMainViewScroll">
      <address-list v-if="pageKey === 'addressList'" ref="addressList" />
      <address-setting v-if="pageKey === 'addressSetting'" :address="address" @on-submited="backPage" />
    </scroll-view>
  </view>
</template>

<script>
import AddressList from "./addressList";
import AddressSetting from "./addressSetting";
import { apiGetCurrentUserAddressDetail } from '@/api/main'
export default {
  components: {
    AddressList,
    AddressSetting
  },
  data() {
    return {
      pageKey: "addressList",
      address: {},
      settingPageTitle: "",
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
  onLoad(option) {
    if (option.type === "addressList") {
      this.pageKey = "addressList";
    }
    if (option.type === "addressSetting") {
      if(option.action === "create"){
        this.settingPageTitle = "新建地址";
      } else if (option.action === 'edit'){
        this.getAddressDetil(option.id);
      }
      this.pageKey = "addressSetting";
    }
  },
  onShow(){
    if(this.$refs['addressList']) this.$refs['addressList'].getMineAddress();
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
    getAddressDetil(id){
      apiGetCurrentUserAddressDetail(id).then(res => {
        this.address = res;
        this.settingPageTitle = res.addressDetail;
      });
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