import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import store from "./store/store"
import vuetify from "../plugins/vuetify"


// uncomment if you want use leaflet and install this packages
//  leaflet
//  leaflet.markercluster
//
// import "leaflet/dist/leaflet.css"
// const L = require("leaflet")
// const market_cluster = require("leaflet.markercluster")

require('../bootstrap')

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app")
