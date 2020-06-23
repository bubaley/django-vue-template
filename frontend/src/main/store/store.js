import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../../vendor/auth'
import crud from "../../vendor/crud";
import items from "./items";
import helpers from "../../vendor/helpers";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      auth, crud, helpers, items
    }
})
