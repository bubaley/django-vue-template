import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../../vendor/auth'
import items from "./items";
import helpers from "../../vendor/helpers";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        drawer: true
    },
    mutations: {},
    actions: {},
    modules: {
        auth, helpers, items
    }
})
