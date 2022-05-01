import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        header: {},
        isLogged : {},
        posts: [],
        token: localStorage.getItem('token'),
        currentPost: {},
    },
    mutations: {
        logUser(state, user){
            state.isLogged = user;
        },
        setPosts(state, postsList){
            state.posts = postsList;
        },
        setCurrentPost(state,post){
            state.currentPost = state.currentPost === post ? {} : post;
        },
        setHeader(state){
            state.header = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }
        }
    },
    actions: {
        logUser(context, user){
            context.commit("setHeader");
            context.commit("logUser", user);
        },
        async checkToken(context, token){
            try{
                const userValid = await axios.post("http://localhost:3000/users/token",{token: token});
                if(userValid.data){
                    context.commit("logUser", userValid.data);
                    context.commit("setHeader");
                    return 1;
                }else{
                    return null;
                }
            }catch(e){
                console.log(e);
            }
        },
        setPosts(context){
            axios.get("http://localhost:3000/post",context.state.header)
                .then(response => {
                    context.commit("setPosts", response.data);
                })
        },
        setCurrentPost(context, post){
            context.commit("setCurrentPost", post);
        },
        disconnect(context){
            localStorage.clear();
            context.commit("logUser", {});
            location.href= '/login';
        }
    }

})

export default store;