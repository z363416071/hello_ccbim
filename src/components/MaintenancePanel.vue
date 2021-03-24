<template >
  <div class = "MaintenancePanel" >
    <div class = "item" v-for = "(o,index) of clickList" :key = "index" @click = "goRouter(o.router)" :class = "$route.name === o.router?'current_item':''" >
      <img :src = "o.icon" alt = "" >
      {{ o.name }}
    </div >
  </div >
</template >

<script >
export default {
  name: "MaintenancePanel",
  components: {},
  data() {
    return {
      clickList: [
        {
          name: "报修",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像.png")
        },
        {
          name: "告警管理",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 20.png")
        },
        {
          name: "巡检管理",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 21.png")
        },
        {
          name: "问题库",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 22.png")
        },
        {
          name: "服务商管理",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 23.png")
        },
        {
          name: "运维分析",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 24.png"),
          router:"Maintenance"
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
.MaintenancePanel {
  height: 128px;
  width: 720px;
  background: rgba(13, 39, 59, 0.9);
  box-shadow: 0px 4px 8px 0px rgba(21, 48, 73, 0.4);
  border: 1px solid #254C63;
  position: absolute;
  left: 615px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  z-index: 1;
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
