<template>
  <view class="container">
    <view class="layout_list">
      <view class="item" v-for="(commodity, index) in commodityList" :key="index">
        <view class="commodity" @tap="toCommodityPage(commodity.id, commodity.name)">
          <view class="image-wrapper">
            <img :src="commodity.imagePath + '/show_in_list.jpg'" alt />
          </view>
          <view class="content">
            <text class="title">{{commodity.name}}</text>
            <text class="message">
              <b>￥{{commodity.price}}·{{commodity.unit}}</b>
              <br />
              <text
                class="bage red"
                v-for="tag in commodity.tags"
                :key="tag.id"
                style="margin-right: 5px;"
              >{{tag.name}}</text>
            </text>
          </view>
        </view>
        <view class="actionbox" v-if="!shoppingCartRecord(commodity).number">
          <button class="push-cart-btn" @tap="pushToShoppingCart(commodity.id)">
            <text class="iconfont icon-trolley"></text>
          </button>
        </view>
        <view class="actionbox" v-else>
          <text
            class="inline-action-bage iconfont icon-minus"
            @tap="updateCommodityCount(shoppingCartRecord(commodity).id, commodity.id, shoppingCartRecord(commodity).number-1)"
          ></text>
          <text class="inline-bage">{{shoppingCartRecord(commodity).number}}</text>
          <text
            class="inline-action-bage iconfont icon-plus"
            @tap="updateCommodityCount(shoppingCartRecord(commodity).id, commodity.id, shoppingCartRecord(commodity).number+1)"
          ></text>
        </view>
      </view>
    </view>
    <index-shopping-cart ref="indexShoppingCart" />
  </view>
</template>

<script>
import {
  apiSearchGoodsByType,
  apiPushCommodityToShoppingCart,
  apiUpdateCommondityCountInShoppingCart
} from "@/api/main";
import store from "@/store/index";
import IndexShoppingCart from "../../components/indexShoppingCart";

export default {
  components: { IndexShoppingCart },
  props: ["id", "searchValue"],
  data() {
    return {
      page: 1,
      commodityList: []
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
              record => record.goodsId === commodity.id
            ) || {}
          );
        } else {
          return {};
        }
      };
    }
  },
  watch: {
    id(newValue, oldValue) {
      this.getGoodList();
    },
    searchValue(newValue, oldValue) {
      this.getGoodList();
    }
  },
  mounted() {
    this.getGoodList();
  },
  methods: {
    toCommodityPage(id, name) {
      uni.navigateTo({
        url: "/pages/commodity/index?type=common&id=" + id + "&name=" + name
      });
    },
    getGoodList() {
      apiSearchGoodsByType(this.page, this.id, this.searchValue).then(res => {
        this.commodityList = res;
        console.log(this.commodityList);
      });
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

<style>
</style>