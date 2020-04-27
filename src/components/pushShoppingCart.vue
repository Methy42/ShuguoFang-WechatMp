<template>
    <view class="shopping-cart-action center">
      <button class="push-btn" @click="pushToShoppingCart()">加入购物车</button>
    </view>
</template>

<script>
import { apiPushCommodityToShoppingCart } from '@/api/main';
export default {
  props: ['commodityId'],
  methods: {
    toShoppingCartPage(type) {
      uni.navigateTo({
        url: "/pages/shoppingCart/index?type=" + type
      });
    },
    pushToShoppingCart(){
      let id = this.commodityId;
      apiPushCommodityToShoppingCart(id, 1).then(() =>{
        this.$refs['indexShoppingCart'].refresh();
      });
    }
  }
};
</script>

<style scoped>
</style>