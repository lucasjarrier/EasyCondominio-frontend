import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/Home.vue'
import Header from './components/header'
import Login from './views/Login'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/header',
            nome: 'sobre',
            component: Header
        },
        {
            path: '/login',
            nome: 'loign',
            component: Login
        }
    ]
})