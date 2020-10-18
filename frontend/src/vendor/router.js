import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default class Router {
    constructor(routes, store) {
        this.router = new VueRouter({
            mode: 'history',
            routes,
        })
        this.store = store

        this.router.beforeEach((to, from, next) => {
            this.loadItems(to)
                .then((r) => {
                    next()
                })
                .catch(() => {
                    next({name: 'login'})
                })
        })
    }

    loadItems(to) {
        return new Promise(async (resolve, reject) => {
            if (to.matched[0].meta.auth)
                if (!this.store.getters.currentUser) {
                    await this.store.dispatch('me').catch(() => {
                        reject()
                    })
                }
            for (let value of to.matched) {
                if (value.meta.single) {
                    const param = value.meta.param
                    const id = to.params[param]
                    if (id === 'new') {
                        value.meta.instance.setItemFromDefault()
                    } else {
                        await value.meta.instance.loadItem(id)
                    }
                }
            }
            resolve()
        })
    }

    getRouter() {
        return this.router
    }
}

