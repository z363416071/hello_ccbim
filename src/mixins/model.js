export default {
    data() {
        return {
            width: 1167,
            height: 897,
            top: "72px",
            left:  "378px",
        }
    },
    mounted() {
        let initFuc=()=>{
            this.$root.$emit("resetBimModel",this.width,this.height,this.top,this.left);
            if (this.inint)this.inint()
        };
        if (this.$store.state.modelVueInstance.renderFinished){
            initFuc();
        }
        this.$root.$on("renderFinish",()=>{
            initFuc();
        })
    },
    methods: {
    },
    beforeDestroy() {
        this.$root.$off("renderFinish")
    }
}
