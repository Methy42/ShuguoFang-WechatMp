<template>
  <view class="container">
    <view class="layout_today">
      <view class="card swiper" style="position: relative;">
        <swiper
          class="swiper"
          :indicator-dots="true"
          :autoplay="true"
          :interval="5000"
          :duration="500"
          @change="currentBannerIndexChange"
          style="height: 100vw"
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
        <span style="font-size: 24px; color: #f56c6c">￥30.00/斤</span>
      </view>
      <view class="content">
        <view style="margin-bottom: 15px;">
          <span class="bage red">特价</span>
        </view>
        <text>车厘子，音译自英语单词Cherries（即樱桃），特指产于美国、加拿大、智利等美洲国家的个大皮厚樱桃，品种属于欧洲樱桃。中国山东、辽宁、河南、湖北、四川等地已有车厘子果树的引种，形成多品种中国大樱桃，已具有相当产能规模，品味、质量与国外相当。</text>
        <img src="/static/images/fruits/7e994f565512bd2d.jpg" alt style="width: 100%;" />
        <text>适宜车厘子生长的年雨量，一般在700～1000毫米。南方有些地区在建园时应充分考虑如何解决“春旱”问题。因为在果实生长初期干旱会引起严重落果和影响果实生长发育。</text>
      </view>
    </view>
    <push-shopping-cart />
    <index-shopping-cart />
  </view>
</template>

<script>
import PushShoppingCart from '../../components/pushShoppingCart';
import IndexShoppingCart from '../../components/indexShoppingCart';

export default {
  components: {
    PushShoppingCart,
    IndexShoppingCart
  },
  data(){
    return {
      bannerList: [
        {
          imagePath: '/static/images/fruits/05d6ff83fd1cf326.jpg',
          title: "商品图片"
        },
        {
          imagePath: '/static/images/fruits/05d6ff83fd1cf326.jpg',
          title: "商品图片"
        },
        {
          imagePath: '/static/images/fruits/05d6ff83fd1cf326.jpg',
          title: "商品图片"
        }
      ]
    };
  }
};
</script>

<style>
</style>