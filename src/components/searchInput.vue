<template>
  <view class="search" @click="setInputFocus">
    <i class="icon iconfont icon-search"></i>
    <input ref="input" type="text" :placeholder="placeholder ? placeholder : '搜索你想要的'" v-model="searchValue" @input="onInput" />
  </view>
</template>

<script>
export default {
  props: ['placeholder'],
  data(){
    return {
      searchValue: ""
    }
  },
  methods: {
    setInputFocus(){
      this.$refs['input'].focus = true;
    },
    onInput(event) {
      console.log(event);
    }
  }
};
</script>

<style>
</style>