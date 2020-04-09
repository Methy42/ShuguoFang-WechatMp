<template>
  <view class="container">
    <view class="layout_list">
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/05d6ff83fd1cf326.jpg" alt />
          </view>
          <view class="content">
            <span class="title">泰国精品车厘子</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/5a30f676N29e74e73.jpg" alt />
          </view>
          <view class="content">
            <span class="title">云南精品龙眼</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/5b790440N80765d11.jpg" alt />
          </view>
          <view class="content">
            <span class="title">比利时精品金桔</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/05d6ff83fd1cf326.jpg" alt />
          </view>
          <view class="content">
            <span class="title">泰国精品车厘子</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/5a30f676N29e74e73.jpg" alt />
          </view>
          <view class="content">
            <span class="title">云南精品龙眼</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/5b790440N80765d11.jpg" alt />
          </view>
          <view class="content">
            <span class="title">比利时精品金桔</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/05d6ff83fd1cf326.jpg" alt />
          </view>
          <view class="content">
            <span class="title">泰国精品车厘子</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/5a30f676N29e74e73.jpg" alt />
          </view>
          <view class="content">
            <span class="title">云南精品龙眼</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
      <view class="item" @click="toInfoPage('1')">
        <view class="checkbox">
          <checkbox />
        </view>
        <view class="commodity">
          <view class="image-wrapper">
            <img src="/static/images/fruits/5b790440N80765d11.jpg" alt />
          </view>
          <view class="content">
            <span class="title">比利时精品金桔</span>
            <span class="message">
              <b>￥30.00/斤</b>
              <br />源自泰国车厘子，酸酸甜甜非常好吃
            </span>
          </view>
        </view>
      </view>
    </view>
    <view class="shopping-cart-action">
      <button class="remove-btn">移出购物车</button>
      <button class="take-btn" @click="toMakeOrderPage">
        <i class="iconfont icon-pay"></i>
        <span style="margin-left: 5px;">去结算</span>
      </button>
    </view>
  </view>
</template>

<script>
export default {
  mounted() {
  },
  methods: {
    toMakeOrderPage(){
      uni.navigateTo({
        url: "/pages/order/index?type=make"
      });
    }
  }
};
</script>

<style>
</style>