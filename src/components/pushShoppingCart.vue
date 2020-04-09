<template>
    <view class="shopping-cart-action center">
      <button class="push-btn" @click="toShoppingCartPage('common')">加入购物车</button>
    </view>
</template>

<script>
export default {
  methods: {
    toShoppingCartPage(type) {
      uni.navigateTo({
        url: "/pages/shoppingCart/index?type=" + type
      });
    }
  }
};
</script>

<style scoped>
</style>