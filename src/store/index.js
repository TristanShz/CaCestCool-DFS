import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        header: {},
        isLogged: {},
        posts: [],
        currentPostId: "",
        onEditPost: {},
    },
    getters: {
        currentPost(state) {
            return state.posts.find(post => post._id === state.currentPostId);
        }
    },
    mutations: {
        logUser(state, user) {
            state.isLogged = user;
        },
        setPosts(state, postsList) {
            state.posts = postsList.reverse();
        },
        setCurrentPost(state, postId) {
            if (state.onEditPost._id) state.onEditPost = {};
            state.currentPostId = state.currentPostId === postId ? "" : postId;
        },
        setOnEditPost(state, post) {
            if (state.currentPost._id) state.currentPost = {};
            state.onEditPost = state.onEditPost === post ? {} : post;
        },
        setHeader(state) {
            state.header = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }
        },
    },
    actions: {
        logUser(context, user) {
            context.commit("setHeader");
            context.commit("logUser", user);
        },
        async checkToken(context) {
            try {
                const userValid = await axios.post("http://localhost:3000/users/token", {token: localStorage.getItem('token')});
                if (userValid.data) {
                    context.commit("logUser", userValid.data);
                    context.commit("setHeader");
                    return 1;
                } else {
                    return null;
                }
            } catch (e) {
                console.log(e);
            }
        },
        setPosts(context) { //Envoi une requête à l'api pour récupérer tout les posts
            axios.get("http://localhost:3000/post", context.state.header)
                .then(response => {
                    context.commit("setPosts", response.data);
                })
        },
        setUserLoggedPosts(context) { //Envoi une requête à l'api pour récupérer tout les posts de l'utilisateur connecté
            console.log("hey");
            axios.get(`http://localhost:3000/post/user/${context.state.isLogged._id}`, context.state.header)
                .then(response => {
                    context.commit("setPosts", response.data);
                })
        },
        setCurrentPost(context, postId) {
            context.commit("setCurrentPost", postId);
        },
        setOnEditPost(context, post) {
            context.commit("setOnEditPost", post);
        },
        disconnect(context) {
            localStorage.clear();
            context.commit("logUser", {});
            location.href = '/login';
        },
    }

})

export default store;