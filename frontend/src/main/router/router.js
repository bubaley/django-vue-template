import store from '../store/store'
import Router from '../../vendor/router'

import Register from '../views/auth/Register'
import Login from '../views/auth/Login'
import Home from '../views/Home'
import Welcome from "../views/Welcome";

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
                path: '',
                name: 'welcome',
                component: Welcome
            }
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
]

export default new Router(routes, store).getRouter()
