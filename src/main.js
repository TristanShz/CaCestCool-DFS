import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Routes from "./routes/index.js";
import './index.css'
import store from "./store/index"

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: Routes,
});

//Navigation guards qui check si un utilisateur est connecté avant chaque arrivée sur une page
//si ce n'est pas le cas et qu'un token valide est présent dans le localstorage, l'utilisateur est connecté
//grâce à l'action checkToken du store.

//Sinon il est renvoyé vers la page /login.
router.beforeEach(async (to, from, next) => {
    if (!store.state.isLogged._id) {
        if (localStorage.getItem('token')) {
            store.dispatch("checkToken")
                .then(response => {
                    if (response) {
                        if (to.path === "/" || to.path === "/login") next("/home");
                        else next();
                    } else {
                        if (to.path !== "/login" && to.path !== "/") next("/login");
                        else next();
                    }
                })
        } else {
            if (to.path !== "/login" && to.path !== "/") next('/login');
            else next();
        }
    } else {
        next();
    }
})
new Vue({
    store,
    render: h => h(App),
    router,
}).$mount('#app')
