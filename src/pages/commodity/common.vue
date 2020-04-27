<template>
  <view class="container">
    <view class="layout_today">
      <view class="card banner" style="position: relative;">
        <swiper
          class="swiper"
          :indicator-dots="true"
          :autoplay="true"
          :interval="5000"
          :duration="500"
        >
          <swiper-item
            v-for="(banner, index) in bannerList"
            :key="index"
            @click="toListPage('activityColumn', 1)"
          >
            <img :src="banner.imagePath" :alt="banner.title" />
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="layout_block">
      <view
        class="layout_title"
        style="display: flex; align-items: baseline; justify-content: space-between;"
      >
        <view class="label">
          <text style="font-size: 24px; color: #f56c6c">{{detailData.price}}·{{detailData.unit}}</text>
        </view>
      </view>
      <view class="content">
        <view style="margin-bottom: 15px;">
          <text
            class="bage red"
            v-for="tag in detailData.tags"
            :key="tag.id"
            style="margin-right: 5px;"
          >{{tag.name}}</text>
        </view>
        <view>
          <markdown-view :document-text="detailData.describe"></markdown-view>
        </view>
      </view>
    </view>
    <push-shopping-cart :commodity-id="detailData.id" />
    <index-shopping-cart />
  </view>
</template>

<script>
import { apiGetCommodityDetail } from "@/api/main";
import PushShoppingCart from "../../components/pushShoppingCart";
import IndexShoppingCart from "../../components/indexShoppingCart";
import MarkdownView from "../../components/markdownView";

export default {
  components: {
    PushShoppingCart,
    IndexShoppingCart,
    MarkdownView
  },
  props: ["id"],
  data() {
    return {
      detailData: {},
      bannerList: []
    };
  },
  watch: {
    id(newValue, oldValue) {
      this.getCommodityDetail();
    }
  },
  mounted() {
    this.getCommodityDetail();
  },
  methods: {
    getCommodityDetail() {
      apiGetCommodityDetail(this.id).then(res => {
        this.detailData = res;
        this.bannerList = [];
        for (let i = 1; i < 4; i++) {
          this.bannerList.push({
            imagePath: res.imagePath + "/show_in_banner_" + i + ".jpg",
            title: res.name
          });
        }
      });
    }
  }
};
</script>

<style>
.swiper {
  height: 225px;
}
</style>