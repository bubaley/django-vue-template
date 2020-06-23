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
                    await this.store.dispatch('getUser').catch(() => {
                        reject()
                    })
                }
            for (let value of to.matched) {
                if (value.meta.url) {
                    let param = value.meta.param
                    if (!param) {
                        let pathSplit = value.path.split(':')
                        if (pathSplit.length > 0)
                            param = pathSplit[pathSplit.length - 1]
                    }
                    if (param) {
                        let item = this.store.getters.getItem(value.meta.item)
                        let id = parseInt(to.params[param])
                        if (!id)
                            this.store.dispatch('setItemFromDefault', value.meta.item)
                        else if (!item || item.id !== id)
                            await this.store.dispatch('loadItem', {
                                url: value.meta.url,
                                item: value.meta.item,
                                id: id,
                            })
                    } else
                        this.store.dispatch('setItemFromDefault', value.meta.item)
                }
            }
            resolve()
        })
    }

    getRouter() {
        return this.router
    }
}

