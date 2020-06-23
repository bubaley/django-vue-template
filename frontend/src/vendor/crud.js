export default {
    actions: {
        createItem({commit}, data) {

            let url = data.url
            let value = data.value

            commit('setLoading', true)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: url,
                    data: value
                })
                    .then(response => {
                        commit('setLoading', false)
                        if (response.status === 201) {
                            resolve(response.data)
                        }
                    })
                    .catch((error) => {
                        commit('setSnackbar', {text: "Не удалось создать", color: "error"})
                        reject()
                    })
            })
        },
        updateItem({commit}, data) {

            let url = data.url
            let value = data.value

            commit('setLoading', true)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'put',
                    url: url + value.id + '/',
                    data: value
                })
                    .then((response) => {
                        commit('setLoading', false)
                        if (response.status === 200) {
                            resolve(response.data)
                        } else {
                            reject()
                        }
                    })
                    .catch((error) => {
                        commit('setSnackbar', {text: "Не удалось обновить", color: "error"})
                        reject()
                    })
            })
        },
        deleteItem({commit, state}, data) {

            let url = data.url
            let id = data.id

            commit('setLoading', true)
            return new Promise((resolve, reject) => {

                axios({
                    method: 'delete',
                    url: url + id + '/',
                    data: data.params
                })
                    .then((response) => {
                        commit('setLoading', false)
                        if (response.status === 204) {
                            resolve()
                        } else {
                            commit('setSnackbar', {text: "Не удалось удалить", color: "error"})
                            reject()
                        }
                    })
                    .catch((error) => {
                        commit('setSnackbar', {text: "Не удалось удалить", color: "error"})
                        reject()
                    })
            })
        },
        async loadItem({commit, state}, data) {

            // Обязательные
            let url = data.url;
            // Необязательные
            let item = data.item;
            let id = data.id;
            let params = data.params;
            let paginateItem = data.paginateItem

            commit('setLoading', true);
            return new Promise((resolve, reject) => {
                axios
                    .get((id) ? url + id + '/' : url, {
                        params: params
                    })
                    .then(response => {
                        if (response.status === 200) {
                            let data = response.data
                            if (data.results) {
                                let paginateInfo = {...data}
                                delete paginateInfo.results
                                data = data.results
                                if (paginateItem)
                                    commit('setItem', {
                                        item: paginateItem,
                                        value: paginateInfo,
                                    });
                            }
                            if (item)
                                commit('setItem', {
                                    item: item,
                                    value: data,
                                });
                            resolve(data);
                        } else {
                            commit('setSnackbar', {
                                text: "Не удалось загрузить",
                                color: "error"
                            });
                            reject();
                        }
                        commit('setLoading', false);
                    })
                    .catch(error => {
                        commit('setSnackbar', {
                            text: "Не удалось загрузить",
                            color: "error"
                        });
                        reject();
                        commit('setLoading', false);
                    });
            })
        },

        executeAction({commit}, data) {

            let url = data.url
            let id = data.id
            let body = data.body
            let params = data.params
            let action = data.action
            let method = data.method || 'post'

            url = id ? url + id + '/' : url
            url = action ? url + action + '/' : url

            commit('setLoading', true)
            return new Promise((resolve, reject) => {
                axios({
                    method: method,
                    url: url,
                    data: body,
                    params: params
                })
                    .then((response) => {
                        commit('setLoading', false)
                        if (response.status === 200) {
                            resolve(response.data)
                        } else {
                            reject()
                        }
                    })
                    .catch((error) => {
                        reject()
                    })
            })
        },
    }
}
