<template>
  <view class="shopping-cart-wrapper">
    <button @click="toShoppingCartPage('common')">
      <i class="iconfont icon-trolley"></i>
    </button>
    <view class="tag">3</view>
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
.shopping-cart-wrapper {
  position: fixed;
  bottom: 15px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-items: center;
  align-items: center;
}
.shopping-cart-wrapper button {
  width: 80px;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #efefef;
  box-shadow:0 0 5px #888;
}
.shopping-cart-wrapper button .iconfont {
  font-size: 24px;
}
.shopping-cart-wrapper .tag {
  color: #fff;
  font-size: 14px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background: #f00;
  position: absolute;
  left: 50%;
  top: 0px;
  margin-left: 20px;
  text-align: center;
}
</style>