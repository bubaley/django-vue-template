import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../../common/auth'
import crud from "../../common/crud";
import helpers from "../../common/helpers";
import items from "./items";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      auth, crud, helpers, items
    }
})
