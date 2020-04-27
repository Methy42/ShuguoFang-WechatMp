<template>
  <view class="container">
    <view class="layout_list">
      <checkbox-group @change="onCommodityCheckChange">
        <view class="item" v-for="(commodity, index) in commodityList" :key="index">
          <view class="checkbox">
            <checkbox :value="commodity.id.toString()" />
          </view>
          <view class="commodity">
            <view class="image-wrapper">
              <img :src="commodity.imagePath + '/show_in_list.jpg'" alt />
            </view>
            <view class="content">
              <text class="title">{{commodity.name}}</text>
              <text class="message">
                <b>￥{{commodity.price}}·{{commodity.unit}}</b>
                <br />
              </text>
            </view>
          </view>
          <view class="actionbox">
            <text
              class="inline-action-bage iconfont icon-minus"
              @tap="updateCommodityCount(commodity.shopId, commodity.id, commodity.count-1)"
            ></text>
            <text class="inline-bage">{{commodity.count}}</text>
            <text
              class="inline-action-bage iconfont icon-plus"
              @tap="updateCommodityCount(commodity.shopId, commodity.id, commodity.count+1)"
            ></text>
          </view>
        </view>
      </checkbox-group>
    </view>
    <view class="shopping-cart-action">
      <button class="remove-btn" @tap="removeCommodity">移出购物车</button>
      <button class="take-btn" @click="toMakeOrderPage">
        <text class="iconfont icon-pay"></text>
        <text style="margin-left: 5px;">去结算</text>
      </button>
    </view>
  </view>
</template>

<script>
import {
  apiGetCurrentUserShoppingCartCommodityList,
  apiBatchRemoveCommodityFromShoppingCart,
  apiUpdateCommondityCountInShoppingCart
} from "@/api/main";
export default {
  data() {
    return {
      page: 1,
      commodityList: [],
      selectCommodity: []
    };
  },
  mounted() {
    this.getShoppingCart();
  },
  methods: {
    onCommodityCheckChange(e) {
      let selectList = [];
      e.detail.value.forEach(checkValue => {
        selectList.push(
          this.commodityList.find(commodity => {
            return commodity.id === parseInt(checkValue);
          })
        );
      });
      this.selectCommodity = selectList;
    },
    getShoppingCart() {
      apiGetCurrentUserShoppingCartCommodityList(this.page).then(res => {
        this.commodityList = res.records;
      });
    },
    async removeCommodity() {
      let putArr = [];
      this.selectCommodity.forEach(commodity => {
        putArr.push({
          id: commodity.shopId,
          commodityId: commodity.id
        });
      });
      await apiBatchRemoveCommodityFromShoppingCart(putArr);
      this.getShoppingCart();
    },
    updateCommodityCount(shopId, commodityId, count) {
      apiUpdateCommondityCountInShoppingCart(shopId, commodityId, count).then(
        () => {
          this.getShoppingCart();
        }
      );
    },
    toMakeOrderPage() {
      uni.navigateTo({
        url: "/pages/order/index?type=make"
      });
    }
  }
};
</script>

<style>
</style>