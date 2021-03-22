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
    
        }
        if (this.$store.state.renderFinished){
            initFuc();
        }
        this.$root.$on("renderFinish",()=>{
            initFuc();
        })
    },
    beforeDestroy() {
        this.$root.$off("renderFinish")
    }
}
