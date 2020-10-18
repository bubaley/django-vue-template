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
        me({commit, dispatch}, needRefresh = true) {
            return new Promise((resolve, reject) => {
                let access = localStorage.getItem('access')
                if (access && access !== 'undefined') {
                    axios.defaults.headers.common = {Authorization: 'Bearer ' + access}
                    axios.get('/users/me/')
                        .then(response => {
                            commit('setUser', response.data)
                            resolve(response.data)
                        })
                        .catch((error) => {
                            if (needRefresh) {
                                dispatch('refresh').then(() => {
                                    dispatch('me', false).then(data => {
                                        resolve(data)
                                    }).catch(() => {
                                        reject()
                                    })
                                }).catch(() => {
                                    reject()
                                })
                            } else {
                                reject()
                            }
                        })
                } else {
                    if (needRefresh)
                        dispatch('refresh').then(() => {
                            dispatch('me', false).then(data => {
                                resolve(data)
                            }).catch(() => {
                                reject()
                            })
                        }).catch(() => {
                            dispatch('logout').then(() => {
                                reject()
                            })
                        })
                    else {
                        dispatch('logout')
                    }
                }
            })
        },
        login({dispatch}, data) {
            let url = data.url ? data.url : '/token/';
            let credentials = data.credentials;

            return new Promise((resolve, reject) => {
                axios.post(url, credentials).then(response => {
                    localStorage.setItem('access', response.data.access)
                    localStorage.setItem('refresh', response.data.refresh)
                    dispatch('me', false).then((user) => {
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
            return new Promise((resolve, reject) => {
                axios.post('/users/', data).then(response => {
                    commit('setUser', response.data)
                    dispatch('login', {
                        credentials: data
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
        refresh() {
            let refresh = localStorage.getItem('refresh')
            return new Promise((resolve, reject) => {
                if (refresh && refresh !== 'undefined') {
                    axios.post('/token/refresh/', {
                        refresh: refresh
                    }).then(response => {
                        localStorage.setItem('access', response.data.access)
                        localStorage.setItem('refresh', response.data.refresh)
                        resolve()
                    }).catch(error => {
                        reject(error.response)
                    })
                } else {
                    reject()
                }
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common = {Authorization: null}
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                commit('setUser', null)
                resolve()
            })
        }
    }
}
