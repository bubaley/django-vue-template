import store from "../src/store/store";

export default {
    state: {
        snackbar: {
            value: false,
            color: '',
            text: ''
        },
        queryLoading: false,
    },
    mutations: {
        setSnackbar(state, data) {
            state.snackbar.text = data.text;
            state.snackbar.color = data.color;
            state.snackbar.value = true
        },
        setLoading(state, value) {
            state.queryLoading = value
        },
        setItem(state, data) {
            let item = data.item;
            let value = data.value;
            let values = data.values ? data.values : this.state.items;

            let items = item.split('.');
            let len = items.length;
            items.forEach((v, i) => {
                if (i + 1 === len) {
                    values[v] = value;
                    return 'success';
                } else {
                    values = values[v]
                }
            });
        }
    },
    actions: {
        setItemFromDefault({commit}, item) {
            let path = item.split('.')
            commit('setItem', {
                item: path.length > 1 ? item : path[0] + '.item',
                value: {...this.state.items[path[0]]['default']}
            })
        }
    },
    getters: {
        snackbar: state => {
            return state.snackbar;
        },
        getItem: (state, getters, rootState) => data => {
            let values = data.values ? data.values : rootState.items;
            let items = typeof data === 'object' ? data.item.split('.') : data.split('.')

            let len = items.length;
            let val = null
            items.forEach((v, i) => {
                if (i + 1 === len) {
                    val = values[v]
                } else {
                    values = values[v]
                }
            });
            return val
        },
        getItemInList: (state, getters, rootState) => data => {
            let item = data.item
            let id = data.id

            let list = getters.getItem(item)
            return list.find(value => value.id === id)
        },

        getItemIndexInList: (state, getters) => data => {
            let item = data.item
            let id = data.id

            let list = getters.getItem(item)
            return list.findIndex(value => value.id === id)
        },
    },
}
