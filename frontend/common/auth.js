export default {
    state: {
        user: null
    },
    getters: {
        currentUser: state => {
            return state.user;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        login({dispatch}, data) {
            let url = data.url ? data.url : '/auth/jwt/create/';
            let credentials = data.credentials;

            return new Promise((resolve, reject) => {
                axios.post(url, credentials).then(response => {
                    localStorage.setItem('token', response.data.access)
                    dispatch('getUser').then((user) => {
                        resolve({
                            user: user,
                            tokens: response.data
                        })
                    })
                }).catch(error => {
                    reject(error.response)
                })
            })
        },
        register({commit, dispatch}, data) {
            let url = data.url ? data.url : '/auth/users/';
            let credentials = data.credentials;

            return new Promise((resolve, reject) => {
                axios.post(url, credentials).then(response => {
                    commit('setUser', response.data)
                    dispatch('login', {
                        credentials: credentials
                    }).then(tokens => {
                        resolve({
                            user: response.data,
                            tokens: tokens
                        })
                    })
                }).catch(error => {
                    reject(error.response)
                })
            })
        },
        getUser({commit, dispatch}, url = '/auth/users/me/') {
            return new Promise((resolve, reject) => {
                let token = localStorage.getItem('token')
                if (token) {
                    axios.defaults.headers.common = {Authorization: 'Bearer ' + token}
                    axios.get('/auth/users/me/')
                        .then(response => {
                            commit('setUser', response.data)
                            resolve(response.data)
                        })
                        .catch((error) => {
                            dispatch('logout').then(() => {
                                reject()
                            })

                        })
                } else
                    dispatch('logout').then(() => {
                        reject()
                    })


            })
        },

        logout({commit}) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common = {Authorization: null}
                localStorage.removeItem('token')
                commit('setUser', null)
                resolve()
            })
        }
    }
}
