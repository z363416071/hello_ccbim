<template>
  <div class="home">
    <div class="top">
      <img :src="topSrc" alt="" >
      <div class="click_div" @click="menuClick(1)"></div>
      <div class="panel" v-if="buttonOneClicked">
        <img src="@/assets/实时监控菜单-默认备份.png" alt="">
        <div class="item_click video_click" @click="goVideo"></div>
        <div class="item_click door_click" @click="goDoor"></div>
      </div>
      <div class="yun_wei" @click="goMaintenance"></div>
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
      <div class="center">
        <bim-model :urlIp="urlIp" version="ac9900e3-4fe4-4028-8083-5ac140e73c86"></bim-model>
      </div>
      <div class="right">
        <img src="@/assets/right.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>

import BimModel from "@/components/BimModel";

export default {
  name: 'Home',
  components: {BimModel},
  data() {
    return {
      // 获取模型数据接口ip
      urlIp: 'https://ccbim.pinming.cn',
      userList: [],
      buttonOneClicked: false,
      ziChanShow:false,
      tongJiShow:false,
      xiTongShow:false,
    }
  },
  computed:{
    topSrc(){
      if (this.buttonOneClicked ){
        return require("@/assets/nav_bar-1.png")
      }
      if (this.ziChanShow ){
        return require("@/assets/nav bar-资产管理选中.png")
      }
      if (this.tongJiShow ){
        return require("@/assets/nav bar-统计分析选中.png")
      }
      if (this.xiTongShow ){
        return require("@/assets/nav bar-系统管理选中.png")
      }
      return require("@/assets/nav_bar-2.png")
    }
  },
  mounted() {
  },
  methods: {
    menuClick(type){
      switch (type){
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
    goVideo() {
      this.buttonOneClicked = !this.buttonOneClicked;
      this.$router.push('about')
    },
    goDoor() {
      this.buttonOneClicked = !this.buttonOneClicked;
      this.$router.push('test')
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
