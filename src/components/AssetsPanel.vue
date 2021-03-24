<template >
  <div class = "AssetsPanel" >
    <div class = "item" v-for = "(o,index) of clickList" :key = "index" @click = "goRouter(o.router)" :class = "$route.name === o.router?'current_item':''" >
      <img :src = "o.icon" alt = "" >
      {{ o.name }}
    </div >
  </div >
</template >

<script >
export default {
  name: "AssetsPanel",
  components: {},
  data() {
    return {
      clickList: [
        {
          name: "资产概览",
          icon: require("@/assets/assets_panel/icon／20／关闭摄像备份 6.png"),
          router:"Assets"
        },
        {
          name: "设备设施管理",
          icon: require("@/assets/assets_panel/icon／20／关闭摄像备份 42.png")
        },
        {
          name: "备品备件管理",
          icon: require("@/assets/assets_panel/icon／20／关闭摄像备份 43.png")
        },
        {
          name: "耗材管理",
          icon: require("@/assets/assets_panel/icon／20／关闭摄像备份 44.png")
        },
        {
          name: "库存管理",
          icon: require("@/assets/assets_panel/icon／20／关闭摄像备份 45.png")
        },
      ]
    }
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    goRouter(name) {
      name && this.$router.push({
        name:name
      });
    }
  },
  watch: {}
}
</script >

<style lang = "scss" scoped >
.AssetsPanel {
  background: rgba(13, 39, 59, 0.9);
  box-shadow: 0px 4px 8px 0px rgba(21, 48, 73, 0.4);
  border: 1px solid #254C63;
  position: absolute;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  z-index: 4;
  width: 720px;
  height: 106px;
  right: 616px;
  .current_item{
    background: url("~@/assets/按钮边框-选中.png")!important;
  }
  .item {
    width: 220px;
    height: 32px;
    line-height: 32px;
    margin: 10px;
    color: #FFFFFF;
    background: url("~@/assets/按钮边框-默认.png");
    font-size: 14px;
    display: flex;
    align-items: center;
    
    img {
      width: 16px;
      height: 16px;
      margin-left: 10px;
      margin-right: 10px;
    }
    
    &:hover {
      background: url("~@/assets/按钮边框-选中.png");
    }
  }
}
</style >
