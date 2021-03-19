<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/nav_bar-2.png" alt="" v-show="!buttonOneClicked">
      <img src="@/assets/nav_bar-1.png" alt="" v-show="buttonOneClicked">
      <div class="click_div" @click="buttonOneClicked=!buttonOneClicked"></div>
      <div class="panel" v-if="buttonOneClicked">
        <img src="@/assets/实时监控菜单-默认备份.png" alt="">
        <div class="item_click" @click="goVideo"></div>
      </div>
    </div>
    <div class="contain">
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
      buttonOneClicked: false
    }
  },
  mounted() {
  },
  methods: {
    goVideo() {
      this.buttonOneClicked = !this.buttonOneClicked;
      this.$router.push('about')
    }
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
  img {
    -webkit-user-drag: none;
  }

  .top {
    position: relative;

    img {
      width: 100%;
    }

    .click_div {
      width: 136px;
      height: 41px;
      position: absolute;
      top: 28px;
      left: 21px;
    }

    .panel {
      position: absolute;
      width: 740px;
      height: 391px;
      z-index: 1;
      left: 10px;

      .item_click {
        width: 219px;
        height: 30px;
        position: absolute;
        bottom: 127px;
        right: 20px;
      }
    }
  }

  .contain {
    padding-top: .5rem;
    height: calc(100vh - 76px - 0.5rem);
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
