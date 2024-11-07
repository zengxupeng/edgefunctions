import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null
    },
    getters: {
        userAvailable (state) {
            const user = state.user
            return user != null && user.status === 1
        }
    },
    actions: {},
    mutations: {},
    modules: {}
})
