<template >
  <div class = "home" >
    <div class = "top" >
      <img src = "@/assets/nav bar-首页.png" alt = "" >
      <div class = "click_home" @click = "menuClick(0)" ></div >
      <div class = "click_div" @click = "menuClick(1)" ></div >
      <monitor-panel v-show = "buttonOneClicked" ></monitor-panel >
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
      <div class = "zi_xi_tong" >
        <img src = "@/assets/home_icon/icon／20／视频安防监测系统.png" alt = "" title = "视频安防监测系统" >
        <img src = "@/assets/home_icon/icon／20／公告广播系统.png" alt = "" title = "公告广播系统" >
        <img src = "@/assets/home_icon/icon／20／出入口控制系统.png" alt = "" title = "出入口控制系统" >
        <img src = "@/assets/home_icon/icon／20／多媒体教学系统.png" alt = "" title = "多媒体教学系统." >
        <img src = "@/assets/home_icon/icon／20／建筑能效监管系统.png" alt = "" title = "建筑能效监管系统" >
        <img src = "@/assets/home_icon/icon／20／机房控制系统.png" alt = "" title = "机房控制系统" >
        <img src = "@/assets/home_icon/icon／20／信息网络系统.png" alt = "" title = "信息网络系统" >
      </div >
      <div class = "pop_info" v-show = "popInfo" :class = "'pop_info'+type" >
        <div class = "close" @click = "popInfo =false;" ></div >
      </div >
      <div class = "left" >
        <img src = "@/assets/left.png" alt = "" >
        <div class = "videos" >
          <div class = "video" v-for = "(o,index) of videos" :key = "index" >
            <div class = "header" @click = "showDetail(o)" ></div >
            <video-player class = "video-player-box"
                          ref = "videoPlayer"
                          :options = "index===0?playerOptions1:playerOptions2"
                          :playsinline = "true" >
            </video-player >
          </div >
        </div >
      
      </div >
      <div class = "right" >
        <img src = "@/assets/right.png" alt = "" >
        <div class = "doors" >
          <div class = "door" v-for = "(o,i) of doorList" :key = "i" @click = "showDoorDetail(o)" ></div >
        </div >
      </div >
    </div >
  </div >
</template >

<script >


import model from "@/mixins/model";
import MonitorPanel from "@/components/MonitorPanel";
import MaintenancePanel from "@/components/MaintenancePanel";
import AssetsPanel from "@/components/AssetsPanel";
import EnergyPanel from "@/components/EnergyPanel";
import SystemPanel from "@/components/SystemPanel";

export default {
  name: 'Home',
  components: {SystemPanel, EnergyPanel, AssetsPanel, MaintenancePanel, MonitorPanel},
  
  data() {
    return {
      // 获取模型数据接口ip
      urlIp: 'https://ccbim.pinming.cn',
      userList: [],
      buttonOneClicked: false,
      ziChanShow: false,
      tongJiShow: false,
      yunWeiShow: false,
      xiTongShow: false,
      popInfo: false,
      playerOptions1: {
        // videojs options
        autoplay: 'muted',
        muted: true,
        language: 'zh-CN',
        sources: [{
          withCredentials: false,
          type: "video/mp4",
          src: require("@/assets/视频1-迅捷压缩.mp4")
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,//
        },
        loop: true,
        width: 341,
        height: 150,
        preload: 'auto',
      },
      playerOptions2: {
        // videojs options
        autoplay: 'muted',
        muted: true,
        language: 'zh-CN',
        sources: [{
          withCredentials: false,
          type: "video/mp4",
          src: require("@/assets/4-迅捷压缩.mp4")
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,//
        },
        loop: true,
        width: 341,
        height: 150,
        preload: 'auto',
      },
      videos: [
        {
          "floorID": 107,
          "floorName": "F3",
          "handle": "413863",
          "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAAAwAAABQBgAAAAAAAIIAAAAsBgAAGAYAAAwGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFwCAABQAgAARAIAADgCAAAsAgAAIAIAABQCAAAIAgAA/AEAAOwBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAAZAAAAFgAAABMAAAAQAAAADQAAAAoAAAAHAAAABAAAAAEAAAA+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg==",
          src: require("@/assets/视频1-迅捷压缩.mp4")
        },
        {
          "floorID": 107,
          "floorName": "F3",
          "handle": "414106",
          "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg==",
          src: require("@/assets/4-迅捷压缩.mp4")
        }
      ],
      doorList: [
        {
          "clickPointPosition": {
            "x": -58465.28257367348,
            "y": 128469.67437112449,
            "z": 14840.473775129602
          },
          "comid": 533,
          "comtype": 14000029,
          "floorID": 37,
          "floorName": "5F",
          "handle": "1025378",
          "cameraPosition": {
            "x": -59712.501509327136,
            "y": 129583.85568324832,
            "z": 15945.241820019373
          },
          "cameraUp": {
            "x": 0.4665756497095497,
            "y": -0.4199396331901991,
            "z": 0.778432956377229
          },
          "cameraTarget": {
            "x": -41036.62260823543,
            "y": 112774.70214059933,
            "z": -4316.670237912695
          },
          "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAcBQAACAUAAPwEAADwBAAA5AQAANgEAADMBAAAwAQAALQEAACoBAAAnAQAAJAEAACEBAAAeAQAAGwEAABgBAAAVAQAAEgEAAA8BAAAMAQAACQEAAAYBAAADAQAAAAEAAD0AwAA6AMAANwDAADQAwAAxAMAALgDAACsAwAAoAMAAJQDAACIAwAAfAMAAHADAABkAwAAWAMAAEwDAABAAwAANAMAACgDAAAcAwAAEAMAAAQDAAD4AgAA7AIAAOACAADUAgAAyAIAALwCAACwAgAApAIAAJgCAACMAgAAgAIAAHQCAABoAgAAXAIAAFACAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAA6/f//awAAAEL9//9qAAAASv3//2kAAABS/f//aAAAAFr9//9nAAAAYv3//2UAAABq/f//ZAAAAHL9//9jAAAAev3//2IAAACC/f//YAAAAIr9//9fAAAAkv3//14AAACa/f//XQAAAKL9//9cAAAAqv3//1sAAACy/f//WgAAALr9//9ZAAAAwv3//1gAAADK/f//VwAAANL9//9WAAAA2v3//1UAAADi/f//VAAAAOr9//9TAAAA8v3//1EAAAD6/f//UAAAAAL+//9PAAAACv7//04AAAAS/v//TQAAABr+//9LAAAAIv7//0oAAAAq/v//SQAAADL+//9GAAAAOv7//0QAAABC/v//QwAAAEr+//9CAAAAUv7//0EAAABa/v//QAAAAGL+//8/AAAAav7//z4AAABy/v//PQAAAHr+//88AAAAgv7//zoAAACK/v//OAAAAJL+//83AAAAmv7//zYAAACi/v//NQAAAKr+//80AAAAsv7//zMAAAC6/v//MgAAAML+//8wAAAAyv7//y8AAADS/v//LgAAANr+//8tAAAA4v7//ywAAADq/v//KwAAAPL+//8pAAAA+v7//ygAAAAC////JwAAAAr///8mAAAACAAMAAgABwAIAAAAAAAAASUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAfwHj7j5UAte+YkdHP59MIMdaQ9xHXeWGxYBAacfuF/1H+CR5Rg=="
        },
        {
          "clickPointPosition": {
            "x": -58488.885616303865,
            "y": 128308.63441097313,
            "z": 14371.462055416006
          },
          "comid": 533,
          "comtype": 14000029,
          "floorID": 37,
          "floorName": "5F",
          "handle": "1025378",
          "cameraPosition": {
            "x": -53943.11868002912,
            "y": 124591.06819188925,
            "z": 19945.241630029577
          },
          "cameraUp": {
            "x": -0.19099237278691666,
            "y": 0.6422586256807012,
            "z": 0.7423111014096182
          },
          "cameraTarget": {
            "x": -60772.79889040992,
            "y": 147557.54042191716,
            "z": -1682.929751835407
          },
          "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAcBQAACAUAAPwEAADwBAAA5AQAANgEAADMBAAAwAQAALQEAACoBAAAnAQAAJAEAACEBAAAeAQAAGwEAABgBAAAVAQAAEgEAAA8BAAAMAQAACQEAAAYBAAADAQAAAAEAAD0AwAA6AMAANwDAADQAwAAxAMAALgDAACsAwAAoAMAAJQDAACIAwAAfAMAAHADAABkAwAAWAMAAEwDAABAAwAANAMAACgDAAAcAwAAEAMAAAQDAAD4AgAA7AIAAOACAADUAgAAyAIAALwCAACwAgAApAIAAJgCAACMAgAAgAIAAHQCAABoAgAAXAIAAFACAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAA6/f//awAAAEL9//9qAAAASv3//2kAAABS/f//aAAAAFr9//9nAAAAYv3//2UAAABq/f//ZAAAAHL9//9jAAAAev3//2IAAACC/f//YAAAAIr9//9fAAAAkv3//14AAACa/f//XQAAAKL9//9cAAAAqv3//1sAAACy/f//WgAAALr9//9ZAAAAwv3//1gAAADK/f//VwAAANL9//9WAAAA2v3//1UAAADi/f//VAAAAOr9//9TAAAA8v3//1EAAAD6/f//UAAAAAL+//9PAAAACv7//04AAAAS/v//TQAAABr+//9LAAAAIv7//0oAAAAq/v//SQAAADL+//9GAAAAOv7//0QAAABC/v//QwAAAEr+//9CAAAAUv7//0EAAABa/v//QAAAAGL+//8/AAAAav7//z4AAABy/v//PQAAAHr+//88AAAAgv7//zoAAACK/v//OAAAAJL+//83AAAAmv7//zYAAACi/v//NQAAAKr+//80AAAAsv7//zMAAAC6/v//MgAAAML+//8wAAAAyv7//y8AAADS/v//LgAAANr+//8tAAAA4v7//ywAAADq/v//KwAAAPL+//8pAAAA+v7//ygAAAAC////JwAAAAr///8mAAAACAAMAAgABwAIAAAAAAAAASUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf4GTQ74QayQ/Ggg+P81kbcdjGRBIwV3SxB63UseJV/NHfNKbRg=="
        },
        {
          "floorID": 107,
          "floorName": "F3",
          "handle": "413863",
          "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAAAwAAABQBgAAAAAAAIIAAAAsBgAAGAYAAAwGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFwCAABQAgAARAIAADgCAAAsAgAAIAIAABQCAAAIAgAA/AEAAOwBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAAZAAAAFgAAABMAAAAQAAAADQAAAAoAAAAHAAAABAAAAAEAAAA+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg==",
        },
        {
          "floorID": 107,
          "floorName": "F3",
          "handle": "414106",
          "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg==",
        }
      ],
      type: 1
    }
  },
  mixins: [model],
  computed: {},
  mounted() {
    this.$store.commit("setModelShow", true);
    this.$root.$on("selectedEntity", data => {
      let showPopList = [
        {
          floorID: 31,
          handle: "3545431"
        },
        {
          floorID: 117,
          handle: "738068"
        },
        {
          floorID: 111,
          handle: "630641",
        }
      ]
      let findIndex = showPopList.findIndex(o => {
        return o.floorID === data?.object?.floorID && o.handle === data?.object?.handle
      })
      if (findIndex !== -1) {
        this.popInfo = true;
        this.type = findIndex;
      }
    });
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
    showDetail(o) {
      this.$store.commit("setInitDeviceData", o);
      this.$router.push({
        name: "About"
      })
    },
    showDoorDetail(o) {
      if(o.clickPointPosition){
        this.$store.commit("setInitDeviceData", o);
        this.$router.push({
          name: "Test"
        })
      }else {
        this.$store.commit("setInitDeviceData", o);
        this.$router.push({
          name: "About"
        })
      }

    }
  },
  destroyed() {
    this.$root.$off("selectedEntity")
  }
}
</script >
<style lang = "scss" scoped >
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
    
    .pop_info {
      position: absolute;
      top: 300px;
      left: 732px;
      width: 426px;
      height: 283px;
      z-index: 1;
      
      .close {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 15px;
        right: 10px;
      }
    }
    .pop_info0{
      background: url("~@/assets/大礼堂.png");
    }
    .pop_info1{
      background: url("~@/assets/图书馆.png");
    }
    .pop_info2{
      background: url("~@/assets/教学楼.png");
    }
    .zi_xi_tong {
      position: absolute;
      left: 25.5rem;
      z-index: 3;
      width: 271px;
      height: 40px;
      background: url("~@/assets/home_icon/边框.png");
      display: flex;
      justify-content: space-around;
      align-items: center;
      
      img {
        cursor: pointer;
      }
    }
    
    .left {
      margin-left: .5rem;
      
      img {
        width: 22.5rem;
        height: 100%;
      }
      
      .videos {
        position: absolute;
        height: 332px;
        top: 220px;
        left: 17px;
        
        .video-player-box {
         /deep/ video{
           width: 341px!important;
           height: 150px!important;
           object-fit:fill;
         }
          /deep/ .video-js {
            .vjs-control-bar {
              display: flex;
              justify-content: space-between;
            }
            
            .vjs-paused {
              display: none;
            }
            
            .vjs-icon-placeholder {
              width: 100%;
              height: 100%;
              display: block;
            }
            
            .vjs-playing {
              display: none;
            }
            
            .vjs-progress-control {
              display: none;
            }
          }
        }
        
        .video {
          .header {
            width: 100%;
            height: 21px;
            cursor: pointer;
          }
          
        }
      }
      
    }
    
    .right {
      margin-right: .5rem;
      
      img {
        width: 22.3rem;
        height: 100%;
      }
      
      .doors {
        position: absolute;
        height: 140px;
        width: 356px;
        top: 428px;
        
        .door {
          height: 35px;
          cursor: pointer;
        }
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
</style >
