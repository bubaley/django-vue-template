
export default {
    state: {
        snackbar: {
            value: false,
            color: '',
            text: ''
        },
        queryLoading: false
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
    getters: {
        snackbar: state => {
            return state.snackbar;
        },
    }
}
