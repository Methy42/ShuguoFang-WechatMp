<template>
  <view class="container">
    <view class="layout_list">
    </view>
    <index-shopping-cart />
  </view>
</template>

<script>
import IndexShoppingCart from '../../components/indexShoppingCart';
export default {
  components: {
    IndexShoppingCart
  },
  mounted() {
  }
};
</script>

<style scoped>
.content {
  margin-top: 0px;
}
</style>