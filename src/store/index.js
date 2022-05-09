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
    },
    getters: {
        getCurrentPost(state) {
            return state.posts.find(post => post._id === state.currentPostId);
        },
        getPostsUnreadByUserLogged(state) {
            const postsByOtherUsers = state.posts.filter(post => post.user._id !== state.isLogged._id);
            return postsByOtherUsers.filter(post => !post.readBy.includes(state.isLogged._id));
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
            state.currentPostId = state.currentPostId === postId ? "" : postId;
        },
        setHeader(state) {
            state.header = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }
        },
        updateReadBy(state, postId) {
            state.posts.find(post => post._id === postId).readBy.push(state.isLogged._id);
        }
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
            axios.get(`http://localhost:3000/post/user/${context.state.isLogged._id}`, context.state.header)
                .then(response => {
                    context.commit("setPosts", response.data);
                })
        },
        async setCurrentPost(context, post) {
            context.commit("setCurrentPost", post._id);
            if (!post.readBy.includes(context.state.isLogged._id)) {
                axios.put(`http://localhost:3000/post/readby/${context.state.currentPostId}`,
                    {id: context.state.isLogged._id}, context.state.header)
                    .then(() => {
                        context.commit("updateReadBy", post._id);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

        },
        disconnect(context) {
            localStorage.clear();
            context.commit("logUser", {});
            location.href = '/login';
        },
    }

})

export default store;