<template>
  <view class="container">
    <view
      class="layout_block"
      v-if="goodList.length === 0 && topFiveCommodityList.length > 0"
      style="margin-top: 15px;"
    >
      <view class="layout_title">
        <view class="label">
          <text class="icon iconfont icon-commodity"></text>
          <text style="margin-left: 5px;">最新上架商品</text>
        </view>
      </view>
      <view class="content">
        <view class="commodity-tag-group">
          <view
            class="commodity-tag"
            v-for="commodity in topFiveCommodityList"
            :key="commodity.id"
            @tap="toCommodityPage(commodity.id, commodity.name)"
          >
            <img :src="commodity.imagePath + '/show_in_list.jpg'" />
            <text>{{commodity.name}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="layout_list" v-if="goodList.length > 0">
      <view
        class="item"
        v-for="(commodity, index) in goodList"
        :key="index"
      >
        <view class="commodity" @tap="toCommodityPage(commodity.id, commodity.name)">
          <view class="image-wrapper">
            <img :src="commodity.imagePath + '/show_in_list.jpg'" alt />
          </view>
          <view class="content">
            <text class="title">{{commodity.name}}</text>
            <text class="message">
              <b>￥{{commodity.price}}/{{commodity.unit}}</b>
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
    <index-shopping-cart />
  </view>
</template>

<script>
import IndexShoppingCart from "../../components/indexShoppingCart";
import {
  apiSearchGoods,
  apiGetTopFiveCommodity,
  apiPushCommodityToShoppingCart,
  apiUpdateCommondityCountInShoppingCart
} from "../../api/main";
import store from "@/store/index";
export default {
  components: {
    IndexShoppingCart
  },
  props: ["searchValue"],
  data() {
    return {
      page: 1,
      topFiveCommodityList: [],
      goodList: []
    };
  },
  computed: {
    shoppingCartRecord() {
      return commodity => {
        console.log(store.state.shoppingCartInfo);
        return (
          store.state.shoppingCartInfo.records.find(
            record => record.goodsId === commodity.id
          ) || {}
        );
      };
    }
  },
  mounted() {
    this.getTopFiveCommodity();
  },
  watch: {
    searchValue(newValue, oldValue) {
      this.search();
    }
  },
  methods: {
    async search() {
      if (!this.searchValue) {
        return;
      }
      const result = await apiSearchGoods(this.page, {
        name: this.searchValue
      });
      this.goodList = result;
    },
    getTopFiveCommodity() {
      apiGetTopFiveCommodity().then(res => {
        this.topFiveCommodityList = res;
      });
    },
    toCommodityPage(id, name) {
      uni.navigateTo({
        url: "/pages/commodity/index?type=common&id=" + id + "&name=" + name
      });
    },
    async nextPage() {
      await this.search();
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