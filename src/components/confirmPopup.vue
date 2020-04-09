<template>
  <uni-popup ref="confirmPopup" :type="'center'" :mask-click="false">
    <view class="uni-tip">
      <text class="uni-tip-title">{{title}}</text>
      <text class="uni-tip-content">{{message}}</text>
      <view class="uni-tip-group-button">
        <text class="uni-tip-button" @click="cancel()">取消</text>
        <text class="uni-tip-button" @click="confirm()">确定</text>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
export default {
  components: { uniPopup },
  data() {
    return {
      title: "警告",
      message: "此操作不可逆",
      object: null
    };
  },
  methods: {
    init({ title = "警告", message = "此操作不可逆", object = null }) {
      this.title = title;
      this.message = message;
      this.object = object;
      this.$refs["confirmPopup"].open();
    },
    confirm() {
      this.$emit("confirm", this.object);
      this.$refs["confirmPopup"].close();
    },
    cancel() {
      this.$emit("cancel", this.object);
      this.$refs["confirmPopup"].close();
    }
  }
};
</script>

<style lang="scss" scoped>
.uni-tip {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  padding: 15px;
  width: 300px;
  background-color: #fff;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
.uni-tip-title {
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  color: #333;
}
.uni-tip-content {
  /* padding: 15px; */
  font-size: 14px;
  color: #666;
}
.uni-tip-group-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  margin-top: 20px;
}
.uni-tip-button {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #3b4144;
}
</style>
