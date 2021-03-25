<template >
  <div class = "Building" >
    <div class = "top" >
      <img src = "@/assets/nav bar-实时监控.png" alt = "" >
      <div class = "click_home" @click = "menuClick(0)" ></div >
      <div class = "click_div" @click = "menuClick(1)" ></div >
      <monitor-panel v-show = "buttonOneClicked" >
      </monitor-panel >
      <div class = "yun_wei" @click = "menuClick(5)" ></div >
      <maintenance-panel v-show = "yunWeiShow" ></maintenance-panel >
      <div class = "zi_chan" @click = "menuClick(2)" ></div >
      <assets-panel v-show = "ziChanShow" ></assets-panel >
      <div class = "tong_ji" @click = "menuClick(3)" ></div >
      <energy-panel v-show = "tongJiShow" ></energy-panel >
      <div class = "xi_tong" @click = "menuClick(4)" ></div >
      <system-panel v-show = "xiTongShow" ></system-panel >
    </div >
    <div class = "contain" >
      <div class = "item_click" style = "left: 20px;" @click = "showPage('空调监控系统')" ></div >
      <div class = "item_click" style = "left: 137px;" @click = "showPage('送排风系统')" ></div >
      <div class = "item_click" style = "left: 257px;" @click = "showPage('冷源系统')" ></div >
      <div class = "item_click" style = "left: 367px;" @click = "showPage('电梯系统')" ></div >
      <div class = "item_click" style = "left: 479px;" @click = "showPage('智能照明系统')" ></div >
      <div class = "item_click" style = "left: 600px;" @click = "showPage('水环境监测')" ></div >
      <div class = "item_click" style = "left: 717px;" @click = "showPage('能耗计量系统')" ></div >
      <img :src = "img" alt = "" >
    </div >
  </div >
</template >

<script >
import MonitorPanel from "@/components/MonitorPanel";
import MaintenancePanel from "@/components/MaintenancePanel";
import AssetsPanel from "@/components/AssetsPanel";
import EnergyPanel from "@/components/EnergyPanel";
import SystemPanel from "@/components/SystemPanel";

export default {
  name: "Building",
  components: {SystemPanel, EnergyPanel, AssetsPanel, MaintenancePanel, MonitorPanel},
  
  data() {
    return {
      buttonOneClicked: false,
      ziChanShow: false,
      tongJiShow: false,
      xiTongShow: false,
      yunWeiShow: false,
      img: require("@/assets/空调监控系统.png")
    }
  },
  computed: {},
  methods: {
    menuClick(type) {
      switch (type) {
        case 0:
          this.$router.push({
            path: "/"
          });
          break;
        case 1:
          this.buttonOneClicked = !this.buttonOneClicked;
          this.ziChanShow = false;
          this.tongJiShow = false;
          this.xiTongShow = false;
          this.yunWeiShow = false;
          break;
        case 2:
          this.buttonOneClicked = false;
          this.ziChanShow = !this.ziChanShow;
          this.tongJiShow = false;
          this.xiTongShow = false;
          this.yunWeiShow = false;
          break;
        case 3:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = !this.tongJiShow;
          this.xiTongShow = false;
          this.yunWeiShow = false;
          break;
        case 4:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = false;
          this.xiTongShow = !this.xiTongShow;
          this.yunWeiShow = false;
          break;
        case 5:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = false;
          this.xiTongShow = false;
          this.yunWeiShow = !this.yunWeiShow;
          break;
        default:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = false;
          this.xiTongShow = false;
          this.yunWeiShow = false;
          break;
      }
    },
    showPage(name) {
      this.img = require(`@/assets/${name}.png`)
    }
  }
  
}
</script >

<style lang = "scss" scoped >
.Building {
  background: #112329;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  
  .contain {
    height: calc(100vh - 76px - 0.5rem);
    position: relative;
    overflow: auto;
    
    .item_click {
      height: 30px;
      width: 96px;
      position: absolute;
      top: 21px;
    }
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background: #07263E;
    }
    
    img {
      width: 100%;
    }
  }
}

</style >
