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
</style >
