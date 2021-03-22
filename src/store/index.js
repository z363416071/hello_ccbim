import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        viewRender: undefined,
        modelShow:false,
        renderFinished:false
    },
    mutations: {
        setViewRender(state, v) {
            state.viewRender = v;
        },
        setModelShow(state, v) {
            state.modelShow = v;
        },
        setRenderFinished(state, v) {
            state.renderFinished = v;
        },
    },
    actions: {},
    modules: {}
})
