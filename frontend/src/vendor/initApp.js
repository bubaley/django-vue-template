export function initDefaultComponents(vue) {
    vue.component('subheader', require('../components/template/Subheader').default)
    vue.component('template-list', require('../components/template/TemplateList').default)
    vue.component('template-list-element', require('../components/template/TemplateListElement').default)
    vue.component('template-list-header', require('../components/template/TemplateListHeader').default)
    vue.component('template-list-actions', require('../components/template/TemplateListActions').default)
    vue.component('template-item', require('../components/template/TemplateItem').default)
    vue.component('template-item-actions', require('../components/template/TemplateItemActions').default)
    vue.component('search', require('../components/template/Search').default)
    vue.component('virtual-list', require('vue-virtual-scroll-list'))
}

// uncomment if you want use leaflet and install this packages: leaflet, leaflet.markercluster
export function initLeaflet() {
//     import "leaflet/dist/leaflet.css"
//     const L = require("leaflet")
//     const market_cluster = require("leaflet.markercluster")
}

export function initModels(vue, store, models) {
    for (let model in models) {
        if (models.hasOwnProperty(model))
            vue.set(store.state.items, model, models[model])
    }
}