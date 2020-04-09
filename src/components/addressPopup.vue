<template>
  <uni-popup ref="addressPopup" :type="'bottom'" :mask-click="false">
    <view class="popup-wrapper">
      <view class="detail-input-wrapper">
        <input type="text" v-model="result.detail" />
      </view>
      <view class="address-picker-wrapper">
        <picker-view :indicator-style="indicatorStyle" :value="addressPickerValue" @change="pickerChange">
          <picker-view-column>
            <view class="item" v-for="(item) in provinceArr" :key="item.name">{{item.name}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item) in cityArr" :key="item.name">{{item.name}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item) in districtArr" :key="item.name">{{item}}</view>
          </picker-view-column>
        </picker-view>
      </view>
      <view class="uni-tip-group-button">
        <text class="uni-tip-button" @click="cancel()">取消</text>
        <text class="uni-tip-button" @click="confirm()">确定</text>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import allAddressData from "../util/allAddressData";
export default {
  components: {
    uniPopup
  },
  data() {
    return {
      result: {
        province: "",
        city: "",
        district: "",
        detail: ""
      },
      provinceArr: allAddressData,
      cityArr: [],
      districtArr: [],
      addressPickerValue: [0, 0, 0],
      indicatorStyle: `height: ${Math.round(
        uni.getSystemInfoSync().screenWidth / (750 / 100)
      )}px;`
    };
  },
  methods: {
    init(address) {
      this.result.province = address.province;
      this.result.city = address.city;
      this.result.district = address.district;
      this.result.detail = address.detail;

      this.setAddressPicker();
      
      this.$refs["addressPopup"].open();
    },
    setAddressPicker(){
      let provinceIndex = 0;
      let cityIndex = 0;
      let districtIndex = 0;

      allAddressData.forEach((p, index) => {
        if(p.name === this.result.province){
          provinceIndex = index;
          this.cityArr = p.city;
          p.city.forEach((c, index) => {
            if(c.name === this.result.city){
              cityIndex = index;
              this.districtArr = c.area;
              c.area.forEach((a, index) => {
                if(a === this.result.district){
                  districtIndex = index;
                }
              });
            }
          });
        }
      });
      this.addressPickerValue = [
        provinceIndex,
        cityIndex,
        districtIndex
      ];
    },
    setAddressResult(values){
      let provinceName = "";
      let cityName = "";
      let districtName = "";

      allAddressData.forEach((p, index) => {
        if(values[0] === index){
          provinceName = p.name;
          p.city.forEach((c,index) => {
            if(values[1] === index){
              cityName = c.name;
              c.area.forEach((a, index) => {
                if(values[2] === index){
                  districtName = a.name;
                }
              });
            }
          });
        }
      });

      this.result.province = provinceName;
      this.result.city = cityName;
      this.result.district = districtName;
    },
    pickerChange: function(e) {
      const val = e.detail.value;
      this.setAddressResult(val);
      this.setAddressPicker();
    },
    confirm() {
      this.$emit("confirm", this.result);
      this.$refs["addressPopup"].close();
    },
    cancel() {
      this.$emit("cancel", this.result);
      this.$refs["addressPopup"].close();
    }
  }
};
</script>

<style lang="scss" scoped>
.uni-tip-group-button {
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  flex-shrink: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  margin-top: 20px;
  border-top: 1px solid #f6f6f6;
}
.uni-tip-button {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #3b4144;
}
.uni-tip-button:last-child{
  border-left: 1px solid #f6f6f6;
}
.popup-wrapper{
  height: 300px;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.detail-input-wrapper {
  height: 50px;
  flex-shrink: 0;
  border-bottom: 1px solid #f6f6f6;
  padding: 0px 15px;
}
.detail-input-wrapper input{
  font-size: 18px;
  height: 50px;
  line-height: 50px;
}
.address-picker-wrapper {
  flex-grow: 1;
  padding: 0px 15px;
}
.address-picker-wrapper picker-view{
  height: 100%;
}
</style>