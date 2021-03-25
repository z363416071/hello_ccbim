import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "@/store/index"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Maintenance.vue')
  },
  {
    path: '/assets',
    name: 'Assets',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Assets.vue')
  },
  {
    path: '/energy',
    name: 'Energy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Energy.vue')
  },
  {
    path: '/computer',
    name: 'Computer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Computer.vue')
  },
  {
    path: '/intercom',
    name: 'Intercom',
    component: () => import(/* webpackChunkName: "about" */ '../views/Intercom.vue')
  },
  {
    path: '/multimedia',
    name: 'MultiMedia',
    component: () => import(/* webpackChunkName: "about" */ '../views/MultiMedia.vue')
  },{
    path: '/parking',
    name: 'Parking',
    component: () => import(/* webpackChunkName: "about" */ '../views/Parking.vue')
  },
  {
    path: '/ElectronicInspection',
    name: 'ElectronicInspection',
    component: () => import(/* webpackChunkName: "about" */ '../views/ElectronicInspection.vue')
  },
  {
    path: '/information',
    name: 'Information',
    component: () => import(/* webpackChunkName: "about" */ '../views/Information.vue')
  },
  {
    path: '/burglarproof',
    name: 'Burglarproof',
    component: () => import(/* webpackChunkName: "about" */ '../views/Burglarproof.vue')
  },
  {
    path: '/card',
    name: 'Card',
    component: () => import(/* webpackChunkName: "about" */ '../views/Card.vue')
  },
  {
    path: '/building',
    name: 'Building',
    component: () => import(/* webpackChunkName: "about" */ '../views/Building.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (store.state.modelVueInstance){
    store.state.modelVueInstance.setInit()
  }
  store.commit("setModelShow",false)
  next()
})
export default router
