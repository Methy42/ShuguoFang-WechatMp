<template>
  <uni-drawer :visible="visible">
    <view style="padding:15px;">
      <view class="layout_block">
        <view class="layout_title">
          <i class="iconfont icon-ticket"></i>
          请选择收货地址
          <view class="tool">
            <a href="javascript:;" class="setting">
              <i class="iconfont icon-setting"></i>
              <span style="margin-left: 5px;">管理</span>
            </a>
          </view>
        </view>
        <view class="content">
          <view class="layout_list">
            <view class="item" v-for="(address) in addressArr" :key="address.id">
              <view class="commodity">
                <view class="content">
                  <span class="title">{{address.address}}</span>
                  <span class="message">
                    <b>{{ address.name }}&nbsp;-&nbsp;{{ address.telephone }}</b>
                  </span>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </uni-drawer>
</template>

<script>
import uniDrawer from "./uni-drawer/uni-drawer.vue";
export default {
  components: {
    uniDrawer
  },
  data() {
    return {
      visible: false,
      customerId: "",
      addressArr: [
        {
          id: "112233",
          name: "欧阳先生",
          address: "江苏南京市建邺区沙州街道金穗花园1栋1703",
          telephone: "18795893760"
        },
        {
          id: "334455",
          name: "黄先生",
          address: "新疆哈密市伊州区哈建小区203栋3单元202",
          telephone: "18795893760"
        }
      ]
    };
  },
  methods: {
    init(customerId) {
      console.log(1111);
      this.visible = true;
      this.customerId = customerId;
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style>
</style>