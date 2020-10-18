export default class BaseModel {
    list = []
    item = null
    search = ''
    pagination = {
        page: 1,
        total: 0,
        page_size: 20,
        last_page: 1
    }
    info = {}
    configuration = {}
    routes = []

    constructor(args) {
        this.url = args.url
        this.name = args.name || this.constructor.name.charAt(0).toLowerCase() + this.constructor.name.slice(1)
        this.default = args.default
        this.setPagination({
            page_size: args.page_size || 20
        })
        this.routes = args.routes
        this.info = args.info
        this.configuration = args.configuration
    }

    loadList(params) {
        return new Promise((resolve, reject) => {
            let defaultParams = {
                page: this.pagination.page,
                page_size: this.pagination.page_size,
                search: this.search
            }
            const newParams = Object.assign(defaultParams, params)
            axios.get(`/${this.url}/`, {
                params: newParams
            }).then(response => {
                const {total, page, page_size, last_page, results} = response.data
                this.setPagination({total, page, page_size, last_page})
                this.list = results
                resolve(results)
            }).catch(() => {
                reject()
            })
        })
    }

    loadItem(id) {
        return new Promise((resolve, reject) => {
            if (id === 'new') {
                this.item = _.cloneDeep(this.default)
                resolve()
            } else if (parseInt(id)) {
                axios.get(`/${this.url}/${id}/`)
                    .then(response => {
                        this.item = response.data
                        resolve(response.data)
                    }).catch(error => reject(error))
            } else reject()
        })
    }

    create(data = null) {
        return new Promise((resolve, reject) => {
            axios.post(`/${this.url}/`, data || this.item)
                .then(response => {
                    this.item = response.data
                    resolve(this.item)
                }).catch(error => reject(error))
        })
    }

    update(data = null) {
        return new Promise((resolve, reject) => {
            data = data || this.item
            if (!data.id)
                reject() //TODO create exception
            axios.put(`/${this.url}/${this.item.id}/`, this.item)
                .then(response => {
                    this.item = response.data
                    resolve(response.data)
                }).catch(error => reject(error))
        })
    }

    destroy(id = null) {
        return new Promise((resolve, reject) => {
            id = id || this.item?.id
            if (!id)
                reject() //TODO create exception
            axios.delete(`/${this.url}/${id}/`)
                .then(response => {
                    resolve()
                })
                .catch(error => reject(error))
        })
    }

    setPagination(pagination) {
        for (const el in pagination) {
            if (pagination.hasOwnProperty(el))
                this.pagination[el] = pagination[el]
        }
    }

    setItemFromDefault() {
        this.item = _.cloneDeep(this.default)
    }

    findBy(key, value) {
        return this.list.find(el => el[key] === value)
    }

    findById(id) {
        return this.findBy('id', id)
    }

    deleteById(id) {
        const index = this.list.findIndex(el => el.id === id)
        if (index > -1)
            this.list.splice(index, 1)
    }

    getRoutes() {
        const routes = []
        this.routes.forEach(route => {
            routes.push({
                component: route.component,
                path: route.single ? `${this.url}/:${this.name}Id` : this.url,
                name: this.name + route.name.charAt(0).toUpperCase() + route.name.slice(1),
                meta: {
                    single: route.single || false,
                    instance: this,
                    param: route.single ? `${this.name}Id` : null,
                }
            })
        })
        return routes
    }
}