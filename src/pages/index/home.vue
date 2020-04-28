<template>
  <view style="background-color: #efefef;">
    <view
      class="container"
      style="margin: 0px; padding-left: 15px; padding-right: 15px; padding-bottom: 15px; background-color: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.2);"
    >
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
        </view>
      </view>
      <view class="layout_block" style="margin-top: 10px;">
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
    </view>
    <view
      class="container"
      style="margin: 0px; padding-top: 1px; padding-left: 15px; padding-right: 15px; padding-bottom: 15px; box-shadow: 0 1px 2px rgba(0,0,0,.2);"
    >
      <view v-for="(special, index) in specialTopFiveList" :key="index" style="margin-top: 20px">
        <view class="special_running_banner">
          <img :src="special.iconPath + '/banner.jpg'" />
        </view>
        <view
          v-for="(commodity, index) in special.goodList"
          :key="index"
          class="layout_block border"
          @tap="toListPage('activityColumn', special.id, special.name)"
          style="background-color: #fff"
        >
          <view class="layout_title">
            <view class="label">
              <img class="icon-image" :src="commodity.imagePath + '/show_in_list.jpg'" />
              <text style="margin-left: 5px;">{{ commodity.name }}</text>
            </view>
            <view class="tool">
              <text style="color: #adadad; font-size: 14px;">已购 0 份</text>
            </view>
          </view>
          <view class="content">
            <view class="banner_multi">
              <view class="banners">
                <view class="card" v-for="(item, index) in 3" :key="index">
                  <img :src="commodity.imagePath + '/show_in_banner_' + (index + 1) + '.jpg'" alt />
                </view>
              </view>
            </view>
            <view class="action">
              <view class="price grow-full">
                ￥{{ commodity.price.toFixed(2).split('.')[0] }}
                <text class="decimal">.{{ commodity.price.toFixed(2).split('.')[1] }}</text>
                <text class="unit">{{ commodity.unit }}</text>
              </view>
              <view v-if="!shoppingCartRecord(commodity).number">
                <button class="push-cart-btn" @tap="pushToShoppingCart(commodity.id)">
                  <text class="iconfont icon-trolley"></text>
                </button>
              </view>
              <view style="display: flex;" v-else>
                <text
                  class="inline-action-bage iconfont icon-minus"
                  @tap="updateCommodityCount(shoppingCartRecord(commodity).id, commodity.id, shoppingCartRecord(commodity).number-1)"
                ></text>
                <text class="inline-bage">{{shoppingCartRecord(commodity).number}}</text>
                <text
                  class="inline-action-bage iconfont icon-plus"
                  style="background-color: #f00;"
                  @tap="updateCommodityCount(shoppingCartRecord(commodity).id, commodity.id, shoppingCartRecord(commodity).number+1)"
                ></text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="page-bottom">
        <view class="divide-line">
          <view class="line"></view>
          <view class="label">
            <text style="padding: 0px 15px; background-color: #efefef;">我也是有底线的</text>
          </view>
        </view>
      </view>
      <index-shopping-cart />
    </view>
  </view>
</template>

<script>
import searchInput from "../../components/searchInput";
import IndexShoppingCart from "../../components/indexShoppingCart";
import store from "@/store/index";
import {
  apiGetBannerList,
  apiGetTypeList,
  apiGetSpecialTopFiveList,
  apiPushCommodityToShoppingCart,
  apiUpdateCommondityCountInShoppingCart
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
  computed: {
    shoppingCartRecord() {
      return commodity => {
        if (
          store.state.shoppingCartInfo &&
          store.state.shoppingCartInfo.records
        ) {
          return (
            store.state.shoppingCartInfo.records.find(
              record => parseInt(record.goodsId) === parseInt(commodity.id)
            ) || {}
          );
        } else {
          return {};
        }
      };
    }
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
    },
    pushToShoppingCart(id) {
      apiPushCommodityToShoppingCart(id, 1).then(() => {
        this.$refs["indexShoppingCart"].refresh();
      });
    },
    updateCommodityCount(shopId, commodityId, count) {
      apiUpdateCommondityCountInShoppingCart(shopId, commodityId, count).then();
    }
  }
};
</script>

<style scoped>
.swiper {
  height: 225px;
}
</style>
