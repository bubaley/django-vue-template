import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import store from "./store/store"
import vuetify from "../plugins/vuetify"
import {initDefaultComponents, initModels} from '../vendor/initApp'

require('../bootstrap')

initDefaultComponents(Vue)
initModels(Vue, store, require('./models'))

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app")
