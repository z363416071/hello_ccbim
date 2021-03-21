<template>
  <div class="Assets">
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
        <img src="@/assets/资产管理-选中.png" alt="">
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
      <img src="@/assets/7.1资产管理.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "Assets",
  data() {
    return {
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
.Assets{
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
      height: 961px;
      width: 100%;
    }
  }
}

</style>
