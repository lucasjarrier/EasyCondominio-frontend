import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/home/Home.vue'
import Header from './components/header'
import CadastroUsuario from './components/CadastroUsuario'
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
            path: '/CadastroUsuario',
            nome: 'cadastro Usuario',
            component: CadastroUsuario
        },
    ]
})