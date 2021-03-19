<template >
    <div class = "BimModel" id = "fullDiv" >
        <div id = "bimView" style = "position: relative;width: 100%;height: 100%;" ></div >
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
        positionArr: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            viewRender: undefined,
            // roamData: {
            //     hover: false,
            //     href: "#icon-zu",
            //     name: "漫游",
            //     show: true,
            //     type: "walk",
            // },
            // floorData: {
            //     hover: false,
            //     href: "#icon-floor",
            //     name: "楼层/构件",
            //     show: true,
            //     type: "floor",
            // },
            modelMarks: [], // 保存标注点的信息
            userList: [] // 这是第三方用户自己保存的标注点信息列表
        }
    },
    computed: {},
    created() {
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
        this.viewRender.addEventListener('renderFinish',  ()=> {
            if (this.positionArr && this.positionArr.length >0){
                let arr = this.positionArr.map(o=>{
                    return {
                        ...o,
                        clickPointCallback: (result) => {
                            this.$emit("clickPoint",result)
                        }
                    }
                })
                this.viewRender.interfaceApi.setMarkPointList(arr);
            }
        });
       
    },
    methods: {
    },
    destroyed() {
        this.viewRender.interfaceApi.dispose();
    },
    watch: {}
}
</script >

<style lang = "scss" scoped >
.BimModel {
    position: relative;
    height: 100%;
    width: 100%;
    
    /deep/ #bimView {
        .ccbim__modelTree.ccbim__common__dialog  {
            background-color: rgba(13, 39, 59, 0.9);
            .ccbim__common__title{
                display: flex;
                justify-content: flex-end;
                span{
                    display: none;
                }
                .icon{
                    color: rgba(255, 255, 255, 0.65);
                }
                border-bottom:none;
            }
            .ccbim__modelTree__searchBox{
                border-bottom:1px solid rgba(255, 255, 255, 0.12);
                .icon{
                    color: rgba(255, 255, 255, 0.65);;
                }
                .ccbim__modelTree__searchBox__txtSearch{
    
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
            
        }
        .ccbim__operationBarBox__grey{
            background: rgba(6, 24, 38, .9);
            box-shadow:none;
            .ccbim__operation__icon:hover>.icon{
                color: #1abc9c;
            }
            .icon{
                color: white;
            }
            .ccbim__operation__icon:nth-child(1){
                display: none;
            }
            .ccbim__operation__icon:nth-child(2){
                display: none;
            }
            .ccbim__operation__icon:nth-child(3){
                display: none;
            }
            .ccbim__operation__icon:nth-child(6){
                display: none;
            }
            .ccbim__operation__icon:nth-child(7){
                display: none;
            }
        }
    }
    
    .operation {
        position: absolute;
        margin: 0 auto;
        bottom: 10px;
        right: 0;
        left: 0;
        width: 18rem;
        height: 4rem;
        background: #0A1B28;
        border-radius: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        
        .icon {
            width: 30px;
            height: 30px;
            margin: 0 1rem;
        }
        
        .roam {
            background-image: url("~@/assets/components/漫游-默认.png");
            
            &:hover {
                background-image: url("~@/assets/components/漫游-点击.png");
            }
        }
        
        .roam_hover {
            background-image: url("~@/assets/components/漫游-点击.png") !important;
        }
        
        .home {
            background-image: url("~@/assets/components/首页-默认.png");
            
            &:hover {
                background-image: url("~@/assets/components/首页-点击.png");
            }
        }
        
        .floor {
            background-image: url("~@/assets/components/楼层-默认.png");
            
            &:hover {
                background-image: url("~@/assets/components/楼层-点击.png");
            }
        }
        
        .floor_hover {
            background-image: url("~@/assets/components/楼层-点击.png") !important;
        }
        
        .full_screen {
            background-image: url("~@/assets/components/全屏-默认.png");
            
            &:hover {
                background-image: url("~@/assets/components/全屏-点击.png");
            }
        }
        
        .full_screen_hover {
            background-image: url("~@/assets/components/全屏-点击.png") !important;
        }
    }
}
</style >
