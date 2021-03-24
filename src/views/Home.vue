<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/nav bar-首页.png" alt="" >
      <div class="click_home" @click="menuClick(0)"></div>
      <div class="click_div" @click="menuClick(1)"></div>
      <monitor-panel v-if="buttonOneClicked"></monitor-panel>
      <div class = "yun_wei" @click = "menuClick(5)" ></div >
      <maintenance-panel v-show = "yunWeiShow" ></maintenance-panel >
      <div class="zi_chan" @click="menuClick(2)"></div>
      <div class="zichan_panel" v-if="ziChanShow">
        <img src="@/assets/资产管理-默认.png" alt="">
        <div class="item_click zichan_click" @click="goZiChan"></div>
      </div>
      <div class="tong_ji" @click="menuClick(3)"></div>
      <div class="tongji_panel" v-if="tongJiShow">
        <img src="@/assets/统计分析-默认.png" alt="">
        <div class="item_click tongji_click" @click="goTongJi"></div>
      </div>
      <div class="xi_tong" @click="menuClick(4)"></div>
      <div class="xitong_panel" v-if="xiTongShow">
        <img src="@/assets/系统管理-默认.png" alt="">
      </div>
    </div>
    <div class="contain">
      <img class="zi_xi_tong" src="@/assets/子系统.png" alt="">
      <div class="left">
        <img src="@/assets/left.png" alt="">
      </div>
     
      <div class="right">
        <img src="@/assets/right.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>


import model from "@/mixins/model";
import MonitorPanel from "@/components/MonitorPanel";
import MaintenancePanel from "@/components/MaintenancePanel";

export default {
  name: 'Home',
  components: {MaintenancePanel, MonitorPanel},
  data() {
    return {
      // 获取模型数据接口ip
      urlIp: 'https://ccbim.pinming.cn',
      userList: [],
      buttonOneClicked: false,
      ziChanShow:false,
      tongJiShow:false,
      yunWeiShow: false,
      xiTongShow:false,
    }
  },
  mixins:[model],
  computed:{
  },
  mounted() {
    this.$store.commit("setModelShow",true);
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
  
  
    goMaintenance(){
      this.$router.push('maintenance');
    },
    goZiChan(){
      this.$router.push('assets');
    },
    goTongJi(){
      this.$router.push('energy');
    },

  }
}
</script>
<style lang="scss" scoped>
.home {
  background: #112329;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;


  .contain {
    padding-top: .5rem;
    height: calc(100vh - 76px - 0.5rem);
    position: relative;
    .zi_xi_tong{
      position: absolute;
      left:  25.5rem;
      z-index: 3;
    }
    .left {
      margin-left: .5rem;

      img {
        width: 22.5rem;
        height: 100%;
      }
    }

    .right {
      margin-right: .5rem;

      img {
        width: 22.3rem;
        height: 100%;
      }
    }

    display: flex;
    justify-content: space-between;

    .center {
      width: 73rem;
      height: 100%;
    }
  }
}
</style>
