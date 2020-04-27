<template>
  <view class="app">
    <view :class="'header ' + classObject.header">
      <view
        class="title"
        v-bind:style="{ fontSize: styleObject.title.fontSize + 'px', marginTop: styleObject.title.marginTop + 'px' }"
      >
        <view v-if="pageKey === 'activityColumn'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage">
              <text class="iconfont icon-back"></text>
            </button>
            <view class="title-text">{{activityColumnName}}</view>
          </view>
          <view>
            <search-input :placeholder="'在专栏内搜索'" />
          </view>
        </view>
        <view v-if="pageKey === 'classification'">
          <view class="title-wrapper">
            <button class="back-btn" @click="backPage">
              <text class="iconfont icon-back"></text>
            </button>
            <view class="title-text">{{typeName}}</view>
          </view>
          <view>
            <search-input :placeholder="'在' + typeName + '分类内搜索'" @on-change="onTypeSearchValueChange" />
          </view>
        </view>
      </view>
    </view>
    <scroll-view class="main" scroll-y @scroll="onMainViewScroll">
      <activity-column v-if="pageKey === 'activityColumn'" :id="activityColumnId" :searchValue="activityColumnSearchValue" />
      <classification v-if="pageKey === 'classification'" :id="typeId" :searchValue="typeSearchValue" />
    </scroll-view>
  </view>
</template>

<script>
import { apiGetTypeDetail } from "@/api/main";
import ActivityColumn from "./activityColumn";
import Classification from "./classification";
import SearchInput from "../../components/searchInput";

export default {
  components: {
    ActivityColumn,
    Classification,
    SearchInput
  },
  data() {
    return {
      pageKey: "classification",
      typeId: "",
      typeName: "",
      typeIconPath: "",
      typeSearchValue: "",
      activityColumnId: "",
      activityColumnName: "",
      activityColumnIconPath: "",
      activityColumnSearchValue: "",
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
    if (option.type === "activityColumn") {
      this.pageKey = "activityColumn";
      this.activityColumnId = option.id;
      this.activityColumnName = option.name;
    } else if (option.type === "classification") {
      this.pageKey = "classification";
      this.typeId = option.id;
      this.typeName = option.name;
    }
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
    onTypeSearchValueChange(value){
      this.typeSearchValue = value;
      this.activityColumnSearchValue = value;
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

<style scoped>
</style>