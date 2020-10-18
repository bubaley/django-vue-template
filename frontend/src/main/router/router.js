import store from '../store/store'
import Router from '../../vendor/router'

import Register from '../views/auth/Register'
import Login from '../views/auth/Login'
import Home from '../views/Home'
import NotFound from '../../components/template/NotFound'
import About from '../views/About'

import {user} from '../models'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            auth: true,
        },
        children: [
            {
                name: 'about',
                path: '',
                component: About
            },
            ...user.getRoutes()
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
    },
    {
        path: '*',
        redirect: '/404'
    }
]

export default new Router(routes, store).getRouter()
