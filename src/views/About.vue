<template >
    <div class = "About" >
        <div class = "top" >
            <img src = "@/assets/nav_bar-2.png" alt = "" v-show = "!buttonOneClicked" >
            <img src = "@/assets/nav_bar-1.png" alt = "" v-show = "buttonOneClicked" >
            <div class = "click_div" @click = "buttonOneClicked=!buttonOneClicked" ></div >
            <div class = "panel" v-if = "buttonOneClicked" >
                <img src = "@/assets/实时监控菜单-默认.png" alt = "" >
                <div class = "item_click" @click = "goVideo" ></div >
            </div >
        </div >
        <div class = "contain" >
            <div class = "left" >
                <img src = "@/assets/视频监控面板.png" alt = "" >
            </div >
            <div class = "center" >
                <bim-model @clickPoint="clickPoint" :urlIp = "urlIp" version = "ac9900e3-4fe4-4028-8083-5ac140e73c86" :positionArr="positionArr"></bim-model >
            </div >
            <div class = "right" >
                <!--<img src = "@/assets/right.png" alt = "" >-->
            </div >
        </div >
    </div >
</template >
<script >

import BimModel from "@/components/BimModel";

export default {
    name: 'About',
    components: {BimModel},
    data() {
        return {
            // 获取模型数据接口ip
            urlIp: 'https://ccbim.pinming.cn',
            positionArr: [
                {
                    floorId: 31,
                    iconImg: "data:image/png;base64,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",
                    id: "1234",
                    markPosition: "3545431;-13827.320357184022,-123244.24921213025,15950.453318390602,"
                },
                {
                    floorId: 111,
                    iconImg: "data:image/png;base64,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",
                    id: "2",
                    markPosition: "630641;109970.6710222974,-77394.25291576711,16208.229058729188,"
                }
            ],
            buttonOneClicked:false
        }
    },
    mounted() {
        // 运行webGL
        
    },
    methods: {
        goVideo() {
            this.buttonOneClicked = !this.buttonOneClicked;
            this.$router.push('about')
        },
        clickPoint(r){
            console.log(r)
        }
    }
}
</script >
<style lang = "scss" scoped >
.About {
    background: #112329;
    min-height: 100%;
    
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
        
        .left {
            margin-left: .5rem;
            
            img {
                width: 22.5rem;
            }
        }
        
        display: flex;
        justify-content: space-between;
        
        .center {
            width: 95rem;
            height: 55.2rem;
        }
    }
}
</style >
