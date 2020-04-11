<template>
  <view class="container">
    <view class="layout_list">
      <view
        class="item"
        v-for="commodity in commodityList"
        :key="commodity.id"
        @click="toCommodityPage(commodity.id)"
      >
        <view class="commodity">
          <view class="image-wrapper">
            <img :src="commodity.imagePath" alt />
          </view>
          <view class="content">
            <span class="title">{{commodity.name}}</span>
            <span class="message">
              <b>{{commodity._showPrice}}</b>
              <br />
              <span class="bage red" v-for="tag in commodity.tags" :key="tag.id" style="margin-right: 5px;">{{tag.name}}</span>
            </span>
          </view>
        </view>
        <view class="actionbox">
          <button class="push-cart-btn">
            <span class="iconfont icon-trolley"></span>
          </button>
        </view>
      </view>
    </view>
    <index-shopping-cart />
  </view>
</template>

<script>
import IndexShoppingCart from "../../components/indexShoppingCart";

export default {
  components: { IndexShoppingCart },
  data() {
    return {
      commodityList: [
        {
          id: 1,
          name: "车厘子",
          buyCount: 987,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 2,
          name: "香蕉",
          buyCount: 876,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 3,
          name: "苹果",
          buyCount: 765,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 4,
          name: "香梨",
          buyCount: 654,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 5,
          name: "木瓜",
          buyCount: 543,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 6,
          name: "哈密瓜",
          buyCount: 432,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 7,
          name: "西瓜",
          buyCount: 321,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 8,
          name: "桃子",
          buyCount: 321,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 9,
          name: "橘子",
          buyCount: 210,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 10,
          name: "橙子",
          buyCount: 109,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        },
        {
          id: 11,
          name: "葡萄",
          buyCount: 98,
          price: 10,
          oldPrice: 20,
          showPrice: "￥{{price}}·约每斤",
          _showPrice: "",
          imagePath: "/static/images/fruits/05d6ff83fd1cf326.jpg",
          tags: [
            {
              id: 1,
              name: "热销"
            },
            {
              id: 2,
              name: "优惠"
            },
            {
              id: 3,
              name: "推荐"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.setShowPrice();
  },
  methods: {
    toCommodityPage(id) {
      uni.navigateTo({
        url: "/pages/commodity/index?id=" + id
      });
    },
    setShowPrice() {
      let commodityList = this.commodityList;
      commodityList.map(commodity => {
        let showPrice = "";
        let beforeSplitList = commodity.showPrice.split("{{");
        if (beforeSplitList.length <= 1) {
          showPrice = commodity.showPrice;
        } else {
          beforeSplitList.forEach(beforeStr => {
            let arterSplitList = beforeStr.split("}}");
            if (arterSplitList.length <= 1) {
              showPrice += beforeStr;
            } else {
              showPrice += commodity[arterSplitList[0]] + arterSplitList[1];
            }
          });
        }
        commodity._showPrice = showPrice;
      });
      this.commodityList = commodityList;
    }
  }
};
</script>

<style>
</style>