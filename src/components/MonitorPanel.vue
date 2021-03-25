<template >
  <div class = "MonitorPanel" >
    <div class = "item" v-for = "(o,index) of clickList" :key = "index" @click = "goRouter(o.router)" :class = "$route.name === o.router?'current_item':''" >
      <img :src = "o.icon" alt = "" >
      {{ o.name }}
    </div >
  </div >
</template >

<script >
export default {
  name: "MonitorPanel",
  components: {},
  data() {
    return {
      clickList: [
        {
          name: "多媒体教学系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像.png"),
          router: "Computer"
        },
        {
          name: "校园智能卡应用系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 20.png"),
          router:"Card"
        },
        {
          name: "智能化信息集成(平台)系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 21.png")
        },
        {
          name: "综合布线系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 22.png")
        },
        {
          name: "用户电话交换系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 23.png")
        },
        {
          name: "无线电话对讲系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 24.png"),
          router: "Intercom"
        },
        {
          name: "信息网络系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 25.png")
        },
        {
          name: "公共广播系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 26.png")
        },
        {
          name: "多媒体会议系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 27.png"),
          router:"MultiMedia"
        },
        {
          name: "信息导引及发布系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 28.png"),
          router:"Information"
        },
        {
          name: "综合管网系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 29.png")
        },
        {
          name: "建筑设备监测系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 30.png")
        },
        {
          name: "建筑能效监管系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 31.png")
        },
        {
          name: "入侵报警系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 32.png"),
          router: "Burglarproof"
        },
        {
          name: "视频安防监测系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 33.png"),
          router: "About"
        },
        {
          name: "出入口控制系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 34.png"),
          router: "Test"
        },
        {
          name: "电子巡查系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 35.png"),
          router:"ElectronicInspection"
        },
        {
          name: "停车场管理系统",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 36.png"),
          router: "Parking"
        },
        {
          name: "机房系统工程",
          icon: require("@/assets/monitor_panel/icon／20／关闭摄像备份 37.png")
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
.MonitorPanel {
  height: 369px;
  width: 720px;
  background: rgba(13, 39, 59, 0.9);
  box-shadow: 0px 4px 8px 0px rgba(21, 48, 73, 0.4);
  border: 1px solid #254C63;
  position: absolute;
  left: 464px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  z-index: 4;
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
