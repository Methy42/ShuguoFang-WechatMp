<template>
  <view class="container" style="margin-bottom: 30px;">
    <search-input />
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
          <swiper-item v-for="(banner, index) in bannerList" :key="index" @click="toListPage('activityColumn', 1)">
            <img :src="banner.imagePath" :alt="banner.title" />
          </swiper-item>
        </swiper>
        <view v-for="(banner, index) in bannerList" :key="index">
          <span v-if="currentBannerIndex === index">
            <span class="title" style="font-size: 16px;">{{ banner.title }}</span>
            <span class="message" style="font-size: 16px;">{{ banner.description }}</span>
          </span>
        </view>
      </view>
    </view>
    <view class="layout_block">
      <view class="layout_title">
        <i class="iconfont icon-menu"></i>
        小店分类
        <!-- <view class="tool">
                <a href="javascript:;" class="more">
                    更多&nbsp;&gt;
                </a>
        </view>-->
      </view>
      <view class="content">
        <view class="grid">
          <view class="item">
            <view class="index-classification-btn" @click="toListPage('classification', 1)">
              <view class="icon">
                <img src="/static/images/icons/fruits.png" alt />
              </view>
              <text>水果</text>
            </view>
          </view>
          <view class="item">
            <view class="index-classification-btn">
              <view class="icon">
                <img src="/static/images/icons/vegetables.png" alt />
              </view>
              <text>蔬菜</text>
            </view>
          </view>
          <view class="item">
            <view class="index-classification-btn">
              <view class="icon">
                <img src="/static/images/icons/meat.png" alt />
              </view>
              <text>肉类</text>
            </view>
          </view>
          <view class="item">
            <view class="index-classification-btn">
              <view class="icon">
                <img src="/static/images/icons/condiments.png" alt />
              </view>
              <text>佐料</text>
            </view>
          </view>
        </view>
        <view class="grid">
          <view class="item">
            <view class="index-classification-btn">
              <view class="icon">
                <img src="/static/images/icons/grain&oil.png" alt />
              </view>
              <text>粮油</text>
            </view>
          </view>
          <view class="item">
            <view class="index-classification-btn">
              <view class="icon">
                <img src="/static/images/icons/snacks.png" alt />
              </view>
              <text>零食</text>
            </view>
          </view>
          <view class="item">
            <view class="index-classification-btn">
              <view class="icon">
                <img src="/static/images/icons/recommend(1).png" alt />
              </view>
              <text>推荐</text>
            </view>
          </view>
          <view class="item">
            <view class="index-classification-btn">
              <view class="icon">
                <img src="/static/images/icons/recommend.png" alt />
              </view>
              <text>热门</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="layout_block">
      <view class="layout_title">
        <i class="iconfont icon-strawberry"></i>
        鲜果特惠
        <view class="tool">
          <a href="javascript:;" class="more">更多&nbsp;&gt;</a>
        </view>
      </view>
      <view class="content">
        <view class="banner_multi">
          <view class="banners">
            <view class="card">
              <img
                src="/static/images/banners/5b918e78573b8dfb7326cc3a7bc67d4abd691edd24ba5-d898O8_fw658.jpg"
                alt
              />
              <span class="title">荷兰鲜橙...</span>
              <span class="price">￥14.80/斤</span>
            </view>
            <view class="card">
              <img
                src="/static/images/banners/62f006a776e86b1953284878f0bfa3f30f6f2b50f14ff-DFVAlT_fw658.png"
                alt
              />
              <span class="title">波兰青萍...</span>
              <span class="price">￥14.80/斤</span>
            </view>
            <view class="card">
              <img
                src="/static/images/banners/065d1b3186ee17f86dd49397690f1c4ccd4f89ff62168-Xylrjw_fw658.jpg"
                alt
              />
              <span class="title">法国冬梨...</span>
              <span class="price">￥14.80/斤</span>
            </view>
            <view class="card">
              <img
                src="/static/images/banners/1544c308816416dee65953ccde4acd4f68d0389e3c814-wpBlKf_fw658.jpg"
                alt
              />
              <span class="title">哈密葡萄...</span>
              <span class="price">￥14.80/斤</span>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="layout_block">
      <view class="layout_title">
        <i class="iconfont icon-toast"></i>
        美味鲜肉
        <view class="tool">
          <a href="javascript:;" class="more">更多&nbsp;&gt;</a>
        </view>
      </view>
      <view class="content">
        <view class="banner_multi">
          <view class="banners">
            <view class="card">
              <img
                src="/static/images/banners/1c3c94fbac86841391d617fbe714f006b9c96b43e688e-gHEB0Q_fw658.png"
                alt
              />
              <span class="title">奥冷牛排...</span>
              <span class="price">￥14.80/斤</span>
            </view>
            <view class="card">
              <img
                src="/static/images/banners/eb14dde47a6a4e9aa43641b62766b60cd999234932f5b-1yWnR6_fw658.jpg"
                alt
              />
              <span class="title">美国猪肉...</span>
              <span class="price">￥14.80/斤</span>
            </view>
            <view class="card">
              <img
                src="/static/images/banners/aae055fb733198b70c945fd02fc578dddf590b9e4cf47-RAOAEr_fw658.jpg"
                alt
              />
              <span class="title">德国嫩牛...</span>
              <span class="price">￥14.80/斤</span>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="layout_block">
      <view class="layout_title">
        <i class="iconfont icon-toast"></i>
        美味鲜肉
        <view class="tool">
          <a href="javascript:;" class="more">更多&nbsp;&gt;</a>
        </view>
      </view>
      <view class="content">
        <view class="banner_multi">
          <view class="banners">
            <view class="card">
              <img
                src="/static/images/banners/1c3c94fbac86841391d617fbe714f006b9c96b43e688e-gHEB0Q_fw658.png"
                alt
              />
              <span class="title">奥冷牛排...</span>
              <span class="price">￥14.80/斤</span>
            </view>
            <view class="card">
              <img
                src="/static/images/banners/eb14dde47a6a4e9aa43641b62766b60cd999234932f5b-1yWnR6_fw658.jpg"
                alt
              />
              <span class="title">美国猪肉...</span>
              <span class="price">￥14.80/斤</span>
            </view>
            <view class="card">
              <img
                src="/static/images/banners/aae055fb733198b70c945fd02fc578dddf590b9e4cf47-RAOAEr_fw658.jpg"
                alt
              />
              <span class="title">德国嫩牛...</span>
              <span class="price">￥14.80/斤</span>
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
import IndexShoppingCart from '../../components/indexShoppingCart';
export default {
  components: { searchInput, IndexShoppingCart },
  data() {
    return {
      currentBannerIndex: 0,
      bannerList: [
        {
          id: 1,
          imagePath:
            "/static/images/banners/08899900a428d1000099f341edcff2ff1ca0108c2f48c-LaMX4k_fw658.jpg",
          type: "column",
          title: "精选越南红富士1111",
          description: "甘甜可口1111"
        },
        {
          id: 1,
          imagePath:
            "/static/images/banners/08899900a428d1000099f341edcff2ff1ca0108c2f48c-LaMX4k_fw658.jpg",
          type: "column",
          title: "精选越南红富士2222",
          description: "甘甜可口2222"
        },
        {
          id: 1,
          imagePath:
            "/static/images/banners/08899900a428d1000099f341edcff2ff1ca0108c2f48c-LaMX4k_fw658.jpg",
          type: "commodity",
          title: "精选越南红富士3333",
          description: "甘甜可口3333"
        }
      ]
    };
  },
  mounted() {
  },
  methods: {
    currentBannerIndexChange(event) {
      this.currentBannerIndex = event.detail.current;
    },
    toListPage(type, id) {
      uni.navigateTo({
        url: "/pages/list/index?type=" + type + "&id=" + id
      });
    }
  }
};
</script>

<style scoped>
.swiper {
  height: 225px;
}
</style>