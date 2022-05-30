import Vue from 'vue';
import Router from 'vue-router';
import Header from './components/header'
import Home from './components/Home'
import Login from './views/Login'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/header',
            nome: 'sobre',
            component: Header
        },
        {
            path: '/login',
            nome: 'login',
            component: Login
        },
        {
            path: '/Home',
            nome: 'Home Usuario',
            component: Home
        },
    ]
})