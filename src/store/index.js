import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modelShow:false,
        modelVueInstance:undefined,
        initDeviceData:undefined
    },
    mutations: {
        setModelShow(state, v) {
            state.modelShow = v;
        },
        setModelVueInstance(state, v) {
            state.modelVueInstance = v;
        },
        setInitDeviceData(state, v) {
            state.initDeviceData = v;
        },
    },
    actions: {},
    modules: {}
})
