<template>
  <div id="wallContent" class="flex flex-col items-center w-2/5 px-20 overflow-scroll">
    <h1 class="text-titlegrey text-4xl mt-32 mb-5 self-start">Mon Mur</h1>
    <add-post></add-post>
    <div id="line" class="mt-5"></div>
    <div class="postpreview flex bg-white h-32 my-5 w-full hover:cursor-pointer hover:scale-105"
         v-for="post in $store.state.posts"
         :key="post._id"
    >
      <div class="flex h-32 pl-8 w-full" @click="$store.dispatch('setCurrentPost',post._id)">
        <img v-if="post.user.image" src="../assets/userExample.jpg" alt="" class="w-16 h-16 rounded-full  self-center">
        <div v-else
             class="userImageDefault w-16 h-16 rounded-full self-center text-4xl mr-5"
             v-bind:style="{ background: post.user.defaultColor}"
        >{{post.user.fullName.charAt(0)}}</div>
        <div class="flex flex-col mt-3 w-3/4">
          <h2 class="font-bold">{{ post.title }}</h2>
          <p class="leading-4 mt-1 text-lightgrey">{{ post.description.slice(0, 110) + "..." }}</p>
          <div class="flex justify-between my-4 text-lightgrey font-light">
            <span class="flex"><img class="mr-2" src="../assets/comment.svg" alt="">{{ post.comments.length }} comments</span>
            <span class="flex text-blue font-bold" v-if="post.likes.includes($store.state.isLogged._id)">
              {{ post.likes.length }}<img class="ml-0.5" src="../assets/blueThumb.svg">
            </span>
            <span class="flex" v-else>{{ post.likes.length }}<img class="ml-1" src="../assets/thumb.svg"></span>
          </div>
        </div>
        <div id="arrowRight" v-if="$store.getters.currentPost === post || $store.state.onEditPost === post"></div>
      </div>
      <img src="../assets/edit.svg"
           class="w-8 h-8 absolute top-1 right-12 hover:cursor-pointer hover:scale-110 opacity-50 hover:opacity-100"
           v-if="post.user._id === $store.state.isLogged._id"
           @click="$store.dispatch('setOnEditPost', post)"
      >
      <img src="../assets/delete.svg"
           class="w-8 h-8 absolute top-1 right-5 hover:cursor-pointer hover:scale-110 opacity-50 hover:opacity-100"
           v-if="post.user._id === $store.state.isLogged._id"
           @click="deletePost(post._id)"
      >

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AddPost from "@/components/addPost";

export default {
  name: "PostPreview",
  components: {AddPost},
  beforeCreate() {
    this.$store.dispatch("setPosts");
  },
  methods: {
    deletePost(id){
      axios.delete(`http://localhost:3000/post/${id}`, this.$store.state.header)
          .then(() => {
            this.$store.dispatch("setPosts");
            if(this.$store.state.currentPost._id === id){
              this.$store.dispatch("setCurrentPost", {});
            }
          })
          .catch(error => {
            console.log(error);
          })
    },
  }
}
</script>

<style scoped>
  .postpreview{
    border-radius: 30px;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
  }
  #wallContent h1{
    font-family: 'Timmana', sans-serif;
  }
  #wallContent::-webkit-scrollbar{
    display: none;
  }
  #arrowRight{
    width: 16px;
    height: 16px;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    transform: rotate(-45deg);
  }
  #line{
    width: 100%;
    height: 0.2px;
    background-color: lightgray;
  }
</style>