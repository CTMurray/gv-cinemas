import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import About from '@/components/About'
import Sign from '@/components/Sign'
import Navigation from '@/components/Navigation'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
     {
       path: '/',
       name: 'Login',
       component: Login
    },
     {
       path: '/login',
       name: 'Login',
       component: Login
     },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/navigation',
      name: 'Navigation',
      component: Navigation
    }
  ]
})
