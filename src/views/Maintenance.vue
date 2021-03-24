<template>
  <div class="Maintenance">
    <div class="top">
      <img src="@/assets/nav bar-运维管理.png" alt="" >
      <div class="click_home" @click="menuClick(0)"></div>
      <div class="click_div" @click="menuClick(1)"></div>
      <monitor-panel v-if="buttonOneClicked">
      </monitor-panel>
      <div class = "yun_wei" @click = "menuClick(5)" ></div >
      <maintenance-panel v-show = "yunWeiShow" ></maintenance-panel >
      <div class="zi_chan" @click="menuClick(2)"></div>
      <assets-panel v-show = "ziChanShow" ></assets-panel>
      <div class="tong_ji" @click="menuClick(3)"></div>
      <energy-panel v-if="tongJiShow"></energy-panel>
      <div class="xi_tong" @click="menuClick(4)"></div>
      <system-panel v-if = "xiTongShow" ></system-panel>
    </div>
    <div class="contain">
        <img src="@/assets/运维管理.png" alt="">
    </div>
  </div>
</template>

<script>
import MonitorPanel from "@/components/MonitorPanel";
import MaintenancePanel from "@/components/MaintenancePanel";
import AssetsPanel from "@/components/AssetsPanel";
import EnergyPanel from "@/components/EnergyPanel";
import SystemPanel from "@/components/SystemPanel";
export default {
  name: "Maintenance",
  components: {SystemPanel, EnergyPanel, AssetsPanel, MaintenancePanel, MonitorPanel},

  data() {
    return {
      buttonOneClicked: false,
      ziChanShow:false,
      tongJiShow:false,
      xiTongShow:false,
      yunWeiShow: false,
    }
  },
  computed:{
  },
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
          this.yunWeiShow =false;
          break;
        case 2:
          this.buttonOneClicked = false;
          this.ziChanShow = !this.ziChanShow;
          this.tongJiShow = false;
          this.xiTongShow = false;
          this.yunWeiShow =false;
          break;
        case 3:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = !this.tongJiShow;
          this.xiTongShow = false;
          this.yunWeiShow =false;
          break;
        case 4:
          this.buttonOneClicked = false;
          this.ziChanShow = false;
          this.tongJiShow = false;
          this.xiTongShow = !this.xiTongShow;
          this.yunWeiShow =false;
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
          this.yunWeiShow =false;
          break;
      }
    },

  }

}
</script>

<style lang="scss" scoped>
.Maintenance{
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
      height: 1008px;
      width: 100%;
    }
  }
}

</style>
