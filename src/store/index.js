import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modelShow:false,
        renderFinished:false,
        modelVueInstance:undefined,
    },
    mutations: {
        setModelShow(state, v) {
            state.modelShow = v;
        },
        setModelVueInstance(state, v) {
            state.modelVueInstance = v;
        },
    },
    actions: {},
    modules: {}
})
