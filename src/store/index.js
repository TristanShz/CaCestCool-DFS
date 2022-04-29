import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogged : {},
    },
    mutations: {
        logUser(state, user){
            state.isLogged = user;
        }
    },
    actions: {
        logUser(context, user){
            context.commit("logUser", user);
        }
    }

})

export default store;