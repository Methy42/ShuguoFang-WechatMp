<template>
  <u-parse class="u-parse-component" :content="viewText" @preview="preview" @navigate="navigate" ></u-parse>
</template>

<script>
import marked from 'marked'
import uParse from './uni-parse/u-parse.vue'
export default {
  components: { uParse },
  props: ['documentText'],
  data(){
    return {
      viewText: ""
    };
  },
  watch: {
    documentText(newValue, oldValue){
      this.renderViewText();
    }
  },
  mounted(){
    this.renderViewText();
  },
  methods: {
    renderViewText(){
      this.viewText = marked(this.documentText || "");
      console.log(this.viewText);
    },
    preview(){
      return false;
    },
    navigate() {
      return false;
    }
  }
}
</script>

<style>
</style>