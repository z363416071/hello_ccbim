<template >
    <div id = "app" >
        <router-view />
    </div >
</template >

<style lang = "scss" >
html {
    height: 100%;
    width: 100%;
}

body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
    margin: 0;
}

#app {
    height: 100vh;
    width: 100vw;
    overflow: auto;

    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: .04rem; /*高宽分别对应横竖滚动条的尺寸*/
        height: .04rem;
    }

    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        background: #1A2B53;
        border-radius: .02rem;
    }

    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: transparent;
    }
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
}
*{
  user-select: none;
}
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
  .yun_wei{
    width: 136px;
    height: 41px;
    position: absolute;
    top: 28px;
    left: 158px;
  }
  .zi_chan{
    width: 136px;
    height: 41px;
    position: absolute;
    top: 28px;
    left: 301px;
  }
  .zichan_panel{
    position: absolute;
    width: 740px;
    height: 131px;
    z-index: 1;
    left: 302px;
    .item_click {
      width: 219px;
      height: 30px;
    }
    .zichan_click{
      position: absolute;
      bottom: 79px;
      left: 20px;
    }
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
    }
    .video_click{
      position: absolute;
      bottom: 127px;
      right: 20px;
    }
    .door_click{
      position: absolute;
      bottom: 74px;
      left: 20px;
    }
  }
  .tong_ji{
    width: 136px;
    height: 41px;
    position: absolute;
    top: 28px;
    left: 438px;
  }
  .tongji_panel{
    position: absolute;
    width: 501px;
    height: 74px;
    z-index: 1;
    left: 445px;
    .item_click {
      width: 219px;
      height: 30px;
    }
    .tongji_click{
      position: absolute;
      bottom: 22px;
      right: 20px;
    }
  }
  .xi_tong{
    width: 136px;
    height: 41px;
    position: absolute;
    top: 28px;
    left: 577px;
  }
  .xitong_panel{
    position: absolute;
    width: 740px;
    height: 180px;
    z-index: 1;
    left: 584px;
  }
}
</style >
