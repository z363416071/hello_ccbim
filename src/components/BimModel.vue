<template >
  <div class = "BimModel" :style = "{'width':width,'height':height,'left':left,'top':top}" v-show = "modelShow" >
    <div id = "bimView" style = "position: relative;" :style = "{'width':width,'height':height}" ></div >
    <div class = "ccbim__viewHome" v-show = "renderFinished" @click = "goHome" >
      <svg title = "默认视口" class = "icon" aria-hidden = "true" >
        <use xlink:href = "#iconhome-" ></use >
      </svg >
    </div >
  </div >
</template >

<script >

export default {
  name: "BimModel",
  components: {},
  props: {
    urlIp: {
      type: String,
      default: ""
    },
    version: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      viewRender: undefined,
      modelMarks: [], // 保存标注点的信息
      userList: [], // 这是第三方用户自己保存的标注点信息列表
      initPerspective: {
        handle: "426944",
        floorName: "0.00",
        flatBuffer: "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UP7//wAAAAEtAAAAXP7//wAAAAEsAAAAaP7//wAAAAErAAAAdP7//wAAAAEpAAAAgP7//wAAAAEoAAAAjP7//wAAAAEnAAAAmP7//wAAAAEmAAAApP7//wAAAAElAAAAsP7//wAAAAEkAAAAvP7//wAAAAEjAAAAyP7//wAAAAEiAAAA1P7//wAAAAEhAAAA4P7//wAAAAEfAAAA7P7//wAAAAEdAAAA+P7//wAAAAEcAAAABP///wAAAAEbAAAAEP///wAAAAEaAAAAHP///wAAAAEZAAAAKP///wAAAAEYAAAANP///wAAAAEXAAAAQP///wAAAAEWAAAATP///wAAAAEVAAAAWP///wAAAAEUAAAAZP///wAAAAETAAAAcP///wAAAAESAAAAfP///wAAAAERAAAAiP///wAAAAEQAAAAlP///wAAAAEOAAAAoP///wAAAAEMAAAArP///wAAAAELAAAAuP///wAAAAEKAAAAxP///wAAAAEIAAAA0P///wAAAAEHAAAA3P///wAAAAEGAAAA6P///wAAAAEFAAAA9P///wAAAAEEAAAACAAMAAgABwAIAAAAAAAAAQMAAAAIAA4ACAAHAAgAAAAAAAABAQAAAAAADgAwACQAGAAMAAgABAAOAAAAAADAfwAAwH9qD5I6bSS7PktJbj/9K5RHAxEsRmF3A8fn35JHN/5JyMm0Skc=",
      },
      width: "1167px",
      height: "897px",
      top: "72px",
      left: "378px",
      renderFinished: false,
    }
  },
  computed: {
    modelShow() {
      return this.$store.state.modelShow
    }
  },
  created() {
    this.$store.commit("setModelVueInstance", this);
  },
  mounted() {
    let modelElement = document.getElementById('bimView');
    let options = {
      urlIp: this.urlIp,
      versionId: this.version,
      type: 'model', // 注意加载模型用model，加载图纸用dwg
      operationBar: { // 可不传，默认显示
        showBar: true, // 是否显示操作栏
      },
      viewBoxVisible: true, // 是否显示视口viewBox盒（可不传，默认显示）
    }
    this.viewRender = new window.$CCBIM$.ViewRender(modelElement, options);
    // run参数，可不传(注意这里的参数会影响操作栏中的设置功能，所以没值的话最好不要传相关的字段)
    const runOptions = {
      bgColor: { // 背景色
        topColor: '#112329',
        bottomColor: '#112329',
      },
      wireframe: false // 线框
    }
    // 执行run加载
    this.viewRender.run(runOptions);
    this.viewRender.addEventListener('selectedEntity', (data) => {
      this.$root.$emit("selectedEntity", data)
      /* if (data.object.handle && data.objectw.clickPointPosition?.x && data.object.clickPointPosition?.y &&data.object.clickPointPosition?.z){
         let pointData = {
           floorId:data.object.floorID,
           markPosition:`${data.object.handle};${data.object.clickPointPosition.x},${data.object.clickPointPosition.y},${data.object.clickPointPosition.z}`,
           selfDefiningData:{
             selectedEntity:data.object,
           }
         }
       }*/
      
    });
    this.viewRender.addEventListener('renderFinish', () => {
      this.$root.$emit("renderFinish");
      this.renderFinished = true;
      this.goHome();
    });
    this.$root.$on("resetBimModel", (width, height, top, left) => {
      this.width = width + "px";
      this.height = height + "px";
      this.top = top;
      this.left = left;
      this.viewRender.interfaceApi.setViewRenderWith(width);
      this.viewRender.interfaceApi.setViewRenderHeight(height);
    })
  },
  methods: {
    goHome() {
      if (this.renderFinished) {
        this.viewRender.interfaceApi.setModelViewInfo(
            this.initPerspective.floorID,
            this.initPerspective.handle,
            this.initPerspective.floorName,
            this.initPerspective.flatBuffer
        )
      }
    },
    setInit() {
      this.viewRender.interfaceApi.setMarkPointList([]);
      this.viewRender.interfaceApi.clearAllHighlightEntity();
      this.viewRender.interfaceApi.closeBarAllOperation();
      this.goHome();
    }
    
  },
  destroyed() {
    this.viewRender.interfaceApi.dispose();
  },
  watch: {}
}
</script >

<style lang = "scss" scoped >
.BimModel {
  position: absolute;
  
  /deep/ #bimView {
    .ccbim__viewHome {
      display: none;
    }
    .ccbim__roam__topRightMap{
      z-index: 1;
    }
    .ccbim__modelTree.ccbim__common__dialog {
      background-color: rgba(13, 39, 59, 0.9);
      color: rgba(255, 255, 255, .45);
      
      .ccbim__common__title {
        display: flex;
        justify-content: flex-end;
        
        span {
          display: none;
        }
        
        .icon {
          color: rgba(255, 255, 255, 0.65);
        }
        
        border-bottom: none;
      }
      
      .ccbim__modelTree__searchBox {
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        
        .icon {
          color: rgba(255, 255, 255, 0.65);;
        }
        
        .ccbim__modelTree__searchBox__txtSearch {
          
          &::-webkit-input-placeholder { /* WebKit browsers */
            color: rgba(255, 255, 255, 0.45);
          }
          
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: rgba(255, 255, 255, 0.45);
          }
          
          &:-ms-input-placeholder { /* Internet Explorer 10+ */
            color: rgba(255, 255, 255, 0.45);
          }
          
          color: rgba(255, 255, 255, 0.85);
        }
      }
      
      .ccbim_floorTree {
        &::-webkit-scrollbar {
          width: 5px;
        }
        
        &::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3)
        }
        
        .icon.expanded {
          color: rgba(255, 255, 255, 0.45);
        }
        
        .checkIcon {
          color: rgba(0, 213, 255, 1);
        }
        
        .lookThisModel {
          background-color: #112329;
        }
        
        .ccbim_treeAnchor {
          span.text:hover {
            background-color: #112329;
          }
        }
      }
    }
    
    .ccbim__operationBarBox__grey {
      background: rgba(6, 24, 38, .9);
      box-shadow: none;
      
      .ccbim__operation__icon:hover > .icon {
        color: #1abc9c;
      }
      
      .icon {
        color: white;
      }
      
      .ccbim__operation__icon:nth-child(1) {
        display: none;
      }
      
      .ccbim__operation__icon:nth-child(3) {
        display: none;
      }
      
      .ccbim__operation__icon:nth-child(6) {
        display: none;
      }
      
      .ccbim__operation__icon:nth-child(7) {
        display: none;
      }
    }
  }
  
}
</style >
