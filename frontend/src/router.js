import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Home from "./views/Home";
import store from './store/store'
import Welcome from "./views/main/Welcome";


Vue.use(VueRouter)

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
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

function loadItems(to) {
    return new Promise(async (resolve, reject) => {
        if (to.matched[0].meta.auth)
            if (!store.getters.currentUser) {
                await store.dispatch('getUser').catch(() => {
                    reject()
                })
            }
        for (let value of to.matched) {

            if (value.meta.param && to.params[value.meta.param]) {
                let id = parseInt(to.params[value.meta.param])
                if (id === 0) {
                    store.dispatch('setItemFromDefault', value.meta.item)
                } else {
                    let item = store.getters.getItem(value.meta.item)
                    if (!item || item.id !== id)
                        await store.dispatch('loadItem', {
                            url: value.meta.url,
                            item: value.meta.item,
                            id: to.params[value.meta.param]
                        })
                }
            }
        }
        resolve()
    })
}

router.beforeEach((to, from, next) => {

    loadItems(to).then(r => {
        next()
    }).catch(() => {
        next({name: 'login'})
    })
})


export default router

