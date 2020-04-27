<template>
  <view class="container" style="margin-bottom: 30px;">
    <view @tap="toSearchTab">
      <search-input />
    </view>
    <view class="layout_today">
      <view class="card banner" style="position:relative;">
        <swiper
          class="swiper"
          :indicator-dots="true"
          :autoplay="true"
          :interval="5000"
          :duration="500"
          @change="currentBannerIndexChange"
        >
          <swiper-item
            v-for="(banner, index) in bannerList"
            :key="index"
            @click="toListPage('activityColumn', 1)"
          >
            <img :src="banner.imagePath" :alt="banner.title" />
          </swiper-item>
        </swiper>
        <view v-for="(banner, index) in bannerList" :key="index">
          <text v-if="currentBannerIndex === index">
            <text class="title" style="font-size: 16px;">{{ banner.title }}</text>
            <!-- <text class="message" style="font-size: 16px;">{{ banner.description }}</text> -->
          </text>
        </view>
      </view>
    </view>
    <view class="layout_block">
      <view class="layout_title">
        <view class="label">
          <text class="icon iconfont icon-menu"></text>
          <text style="margin-left: 5px;">小店分类</text>
        </view>
      </view>
      <view class="content">
        <view class="grid" v-for="(types, index) in typeList" :key="index">
          <view class="item" v-for="(type, index) in types" :key="index">
            <view
              class="index-classification-btn"
              @tap="toListPage('classification', type.id, type.name)"
            >
              <view class="icon">
                <img :src="type.iconPath + '/small.jpg'" alt />
              </view>
              <text>{{ type.name }}</text>
            </view>
          </view>
          <view class="item" v-if="index === 1">
            <view class="index-classification-btn" @tap="toListPage('activityColumn', 2, '推荐')">
              <view class="icon">
                <img
                  :src="assetsUrl + '/static/images/promote_sales_icons/recommend/small.jpg'"
                  alt
                />
              </view>
              <text>推荐</text>
            </view>
          </view>
          <view class="item" v-if="index === 1">
            <view class="index-classification-btn" @tap="toListPage('activityColumn', 3, '热门')">
              <view class="icon">
                <img
                  :src="assetsUrl + '/static/images/promote_sales_icons/popular/small.jpg'"
                  alt
                />
              </view>
              <text>热门</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-for="(special, index) in specialTopFiveList" class="layout_block" :key="index" @tap="toListPage('activityColumn', special.id, special.name)">
      <view class="layout_title">
        <view class="label">
          <img class="icon-image" :src="special.iconPath + '/title_icon.jpg'" />
          <text style="margin-left: 5px;">{{ special.name }}</text>
        </view>
      </view>
      <view class="content">
        <view class="banner_multi">
          <view class="banners">
            <view class="card" v-for="(good, index) in special.goodList" :key="index">
              <img :src="good.imagePath + '/show_in_banner_1.jpg'" alt />
              <text class="title">{{good.name}}</text>
              <text class="price">￥{{good.price}}·{{good.unit}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <index-shopping-cart />
  </view>
</template>

<script>
import searchInput from "../../components/searchInput";
import IndexShoppingCart from "../../components/indexShoppingCart";
import {
  apiGetBannerList,
  apiGetTypeList,
  apiGetSpecialTopFiveList
} from "../../api/main";
export default {
  components: { searchInput, IndexShoppingCart },
  data() {
    return {
      currentBannerIndex: 0,
      bannerList: [],
      typeList: [[], []],
      specialTopFiveList: [],
      assetsUrl: uni.system_config.assetsUrl
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const bannerList = await apiGetBannerList();
      const typeList = await apiGetTypeList();
      const specialTopFiveList = await apiGetSpecialTopFiveList();

      this.bannerList = bannerList;
      typeList.forEach((type, index) => {
        this.typeList[parseInt(index / 4)].push(type);
      });
      this.specialTopFiveList = specialTopFiveList;
    },
    currentBannerIndexChange(event) {
      this.currentBannerIndex = event.detail.current;
    },
    toListPage(type, id, name) {
      uni.navigateTo({
        url: "/pages/list/index?type=" + type + "&id=" + id + "&name=" + name
      });
    },
    toSearchTab() {
      this.$emit("on-search");
    }
  }
};
</script>

<style scoped>
.swiper {
  height: 225px;
}
</style>