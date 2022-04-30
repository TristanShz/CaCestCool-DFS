import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
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
        }
    },
    actions: {
        logUser(context, user){
            context.commit("logUser", user);
        },
        async checkToken(context, token){
            try{
                const userValid = await axios.post("http://localhost:3000/users/token",{token: token});
                if(userValid.data){
                    context.commit("logUser", userValid.data);
                    return 1;
                }else{
                    return null;
                }
            }catch(e){
                console.log(e);
            }
        },
        setPosts(context, postsList){
            context.commit("setPosts", postsList);
        },
        setCurrentPost(context, post){
            context.commit("setCurrentPost", post);
        }
    }

})

export default store;