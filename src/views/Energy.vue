<template>
  <div class="Energy">
    <div class="top">
      <img src="@/assets/nav bar-能耗统计.png" alt="" >
      <div class="click_home" @click="menuClick(0)"></div>
      <div class="click_div" @click="menuClick(1)"></div>
      <monitor-panel v-if="buttonOneClicked"></monitor-panel>
      <div class="yun_wei" @click="goMaintenance"></div>
      <div class="zi_chan" @click="menuClick(2)"></div>
      <div class="zichan_panel" v-if="ziChanShow">
        <img src="@/assets/资产管理-默认.png" alt="">
        <div class="item_click zichan_click" @click="goZiChan"></div>
      </div>
      <div class="tong_ji" @click="menuClick(3)"></div>
      <div class="tongji_panel" v-if="tongJiShow">
        <img src="@/assets/统计分析-选中.png" alt="">
        <div class="item_click tongji_click" @click="goTongJi"></div>
      </div>
      <div class="xi_tong" @click="menuClick(4)"></div>
      <div class="xitong_panel" v-if="xiTongShow">
        <img src="@/assets/系统管理-默认.png" alt="">
      </div>
    </div>
    <div class="contain">
      <img src="@/assets/统计分析.png" alt="">
    </div>
  </div>
</template>

<script>
import MonitorPanel from "@/components/MonitorPanel";
export default {
  name: "Energy",
  components: {MonitorPanel},
  data() {
    return {
      buttonOneClicked: false,
      ziChanShow:false,
      tongJiShow:false,
      xiTongShow:false,
    }
  },
  computed:{
  
  },
  mounted() {
  },
  methods: {
    menuClick(type){
      switch (type){
        case 0:
           this.$router.push({
            path:"/"
          });
          break;
        case 1:
          this.buttonOneClicked = !this.buttonOneClicked;
          this.ziChanShow = false;
          this.tongJiShow = false;
          this.xiTongShow = false;
          break;
        case 2:
          this.buttonOneClicked = false;
          this.ziChanShow = !this.ziChanShow;
          this.tongJiShow = false;
          this.xiTongShow = false;
          break;
        case 3:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = !this.tongJiShow;
          this.xiTongShow = false;
          break;
        case 4:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = false;
          this.xiTongShow = !this.xiTongShow;
          break;
        default:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = false;
          this.xiTongShow = false;
          break;
      }
    },
   
    goMaintenance(){
      this.$router.push('maintenance')
    },
    goZiChan(){
      this.$router.push('assets')
    },
    goTongJi(){
      this.$router.push('energy')
    },
  }

}
</script>

<style lang="scss" scoped>
.Energy{
  background: #112329;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  .contain{
    height: calc(100vh - 76px - 0.5rem);
    overflow: auto;
    &::-webkit-scrollbar{
      width: 8px;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 15px;
      background: #07263E;
    }
    img{
      height: 1621px;
      width: 100%;
    }
  }
}

</style>
