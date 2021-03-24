<template>
  <div class="About">
    <div class="top">
      <img src="@/assets/nav bar-实时监控.png" alt="" >
      <div class="click_home" @click="menuClick(0)"></div>
      <div class="click_div" @click="menuClick(1)"></div>
      <monitor-panel v-if="buttonOneClicked">
      </monitor-panel>
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
      <div class="left">
        <img src="@/assets/视频监控面板.png" alt="">
        <div class="videos">
          <div class="video_item" v-for="(o,index) of videoList" @click="clickVideo(o.selfDefiningData.selectedEntity)" :key="index"></div>
        </div>
      </div>
    </div>
    <div class="video" v-show="videoShow">
      <div class="close_icon" @click="videoShow =false">
        <svg t="1616223794686" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1132" width="200" height="200"><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" p-id="1133"></path></svg>
      </div>
      <video-player  class="video-player-box"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="true" >
      </video-player>
    </div>
  </div>
</template>
<script>

import image from "@/global/config"
import model from "@/mixins/model";
import MonitorPanel from "@/components/MonitorPanel";

export default {
  name: 'About',
  components: {MonitorPanel},
  data() {
    return {
      // 获取模型数据接口ip
      urlIp: 'https://ccbim.pinming.cn',
      positionArr: [
        {
          iconImg: image.normalMonitoring,
          id: "1",
          "floorId": 107,
          "markPosition": "413863;148136.8072723484,-72603.59001241584,13099.999759253125",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 148136.8072723484,
                "y": -72603.59001241584,
                "z": 13099.999759253125
              },
              "comid": 1193,
              "comtype": 3000101,
              "floorID": 107,
              "floorName": "F3",
              "handle": "413863",
              "cameraPosition": {
                "x": 170017.10305552444,
                "y": -86752.4329225202,
                "z": 27107.0504580075
              },
              "cameraUp": {
                "x": -0.49013397770841644,
                "y": 0.33497083190113214,
                "z": 0.8047131325330719
              },
              "cameraTarget": {
                "x": 102063.32759034034,
                "y": -40310.98276062791,
                "z": -33613.94872671895
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAAAwAAABQBgAAAAAAAIIAAAAsBgAAGAYAAAwGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFwCAABQAgAARAIAADgCAAAsAgAAIAIAABQCAAAIAgAA/AEAAOwBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAAZAAAAFgAAABMAAAAQAAAADQAAAAoAAAAHAAAABAAAAAEAAAA+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg=="
            }
          }
        },
        {
          iconImg: image.normalMonitoring1,
          id: "2",
          "floorId": 107,
          "markPosition": "414106;153014.421743957,-72644.25314138,13063.903165566147",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 153014.421743957,
                "y": -72644.25314138,
                "z": 13063.903165566147
              },
              "comid": 1193,
              "comtype": 3000101,
              "floorID": 107,
              "floorName": "F3",
              "handle": "414106",
              "cameraPosition": {
                "x": 170017.109375,
                "y": -86752.4296875,
                "z": 27107.05078125
              },
              "cameraUp": {
                "x": -0.4901339735983552,
                "y": 0.3349708336633061,
                "z": 0.8047131343028998
              },
              "cameraTarget": {
                "x": 102063.328125,
                "y": -40310.984375,
                "z": -33613.94921875
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg=="
            }
          }
        },
        {
          iconImg: image.normalMonitoring2,
          id: "3",
          "floorId": 107,
          "markPosition": "413101;138066.22472390378,-72644.25314138,13013.968681778757",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 138066.22472390378,
                "y": -72644.25314138,
                "z": 13013.968681778757
              },
              "comid": 1193,
              "comtype": 3000101,
              "floorID": 107,
              "floorName": "F3",
              "handle": "413101",
              "cameraPosition": {
                "x": 170017.109375,
                "y": -86752.4296875,
                "z": 27107.05078125
              },
              "cameraUp": {
                "x": -0.4901339735983552,
                "y": 0.3349708336633061,
                "z": 0.8047131343028998
              },
              "cameraTarget": {
                "x": 102063.328125,
                "y": -40310.984375,
                "z": -33613.94921875
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg=="
            }
          }
        },
        {
          iconImg: image.normalMonitoring3,
          id: "4",
          "floorId": 107,
          "markPosition": "412760;129959.20839365106,-72644.25314138,13032.634554345901",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 129959.20839365106,
                "y": -72644.25314138,
                "z": 13032.634554345901
              },
              "comid": 1193,
              "comtype": 3000101,
              "floorID": 107,
              "floorName": "F3",
              "handle": "412760",
              "cameraPosition": {
                "x": 170017.109375,
                "y": -86752.4296875,
                "z": 27107.05078125
              },
              "cameraUp": {
                "x": -0.4901339735983552,
                "y": 0.3349708336633061,
                "z": 0.8047131343028998
              },
              "cameraTarget": {
                "x": 102063.328125,
                "y": -40310.984375,
                "z": -33613.94921875
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg=="
            }
          }
        },
        {
          iconImg: image.normalMonitoring4,
          id: "5",
          "floorId": 107,
          "markPosition": "412608;122647.96585724415,-72644.25314138,13076.874742759832",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 122647.96585724415,
                "y": -72644.25314138,
                "z": 13076.874742759832
              },
              "comid": 1193,
              "comtype": 3000101,
              "floorID": 107,
              "floorName": "F3",
              "handle": "412608",
              "cameraPosition": {
                "x": 170017.109375,
                "y": -86752.4296875,
                "z": 27107.05078125
              },
              "cameraUp": {
                "x": -0.4901339735983552,
                "y": 0.3349708336633061,
                "z": 0.8047131343028998
              },
              "cameraTarget": {
                "x": 102063.328125,
                "y": -40310.984375,
                "z": -33613.94921875
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg=="
            }
          }
        },
        {
          iconImg: image.offline1,
          id: "6",
          "floorId": 107,
          "markPosition": "401132;143230.04871956873,-75402.6191717311,13099.999759253125",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 143230.04871956873,
                "y": -75402.6191717311,
                "z": 13099.999759253125
              },
              "comid": 1192,
              "comtype": 39000002,
              "floorID": 107,
              "floorName": "F3",
              "handle": "401132",
              "cameraPosition": {
                "x": 170017.109375,
                "y": -86752.4296875,
                "z": 27107.05078125
              },
              "cameraUp": {
                "x": -0.4901339735983552,
                "y": 0.3349708336633061,
                "z": 0.8047131343028998
              },
              "cameraTarget": {
                "x": 102063.328125,
                "y": -40310.984375,
                "z": -33613.94921875
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg=="
            }
          }
        },
        {
          iconImg: image.offline2,
          id: "7",
          "floorId": 107,
          "markPosition": "420521;130682.27528706561,-75699.26698999468,13010.428968146693",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 130682.27528706561,
                "y": -75699.26698999468,
                "z": 13010.428968146693
              },
              "comid": 1194,
              "comtype": 3000103,
              "floorID": 107,
              "floorName": "F3",
              "handle": "420521",
              "cameraPosition": {
                "x": 170017.109375,
                "y": -86752.4296875,
                "z": 27107.05078125
              },
              "cameraUp": {
                "x": -0.4901339735983552,
                "y": 0.3349708336633061,
                "z": 0.8047131343028998
              },
              "cameraTarget": {
                "x": 102063.328125,
                "y": -40310.984375,
                "z": -33613.94921875
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg=="
            }
          }
        },
        {
          iconImg: image.normalMonitoring,
          id: "8",
          "floorId": 107,
          "markPosition": "404800;148432.2744439859,-84531.47144123966,12240.29116036836",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 148432.2744439859,
                "y": -84531.47144123966,
                "z": 12240.29116036836
              },
              "comid": 1190,
              "comtype": 3000041,
              "floorID": 107,
              "floorName": "F3",
              "handle": "404800",
              "cameraPosition": {
                "x": 170017.109375,
                "y": -86752.4296875,
                "z": 27107.05078125
              },
              "cameraUp": {
                "x": -0.49013397097587585,
                "y": 0.3349708318710327,
                "z": 0.8047131299972534
              },
              "cameraTarget": {
                "x": 102063.328125,
                "y": -40310.984375,
                "z": -33613.94921875
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAf9fy+r5Mgas+rgFOP6pXx0f8dh3H800Dx0cIJkg3cKnHGsbTRg=="
            }
          }
        },
        {
          iconImg: image.normalMonitoring3,
          id: "9",
          "floorId": 107,
          "markPosition": "404998;148379.68082311327,-79619.10537609181,12299.99960651623",
          "selfDefiningData": {
            "selectedEntity": {
              "clickPointPosition": {
                "x": 148379.68082311327,
                "y": -79619.10537609181,
                "z": 12299.99960651623
              },
              "comid": 1190,
              "comtype": 3000041,
              "floorID": 107,
              "floorName": "F3",
              "handle": "404998",
              "cameraPosition": {
                "x": 169894.65988939945,
                "y": -86931.09441299492,
                "z": 27107.05078125
              },
              "cameraUp": {
                "x": -0.4892507752831166,
                "y": 0.3362594985502607,
                "z": 0.8047131343028998
              },
              "cameraTarget": {
                "x": 102063.328125,
                "y": -40310.984375,
                "z": -33613.94921875
              },
              "flatBuffer": "EAAAAAwAFAAQAAwACAAEAAwAAAAAAAAADAAAACQAAADUBgAABgAAAIQCAABoAgAAWAIAADwCAAAsAgAAEAIAAIIAAACYBgAAhAYAAHgGAABkBgAAWAYAAEwGAABABgAANAYAACgGAAAcBgAAEAYAAAQGAAD4BQAA7AUAAOAFAADUBQAAyAUAALwFAACwBQAApAUAAJgFAACMBQAAgAUAAHQFAABoBQAAXAUAAFAFAABEBQAAOAUAACwFAAAgBQAAFAUAAAgFAAD8BAAA8AQAAOQEAADYBAAAzAQAAMAEAAC0BAAAqAQAAJwEAACQBAAAhAQAAHgEAABsBAAAYAQAAFQEAABIBAAAPAQAADAEAAAkBAAAGAQAAAwEAAAABAAA9AMAAOgDAADcAwAA0AMAAMQDAAC4AwAArAMAAKADAACUAwAAiAMAAHwDAABwAwAAZAMAAFgDAABMAwAAQAMAADQDAAAoAwAAHAMAABADAAAEAwAA+AIAAOwCAADgAgAA1AIAAMgCAAC8AgAAsAIAAKQCAACYAgAAjAIAAIACAAB0AgAAaAIAAFgCAABEAgAAOAIAACwCAAAgAgAAFAIAAAgCAAD8AQAA8AEAAOQBAADYAQAAzAEAAMABAAC0AQAAqAEAAJwBAACQAQAAhAEAAHgBAABsAQAAYAEAAFQBAABIAQAAPAEAADABAAAkAQAAGAEAAAwBAAAAAQAA9AAAAOgAAADcAAAA0AAAAMQAAAC4AAAArAAAAKAAAACUAAAAiAAAAHwAAABwAAAA9P///37RVUcAAIC/DAAMAAAAAAAIAAQADAAAAAAAFkUAAIA/9P///zCJ0kgAAIC/DAAMAAAACAAAAAQADAAAAO8hz0gAAIA/9P///57P7UgAAIC/DAAMAAgAAAAAAAQADAAAAO9ln0gAAIA/+vv//54AAAAC/P//mgAAAAr8//+ZAAAAEvz//5gAAAAa/P//lgAAACL8//+VAAAAKvz//5QAAAAy/P//kwAAADr8//+SAAAAQvz//5EAAABK/P//kAAAAFL8//+PAAAAWvz//44AAABi/P//jAAAAGr8//+LAAAAcvz//4oAAAB6/P//iQAAAIL8//+IAAAAivz//4cAAACS/P//hgAAAJr8//+FAAAAovz//4QAAACq/P//gwAAALL8//+CAAAAuvz//4AAAADC/P//fwAAAMr8//9+AAAA0vz//30AAADa/P//fAAAAOL8//97AAAA6vz//3cAAADy/P//dgAAAPr8//91AAAAAv3//3QAAAAK/f//cwAAABL9//9yAAAAGv3//3EAAAAi/f//cAAAACr9//9vAAAAMv3//2wAAAAIAAwACAAHAAgAAAAAAAABawAAAE79//9qAAAAVv3//2kAAABe/f//aAAAAGb9//9nAAAAbv3//2UAAAB2/f//ZAAAAH79//9jAAAAhv3//2IAAACO/f//YAAAAJb9//9fAAAAnv3//14AAACm/f//XQAAAK79//9cAAAAtv3//1sAAAC+/f//WgAAAMb9//9ZAAAAzv3//1gAAADW/f//VwAAAN79//9WAAAA5v3//1UAAADu/f//VAAAAPb9//9TAAAA/v3//1EAAAAG/v//UAAAAA7+//9PAAAAFv7//04AAAAe/v//TQAAACb+//9LAAAALv7//0oAAAA2/v//SQAAAD7+//9GAAAARv7//0QAAABO/v//QwAAAFb+//9CAAAAXv7//0EAAABm/v//QAAAAG7+//8/AAAAdv7//z4AAAB+/v//PQAAAIb+//88AAAAjv7//zoAAACW/v//OAAAAJ7+//83AAAApv7//zYAAACu/v//NQAAALb+//80AAAAvv7//zMAAADG/v//MgAAAM7+//8wAAAA1v7//y8AAADe/v//LgAAAOb+//8tAAAA7v7//ywAAAD2/v//KwAAAP7+//8pAAAABv///ygAAAAO////JwAAABb///8mAAAAHv///yUAAAAm////JAAAAC7///8jAAAANv///yIAAAA+////IQAAAEb///8fAAAATv///x0AAABW////HAAAAF7///8bAAAAZv///xoAAABu////GQAAAHb///8YAAAAfv///xcAAACG////FgAAAI7///8VAAAAlv///xQAAACe////EwAAAKb///8SAAAArv///xEAAAC2////EAAAAL7///8OAAAAxv///wwAAADO////CwAAANb///8KAAAA3v///wgAAADm////BwAAAO7///8GAAAA3v///wUAAAAAAAYACAAEAAYAAAAEAAAA9v///wMAAAAAAAYACgAEAAYAAAABAAAAAAAOADAAJAAYAAwACAAEAA4AAAAAAMB/AADAfxR/+r40Kqw+rgFOP6pXx0f8dh3H800Dx6rpJUiMyanHGsbTRg=="
            }
          }
        }
      ],
      buttonOneClicked: false,
      ziChanShow:false,
      tongJiShow:false,
      xiTongShow:false,
      playerOptions: {
        // videojs options
        fluid: true,
        autoplay: 'muted',
        muted: false,
        language:  'zh',
        sources: [{
          withCredentials: false,
          type: "video/mp4",
          src: require("@/assets/视频1-迅捷压缩.mp4")
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay : false,//
        },
        loop: true,
        preload: 'auto',
      },
      videoShow:false
    }
  },
  mixins:[model],
  computed:{
    videoList(){
      return this.positionArr.filter((o,index)=>index<6)
    }
  },
  created() {
    this.width = 1558;
  },
  mounted() {
    this.$store.commit("setModelShow",true);
  },
  methods: {
    inint(){
      let arr  = this.positionArr.map(o=>{
        return {
          ...o,
          clickPointCallback: (r) => {
            this.$store.state.modelVueInstance.viewRender.interfaceApi.setModelViewInfo(
                r.data.selectedEntity.floorID,
                r.data.selectedEntity.handle,
                r.data.selectedEntity.floorName,
                r.data.selectedEntity.flatBuffer
            );
            this.videoShow =true;
          }
        }
      });
      this.$store.state.modelVueInstance.viewRender.interfaceApi.setMarkPointList(arr);
    },
    menuClick(type){
      switch (type){
        case 0:
           this.$router.push({
            path:"/"
          });
          break;
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
  
    goMaintenance(){
      this.$router.push('maintenance')
    },
    goZiChan(){
      this.$router.push('assets')
    },
    goTongJi(){
      this.$router.push('energy')
    },
    clickVideo(r){
      this.$store.state.modelVueInstance.viewRender.interfaceApi.setModelViewInfo(
          r.floorID,
          r.handle,
          r.floorName,
          r.flatBuffer
      );
    },
   
  }
}
</script>
<style lang="scss" scoped>
.About {
  background: #112329;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  img {
    -webkit-user-drag: none;
  }


  .contain {
    padding-top: .5rem;
    height: calc(100vh - 76px - 0.5rem);

    .left {
      margin-left: .5rem;

      img {
        margin-top: 50px;
        width: 22.5rem;
      }
      .videos{
        width: 359px;
        position: absolute;
        top: 566px;
        .video_item{
          height: 30px;
        }
      }
    }

    display: flex;
    justify-content: space-between;

    .center {
      width: 95rem;
      height: 100%;
    }
  }
  .video{
    position: absolute;
    height: 219px;
    width: 380px;
    top: 96px;
    left: 419px;
    z-index: 2;
    .close_icon{
      font-size: 10px;
      position: absolute;
      z-index: 2;
      right: 0;
      svg{
        width: 30px;
        height: 30px;
      }
    }
    .video-player-box{
      /deep/ .video-js{
        .vjs-control-bar{
          display: flex;
          justify-content: space-between;
        }
        .vjs-paused{
          display: none;
        }
        .vjs-icon-placeholder {
          width: 100%;
          height: 100%;
          display: block;
        }
        .vjs-playing{
          display: none;
        }
        .vjs-progress-control{
          display: none;
        }
      }
    }
  }
}
</style>
